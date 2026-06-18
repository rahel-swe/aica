/**
 * recommendation-rescoring.service.ts
 *
 * Orchestrates re-scoring in all four situations where stored recommendations
 * become stale. Does not own scoring logic — delegates to recommendationService.generate().
 *
 * Trigger 1 — user_assessment_updated
 *   User updated or re-submitted their assessment.
 *   Action: re-score that user immediately.
 *   Called by: PathwayAssessmentService after a successful upsert.
 *
 * Trigger 2 — pathway_profile_updated
 *   Admin updated weights or bands in a pathway's match profile.
 *   Action: find all users who have a recommendation for that pathway,
 *           re-score each of them (full re-score, not just one pathway).
 *           Relative rankings across all pathways shift when one profile changes.
 *   Called by: an admin endpoint or seed script after profile update.
 *
 * Trigger 3 — algorithm_version_changed
 *   CURRENT_MATCHING_VERSION was incremented (weights changed, new dimension added).
 *   Action: batch re-score all users whose recommendations have an older version.
 *   Called by: a scheduled job or admin endpoint after a deployment.
 *
 * Trigger 4 — manual_admin_trigger
 *   Explicit admin action — re-score one user or all stale users on demand.
 *
 * Design rules:
 *   - One failure does not stop the batch. Errors are collected and returned.
 *   - Each user is processed sequentially within a batch to avoid overwhelming
 *     the scoring engine and MongoDB with concurrent writes.
 *   - Batch size is configurable. Default 20 users per run.
 *   - Returns a ReScoringResult with full audit detail.
 */

import { recommendationService } from './recommendation-service';
import { recommendationRepository } from '../repositories/recommendation-repository';

import type {
  ReScoringResult,
  ReScoringTrigger,
} from '@contracts/shared/schemas/recommendation-schema';
import { CURRENT_MATCHING_VERSION } from '../utils/pathway-scoring-engin';

// ── Constants ─────────────────────────────────────────────────────────────────

const DEFAULT_BATCH_SIZE = 20;

// ── Service ───────────────────────────────────────────────────────────────────

class RecommendationReScoringService {
  // ── Trigger 1: single user (assessment updated) ────────────────────────────

  /**
   * Re-scores one user immediately.
   * Call this from PathwayAssessmentService after a user updates their profile.
   *
   * Fire-and-forget is intentional in the controller — the response returns
   * immediately and the re-score happens in the background. If it fails,
   * the user still sees their old recommendations until their next manual
   * generate() call or the next stale batch run catches them.
   */
  async rescoreUser(
    userId: string,
    trigger: ReScoringTrigger = 'user_assessment_updated'
  ): Promise<ReScoringResult> {
    const startedAt = Date.now();

    try {
      await recommendationService.generate(userId);

      return this.buildResult({
        trigger,
        usersProcessed: 1,
        usersSucceeded: 1,
        usersFailed: 0,
        errors: [],
        startedAt,
      });
    } catch (err) {
      return this.buildResult({
        trigger,
        usersProcessed: 1,
        usersSucceeded: 0,
        usersFailed: 1,
        errors: [
          {
            userId,
            reason: err instanceof Error ? err.message : String(err),
          },
        ],
        startedAt,
      });
    }
  }

  // ── Trigger 2: pathway profile changed ────────────────────────────────────

  /**
   * Re-scores all users who have a recommendation for a specific pathway.
   *
   * When a pathway's match profile weights or bands change, the absolute score
   * for that pathway changes for every user — which shifts relative rankings
   * across ALL pathways. Every affected user needs a full re-score, not just
   * an update to the one recommendation.
   *
   * Processes users sequentially to stay within resource limits.
   */
  async rescoreByPathwaySlug(
    pathwaySlug: string,
    trigger: ReScoringTrigger = 'pathway_profile_updated'
  ): Promise<ReScoringResult> {
    const startedAt = Date.now();

    const userIds =
      await recommendationRepository.findAffectedUserIdsByPathwaySlug(
        pathwaySlug
      );

    if (!userIds.length) {
      return this.buildResult({
        trigger,
        usersProcessed: 0,
        usersSucceeded: 0,
        usersFailed: 0,
        errors: [],
        startedAt,
      });
    }

    return this.processUserBatch(userIds, trigger, startedAt);
  }

