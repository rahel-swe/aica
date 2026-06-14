/**
 * recommendation.controller.ts
 *
 * HTTP layer only. No business logic here.
 * All scoring, grouping, explanation, and re-scoring live in their services.
 *
 * Routes (mounted at /recommendations):
 *   POST   /generate               — score all pathways, store, return overview
 *   GET    /me                     — return stored overview (no re-score)
 *   GET    /:id/explanation        — on-demand LLM explanation ("Why?")
 *   POST   /admin/rescore/user/:id — admin: rescore one user
 *   POST   /admin/rescore/pathway  — admin: rescore all users for a pathway
 *   POST   /admin/rescore/stale    — admin: batch rescore stale recommendations
 *   GET    /admin/rescore/stale/count — admin: how many users are stale
 *
 * req.user.id  — set by auth middleware
 * req.locale   — set by locale middleware (unused here; recommendations are locale-independent)
 */

import type { Request, Response, NextFunction } from 'express';

import { recommendationService } from '../services/recommendation-service';
import { recommendationExplanationService } from '../services/recommendation-explanation-service';
import { recommendationReScoringService } from '../services/recommendation-rescoring-service';
import type { AuthRequest } from '../middleware/auth-middleware';

// ── Controller ────────────────────────────────────────────────────────────────

class RecommendationController {
  // ── POST /recommendations/generate ────────────────────────────────────────

  /**
   * Runs the full scoring pipeline for the requesting user.
   * Replaces any existing recommendations.
   * Returns the 3-layer overview immediately.
   */
  generate = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;
      const overview = await recommendationService.generate(userId);

      res.status(200).json({
        success: true,
        message: 'Recommendations generated.',
        data: overview,
      });
    } catch (err) {
      next(err);
    }
  };

  // ── GET /recommendations/me ────────────────────────────────────────────────

  /**
   * Returns the stored 3-layer overview without re-scoring.
   * If no recommendations exist yet, returns empty layers with a status hint.
   */
  getOverview = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;
      const overview = await recommendationService.getOverview(userId);

      const hasData =
        overview.families.length > 0 || overview.pathways.length > 0;

      res.status(200).json({
        success: true,
        message: hasData
          ? 'Recommendations retrieved.'
          : 'No recommendations yet. Call POST /generate first.',
        data: overview,
      });
    } catch (err) {
      next(err);
    }
  };

  // ── GET /recommendations/:id/explanation ──────────────────────────────────

  /**
   * Returns an LLM-generated explanation for one recommendation.
   * Checks the DB cache first. If not cached, calls the LLM (with retry)
   * and caches the result before responding.
   *
   * The recommendation must belong to the requesting user.
   */
  getExplanation = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user!.id;
      const recommendationId = req.params.id as string;

      const result = await recommendationExplanationService.getOrGenerate(
        recommendationId,
        userId
      );

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  // ── Admin: rescore one user ────────────────────────────────────────────────

  rescoreUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id: userId } = req.params as { id: string };

      const result = await recommendationReScoringService.rescoreUser(
        userId,
        'manual_admin_trigger'
      );

      res.status(200).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  };

  // ── Admin: rescore all users affected by a pathway profile change ──────────

  rescoreByPathway = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { pathwaySlug } = req.body as { pathwaySlug: string };

      if (!pathwaySlug) {
        res.status(400).json({
          success: false,
          message: 'pathwaySlug is required in the request body.',
        });
        return;
      }

      const result = await recommendationReScoringService.rescoreByPathwaySlug(
        pathwaySlug,
        'pathway_profile_updated'
      );

      res.status(200).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  };

  // ── Admin: batch rescore stale recommendations ────────────────────────────

  rescoreStale = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const batchSize = Number(req.query.batchSize) || 20;

      const result = await recommendationReScoringService.rescoreStale(
        batchSize,
        'algorithm_version_changed'
      );

      res.status(200).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  };

  // ── Admin: stale count health check ──────────────────────────────────────

  getStaleCount = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const count = await recommendationReScoringService.getStaleCount();

      res.status(200).json({
        success: true,
        data: {
          staleCount: count,
          matchingVersion: (await import('../utils/pathway-scoring-engin'))
            .CURRENT_MATCHING_VERSION,
        },
      });
    } catch (err) {
      next(err);
    }
  };
}

export const recommendationController = new RecommendationController();
