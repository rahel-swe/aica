/**
 * Pathway display data (title, summary) is NOT stored in recommendations.
 * Frontend enriches each pathwaySlug by calling GET /pathways/:slug?locale=fa.
 * Taxonomy labels (direction name, family name) are resolved the same way.
 */

import mongoose from 'mongoose';

import { recommendationRepository } from '../repositories/recommendation-repository';

import type {
  PathwayAssessmentCollaborationStyle,
  PathwayAssessmentFormValues,
  PathwayAssessmentGoal,
  PathwayAssessmentImpact,
  PathwayAssessmentLearningPreference,
  PathwayAssessmentPassion,
  PathwayAssessmentStrength,
  PathwayAssessmentSubject,
  PathwayAssessmentWorkEnvironment,
  PathwayAssessmentWorkStyle,
} from '@contracts/shared/types/pathway-assessment-types';
import type {
  PathwayScoringProjection,
  PathwayMatchProfile,
  RecommendationDimensionScores,
  TaxonomyNodeKind,
} from '@contracts/shared/types/pathway-domain-types';
import type {
  RecommendationOverview,
  PathwayRecommendation,
  DirectionRecommendation,
  FamilyRecommendation,
} from '@contracts/shared/schemas/recommendation-schema';
import type { RecommendationInsertDoc } from '../repositories/recommendation-repository';
import { PathwayAssessmentModel } from '../models/pathway-assessment-model';
import { PathwayMatchProfileModel } from '../models/pathway-match-profile-model';
import { PathwayModel } from '../models/pathway-model';
import { TaxonomyNodeModel } from '../models/taxonomy-node-model';
import {
  pathwayScoringEngine,
  CURRENT_MATCHING_VERSION,
} from '../utils/pathway-scoring-engin';
import { buildReasons } from '../utils/recommendation-reasons';

// ── Internal types
interface ScoredPathway {
  pathwayId: string;
  pathwaySlug: string;
  directionSlug?: string;
  familySlug?: string;
  dimensionScores: RecommendationDimensionScores;
  totalScore: number;
  matchPercent: number;
  reasons: string[];
}

interface TaxonomyNodeMinimal {
  id: string;
  slug: string;
  kind: TaxonomyNodeKind;
  parentId: string | null;
}

class RecommendationService {
  // ── Generate