  // ── Trigger 3: algorithm version changed ──────────────────────────────────

  /**
   * Finds all users whose recommendations were generated with an older
   * matching version and re-scores them in batches.
   *
   * Run this after:
   *   - DIMENSION_WEIGHTS are updated
   *   - CURRENT_MATCHING_VERSION is incremented
   *   - A new assessment dimension is added
   *
   * Returns after processing one batch. Call repeatedly until
   * getStaleCount() returns 0.
   */
  async rescoreStale(
    batchSize = DEFAULT_BATCH_SIZE,
    trigger: ReScoringTrigger = 'algorithm_version_changed'
  ): Promise<ReScoringResult> {
    const startedAt = Date.now();

    const userIds = await recommendationRepository.findStaleUserIds(
      CURRENT_MATCHING_VERSION,
      batchSize
    );

    if (!userIds.length) {
      return this.buildResult({
        trigger,
        usersProcessed: 0,
        usersSucceeded: 0,
        usersFailed: 0,
        errors: [],
        startedAt,
      });
    }

    return this.processUserBatch(userIds, trigger, startedAt);
  }

  // ── Health check ──────────────────────────────────────────────────────────

  /**
   * Count of users with stale recommendations.
   * Use this to check whether a rescoreStale() run is needed.
   */
  async getStaleCount(): Promise<number> {
    const ids = await recommendationRepository.findStaleUserIds(
      CURRENT_MATCHING_VERSION,
      10_000
    );
    return ids.length;
  }

  /**
   * Whether a specific user's recommendations are stale.
   * Useful for conditionally prompting the user to refresh.
   */
  async isUserStale(userId: string): Promise<boolean> {
    const version =
      await recommendationRepository.getCurrentMatchingVersion(userId);
    if (version === null) return false;
    return version < CURRENT_MATCHING_VERSION;
  }

  // ── Shared batch processor ─────────────────────────────────────────────────

  /**
   * Processes a list of user IDs sequentially.
   * One failure does not abort the batch — errors are collected and returned.
   */
  private async processUserBatch(
    userIds: string[],
    trigger: ReScoringTrigger,
    startedAt: number
  ): Promise<ReScoringResult> {
    let succeeded = 0;
    let failed = 0;
    const errors: ReScoringResult['errors'] = [];

    for (const userId of userIds) {
      try {
        await recommendationService.generate(userId);
        succeeded++;
      } catch (err) {
        failed++;
        errors.push({
          userId,
          reason: err instanceof Error ? err.message : String(err),
        });
      }
    }

    return this.buildResult({
      trigger,
      usersProcessed: userIds.length,
      usersSucceeded: succeeded,
      usersFailed: failed,
      errors,
      startedAt,
    });
  }

  // ── Result builder ─────────────────────────────────────────────────────────

  private buildResult(params: {
    trigger: ReScoringTrigger;
    usersProcessed: number;
    usersSucceeded: number;
    usersFailed: number;
    errors: ReScoringResult['errors'];
    startedAt: number;
  }): ReScoringResult {
    return {
      trigger: params.trigger,
      usersProcessed: params.usersProcessed,
      usersSucceeded: params.usersSucceeded,
      usersFailed: params.usersFailed,
      durationMs: Date.now() - params.startedAt,
      matchingVersion: CURRENT_MATCHING_VERSION,
      completedAt: new Date().toISOString(),
      errors: params.errors,
    };
  }
}

export const recommendationReScoringService =
  new RecommendationReScoringService();
