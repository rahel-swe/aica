/**
 * recommendation.types.ts
 *
 * 3-layer recommendation architecture:
 *
 *   LAYER 1 — Family  (domain taxonomy level)
 *     "You have strong alignment with Technology broadly."
 *     User can explore all pathways within this domain.
 *
 *   LAYER 2 — Direction  (field taxonomy level)
 *     "Within Technology, Software Development fits you best."
 *     User can explore all pathways within this field.
 *
 *   LAYER 3 — Pathway  (individual recommendation)
 *     "Frontend Development is your top match at 87%."
 *     User can generate a roadmap or ask "Why?".
 *
 * Pathway reference is slug only — display data (title, summary, type,
 * visibilityLayer) is fetched from the pathway service with the user's locale.
 * Taxonomy slugs (directionSlug, familySlug) are resolved via taxonomy service.
 *
 * reasons[]    → rule-based text, computed at scoring time, no LLM, always present
 * explanation  → LLM-generated, on-demand only (user clicks "Why?"), then cached
 * hasExplanation → true when explanation is already cached in DB
 */

import { z } from 'zod';
import type { RecommendationDimensionScores } from '../types/pathway-domain-types';

// ─────────────────────────────────────────────────────────────────────────────
// LAYER 3 — Individual pathway recommendation
// ─────────────────────────────────────────────────────────────────────────────

export type PathwayRecommendation = {
  id: string; // recommendation document id
  pathwaySlug: string; // use to call pathway service for localized data
  directionSlug?: string; // use to call taxonomy service
  familySlug?: string;

  totalScore: number; // weighted sum, clamped [0, 1]
  matchPercent: number; // Math.round(totalScore * 100)
  dimensionScores: RecommendationDimensionScores;
  rank: number; // 1 = highest scored

  reasons: string[]; // top 3 dimension match labels, rule-based
  hasExplanation: boolean; // true if LLM explanation is cached
  explanation?: string; // only populated after "Why?" request
};

export const pathwayRecommendationSchema = z.object({
  id: z.string(),
  pathwaySlug: z.string(),
  directionSlug: z.string().optional(),
  familySlug: z.string().optional(),
  totalScore: z.number().min(0).max(1),
  matchPercent: z.number().min(0).max(100),
  dimensionScores: z.object({
    strengths: z.number(),
    passions: z.number(),
    subjects: z.number(),
    learningPreference: z.number(),
    workEnvironment: z.number(),
    workStyle: z.number(),
    collaborationStyle: z.number(),
    impact: z.number(),
    goals: z.number(),
  }),
  rank: z.number().int().min(1),
  reasons: z.array(z.string()),
  hasExplanation: z.boolean(),
  explanation: z.string().optional(),
});

// ─────────────────────────────────────────────────────────────────────────────
// LAYER 2 — Direction recommendation  (field-level grouping)
// ─────────────────────────────────────────────────────────────────────────────

export type DirectionRecommendation = {
  directionSlug: string; // use to call taxonomy service for localized name
  familySlug?: string; // parent domain slug

  totalScore: number; // average of top-3 pathway scores in this direction
  matchPercent: number;

  pathwayCount: number; // total pathways in this direction
  topPathwaySlugs: string[]; // top 3 pathway slugs, ordered by score
};

export const directionRecommendationSchema = z.object({
  directionSlug: z.string(),
  familySlug: z.string().optional(),
  totalScore: z.number().min(0).max(1),
  matchPercent: z.number().min(0).max(100),
  pathwayCount: z.number().int().min(1),
  topPathwaySlugs: z.array(z.string()).max(3),
});

// ─────────────────────────────────────────────────────────────────────────────
// LAYER 1 — Family recommendation  (domain-level grouping)
// ─────────────────────────────────────────────────────────────────────────────

export type FamilyRecommendation = {
  familySlug: string; // use to call taxonomy service for localized name

  totalScore: number; // average of top-3 pathway scores in this domain
  matchPercent: number;

  pathwayCount: number; // total pathways across all directions in this domain
  directionCount: number; // number of directions in this domain
  topPathwaySlugs: string[]; // top 3 pathway slugs across the whole domain
  directions: DirectionRecommendation[]; // all directions, ordered by score
};

export const familyRecommendationSchema = z.object({
  familySlug: z.string(),
  totalScore: z.number().min(0).max(1),
  matchPercent: z.number().min(0).max(100),
  pathwayCount: z.number().int().min(1),
  directionCount: z.number().int().min(1),
  topPathwaySlugs: z.array(z.string()).max(3),
  directions: z.array(directionRecommendationSchema),
});

// ─────────────────────────────────────────────────────────────────────────────
// RECOMMENDATION OVERVIEW  (all 3 layers in one API response)
// ─────────────────────────────────────────────────────────────────────────────

export type RecommendationOverview = {
  // Layer 1: domain groups — "Explore Technology broadly"
  families: FamilyRecommendation[];

  // Layer 2: field groups — "Explore Software Development"
  directions: DirectionRecommendation[];

  // Layer 3: individual pathway matches — "Frontend Development, 87%"
  pathways: PathwayRecommendation[];
};

export const recommendationOverviewSchema = z.object({
  families: z.array(familyRecommendationSchema),
  directions: z.array(directionRecommendationSchema),
  pathways: z.array(pathwayRecommendationSchema),
});

// ─────────────────────────────────────────────────────────────────────────────
// API RESPONSE WRAPPERS
// ─────────────────────────────────────────────────────────────────────────────

export const recommendationOverviewResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: recommendationOverviewSchema,
});

// On-demand explanation response (from GET /recommendations/:id/explanation)
export const recommendationExplanationResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    recommendationId: z.string(),
    pathwaySlug: z.string(),
    explanation: z.string(),
    generatedAt: z.string(),
    generatedByModel: z.string(),
  }),
});

export type RecommendationOverviewResponse = z.infer<
  typeof recommendationOverviewResponseSchema
>;
export type RecommendationExplanationResponse = z.infer<
  typeof recommendationExplanationResponseSchema
>;

// ─────────────────────────────────────────────────────────────────────────────
// RE-SCORING TYPES
// ─────────────────────────────────────────────────────────────────────────────

// Reason a re-score was triggered — stored for audit
export type ReScoringTrigger =
  | 'user_assessment_updated' // user re-took or updated their assessment
  | 'pathway_profile_updated' // admin updated a pathway's match profile
  | 'algorithm_version_changed' // CURRENT_MATCHING_VERSION was incremented
  | 'manual_admin_trigger'; // explicit admin action

export type ReScoringResult = {
  trigger: ReScoringTrigger;
  usersProcessed: number;
  usersSucceeded: number;
  usersFailed: number;
  durationMs: number;
  matchingVersion: number;
  completedAt: string;
  errors: Array<{ userId: string; reason: string }>;
};