  async generate(userId: string): Promise<RecommendationOverview> {
    // ── 1. Load assessment
    const assessmentDoc = await PathwayAssessmentModel.findOne({
      userId,
      completed: true,
    }).lean();

    if (!assessmentDoc) {
      throw new Error('No completed assessment found for this user.');
    }

    const assessment = this.extractAssessmentValues(assessmentDoc);
    const profileVersion = assessmentDoc.version ?? 1;
    const profileVersionId = String(assessmentDoc._id);

    // ── 2. Load pathway scoring projections
    const pathwayDocs = await PathwayModel.find(
      { status: 'active' },
      {
        slug: 1,
        type: 1,
        visibilityLayer: 1,
        durationProfile: 1,
        taxonomyNodeIds: 1,
        matchProfileId: 1,
        'translations.en.title': 1,
        'translations.en.summary': 1,
      }
    ).lean();

    if (!pathwayDocs.length)
      throw new Error('No active pathways found. Seed the database first.');

    // ── 3. Load all active match profiles
    const profileDocs = await PathwayMatchProfileModel.find(
      { status: 'active' },
      {
        strengths: 1,
        passions: 1,
        subjects: 1,
        learningPreference: 1,
        workEnvironment: 1,
        workStyle: 1,
        collaborationStyle: 1,
        impact: 1,
        goals: 1,
        version: 1,
      }
    ).lean();

    const profileById = new Map(profileDocs.map((p) => [String(p._id), p]));

    // ── 4. Load taxonomy nodes for direction/family resolution ─────────────
    const taxonomyDocs = await TaxonomyNodeModel.find(
      { status: 'active' },
      { slug: 1, kind: 1, parentId: 1 }
    ).lean();

    const taxonomyById = new Map<string, TaxonomyNodeMinimal>(
      taxonomyDocs.map((t) => [
        String(t._id),
        {
          id: String(t._id),
          slug: t.slug,
          kind: t.kind as TaxonomyNodeKind,
          parentId: t.parentId ? String(t.parentId) : null,
        },
      ])
    );

    // ── 5. Score each pathway
    const scored: ScoredPathway[] = [];

    for (const pathway of pathwayDocs) {
      const profile = profileById.get(String(pathway.matchProfileId));
      if (!profile) continue; // no match profile → skip, don't crash

      const matchProfile = profile as unknown as PathwayMatchProfile;

      const dimensionScores = pathwayScoringEngine.buildDimensionScores(
        assessment,
        matchProfile
      );

      const totalScore =
        pathwayScoringEngine.calculateTotalScore(dimensionScores);
      const matchPercent = pathwayScoringEngine.toMatchPercent(totalScore);

      const { directionSlug, familySlug } = this.resolveTaxonomySlugs(
        pathway.taxonomyNodeIds.map(String),
        taxonomyById
      );

      const reasons = buildReasons(assessment, matchProfile, dimensionScores);

      scored.push({
        pathwayId: String(pathway._id),
        pathwaySlug: pathway.slug,
        directionSlug,
        familySlug,
        dimensionScores,
        totalScore,
        matchPercent,
        reasons,
      });
    }

    // ── 6. Sort and assign ranks
    scored.sort((a, b) => b.totalScore - a.totalScore);

    // ── 7. Atomic replace in a transaction
    const session = await mongoose.startSession();

    try {
      // await session.withTransaction(async () => {
      const insertDocs: RecommendationInsertDoc[] = scored.map((s, i) => ({
        userId: new mongoose.Types.ObjectId(userId),
        pathwayId: new mongoose.Types.ObjectId(s.pathwayId),
        pathwaySlug: s.pathwaySlug,
        directionSlug: s.directionSlug,
        familySlug: s.familySlug,
        totalScore: s.totalScore,
        matchPercent: s.matchPercent,
        dimensionScores: s.dimensionScores,
        rank: i + 1,
        matchingVersion: CURRENT_MATCHING_VERSION,
        profileVersion,
        profileVersionId: new mongoose.Types.ObjectId(profileVersionId),
        reasons: s.reasons,
        sourceProfileSnapshot: assessment as unknown as Record<string, unknown>,
      }));

      await recommendationRepository.replaceAllForUser(
        userId,
        insertDocs,
        session
      );
      // });
    } finally {
      await session.endSession();
    }

    // ── 8. Return 3-layer overview ─────────────────────────────────────────
    return this.buildOverview(scored);
  }

  // ── Get overview (read-only) ──

  /**
     Returns stored recommendations as a 3-layer overview.
   */
  async getOverview(userId: string): Promise<RecommendationOverview> {
    const stored = await recommendationRepository.findAllByUserId(userId);

    if (!stored.length) {
      return { families: [], directions: [], pathways: [] };
    }

    // Map stored IRecommendation documents to ScoredPathway for buildOverview
    const asScored: ScoredPathway[] = stored.map((r) => ({
      pathwayId: String(r.pathwayId),
      pathwaySlug: r.pathwaySlug,
      directionSlug: r.directionSlug,
      familySlug: r.familySlug,
      dimensionScores: r.dimensionScores,
      totalScore: r.totalScore,
      matchPercent: r.matchPercent,
      reasons: r.reasons,
    }));

    return this.buildOverview(asScored, stored);
  }

  // ── Overview builder

  /**
   * Builds the 3-layer overview from a scored + ranked list.
   *
   * storedDocs is optional — when passed, hasExplanation and
   * recommendation ids are populated on Layer 3.
   */
  private buildOverview(
    scored: ScoredPathway[],
    storedDocs?: {
      _id: unknown;
      pathwaySlug: string;
      explanation?: string;
      rank: number;
    }[]
  ): RecommendationOverview {
    // ── Layer 3: pathways ──
    const storedBySlug = new Map(
      (storedDocs ?? []).map((d) => [d.pathwaySlug, d])
    );

    const pathways: PathwayRecommendation[] = scored.map((s, i) => {
      const stored = storedBySlug.get(s.pathwaySlug);
      return {
        id: stored ? String(stored._id) : '',
        pathwaySlug: s.pathwaySlug,
        directionSlug: s.directionSlug,
        familySlug: s.familySlug,
        totalScore: s.totalScore,
        matchPercent: s.matchPercent,
        dimensionScores: s.dimensionScores,
        rank: i + 1,
        reasons: s.reasons,
        hasExplanation: Boolean(stored?.explanation),
        explanation: stored?.explanation,
      };
    });

    // ── Layer 2: directions (field-level grouping) ────────────────────────
    const directionMap = new Map<string, ScoredPathway[]>();

    for (const s of scored) {
      if (!s.directionSlug) continue;
      const existing = directionMap.get(s.directionSlug) ?? [];
      existing.push(s);
      directionMap.set(s.directionSlug, existing);
    }

    const directions: DirectionRecommendation[] = Array.from(
      directionMap.entries()
    )
      .map(([directionSlug, pathways]) => {
        const sorted = [...pathways].sort(
          (a, b) => b.totalScore - a.totalScore
        );
        const top3 = sorted.slice(0, 3);
        const avgScore =
          top3.reduce((s, p) => s + p.totalScore, 0) / top3.length;
        const familySlug = pathways[0]?.familySlug;

        return {
          directionSlug,
          familySlug,
          totalScore: Number(avgScore.toFixed(4)),
          matchPercent: Math.round(avgScore * 100),
          pathwayCount: pathways.length,
          topPathwaySlugs: top3.map((p) => p.pathwaySlug),
        };
      })
      .sort((a, b) => b.totalScore - a.totalScore);

    // ── Layer 1: families (domain-level grouping)
    const familyMap = new Map<string, ScoredPathway[]>();

    for (const s of scored) {
      if (!s.familySlug) continue;
      const existing = familyMap.get(s.familySlug) ?? [];
      existing.push(s);
      familyMap.set(s.familySlug, existing);
    }

    const families: FamilyRecommendation[] = Array.from(familyMap.entries())
      .map(([familySlug, pathways]) => {
        const sorted = [...pathways].sort(
          (a, b) => b.totalScore - a.totalScore
        );
        const top3 = sorted.slice(0, 3);
        const avgScore =
          top3.reduce((s, p) => s + p.totalScore, 0) / top3.length;

        const familyDirections = directions.filter(
          (d) => d.familySlug === familySlug
        );

        return {
          familySlug,
          totalScore: Number(avgScore.toFixed(4)),
          matchPercent: Math.round(avgScore * 100),
          pathwayCount: pathways.length,
          directionCount: familyDirections.length,
          topPathwaySlugs: top3.map((p) => p.pathwaySlug),
          directions: familyDirections,
        };
      })
      .sort((a, b) => b.totalScore - a.totalScore);

    return { families, directions, pathways };
  }

  // ── Taxonomy resolution ────

  /**
   * Given the taxonomyNodeIds of a pathway, resolves:
   *   directionSlug — the field-level node slug
   *   familySlug    — the domain-level node slug (parent of direction)
   *
   * A pathway's taxonomyNodeIds should include domain, field, and
   * specialization nodes. We find the field-level node as the direction,
   * then walk up to its parent to get the domain/family.
   */
  private resolveTaxonomySlugs(
    taxonomyNodeIds: string[],
    taxonomyById: Map<string, TaxonomyNodeMinimal>
  ): { directionSlug?: string; familySlug?: string } {
    let directionSlug: string | undefined;
    let familySlug: string | undefined;

    for (const id of taxonomyNodeIds) {
      const node = taxonomyById.get(id);
      if (!node) continue;

      if (node.kind === 'field') {
        directionSlug = node.slug;

        // Walk up one level to get the domain
        if (node.parentId) {
          const parent = taxonomyById.get(node.parentId);
          if (parent?.kind === 'domain') {
            familySlug = parent.slug;
          }
        }
        break; // Only one field node expected per pathway
      }
    }

    return { directionSlug, familySlug };
  }

  // ── Assessment value extractor

  /**
   * Extracts PathwayAssessmentFormValues from the raw Mongoose document.
   */
  private extractAssessmentValues(
    doc: Record<string, unknown>
  ): PathwayAssessmentFormValues {
    return {
      strengths: doc.strengths as PathwayAssessmentStrength[],
      passions: doc.passions as PathwayAssessmentPassion[],
      subjects: doc.subjects as PathwayAssessmentSubject,
      learningPreference:
        doc.learningPreference as PathwayAssessmentLearningPreference[],
      workEnvironment: doc.workEnvironment as PathwayAssessmentWorkEnvironment,
      workStyle: doc.workStyle as PathwayAssessmentWorkStyle[],
      collaborationStyle:
        doc.collaborationStyle as PathwayAssessmentCollaborationStyle,
      impact: doc.impact as PathwayAssessmentImpact[],
      goals: doc.goals as PathwayAssessmentGoal,
    };
  }
}

export const recommendationService = new RecommendationService();
