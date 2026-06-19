import z from 'zod';
import { contentStatusSchema } from '../schemas/content-status';
import {
  taxonomyNodeKindSchema,
  pathwayTypeSchema,
  pathwayVisibilityLayerSchema,
  pathwayRouteTypeSchema,
  pathwayCommitmentLevelSchema,
  degreeRequirementSchema,
  pathwayDurationProfileSchema,
  pathwayJourneyPhaseSchema,
  pathwayTranslatableFieldsSchema,
  pathwaysListResponseSchema,
  pathwayDetailResponseSchema,
  scoreBandSchema,
  pathwayMatchProfileSchema,
  matchWeightEntrySchema,
} from '../schemas/pathway-domain-schema';
import type { TranslationMap } from '../schemas/i18n';

// Translatable fields on a taxonomy node
export type TaxonomyNodeTranslatableFields = {
  name: string;
  description?: string;
};

// MongoDB document shape
export interface TaxonomyNodeDocument {
  _id: string; // ObjectId stringified
  slug: string;
  kind: TaxonomyNodeKind;
  parentId: string | null; // null for domain nodes
  order: number;
  status: ContentStatus;
  translations: TranslationMap<TaxonomyNodeTranslatableFields>;
  createdAt: Date;
  updatedAt: Date;
}

// Locale-resolved shape returned by API
export type TaxonomyNodeView = {
  id: string;
  slug: string;
  kind: TaxonomyNodeKind;
  parentId: string | null;
  order: number;
  name: string; // resolved from translations
  description?: string;
};

// Lightweight ref used inside pathway views
export type TaxonomyNodeRef = Pick<
  TaxonomyNodeView,
  'id' | 'slug' | 'kind' | 'name'
>;

export type TaxonomyNodeKind = z.infer<typeof taxonomyNodeKindSchema>;

export type PathwayType = z.infer<typeof pathwayTypeSchema>;

export type MatchWeightEntry = z.infer<typeof matchWeightEntrySchema>;

export type PathwayVisibilityLayer = z.infer<
  typeof pathwayVisibilityLayerSchema
>;

export type PathwayRouteType = z.infer<typeof pathwayRouteTypeSchema>;

export type PathwayCommitmentLevel = z.infer<
  typeof pathwayCommitmentLevelSchema
>;

export type DegreeRequirement = z.infer<typeof degreeRequirementSchema>;

export type PathwayDurationProfile = z.infer<
  typeof pathwayDurationProfileSchema
>;

export type PathwayJourneyPhase = z.infer<typeof pathwayJourneyPhaseSchema>;

export type PathwayTranslatableFields = z.infer<
  typeof pathwayTranslatableFieldsSchema
>;

export type PathwaysListResponse = z.infer<typeof pathwaysListResponseSchema>;

export type PathwayDetailResponse = z.infer<typeof pathwayDetailResponseSchema>;

export type ScoreBand = z.infer<typeof scoreBandSchema>;

export type PathwayMatchProfile = z.infer<typeof pathwayMatchProfileSchema>;

export type ContentStatus = z.infer<typeof contentStatusSchema>;

// ─────────────────────────────────────────────────────────────────────────────
// PATHWAY DOCUMENT  (MongoDB — raw, with translations embedded)
// Not for validation — use pathwayTranslatableFieldsSchema to validate writes.
// ─────────────────────────────────────────────────────────────────────────────

export interface PathwayDocument {
  _id: string;
  slug: string;
  version: number;
  type: PathwayType;
  status: ContentStatus;
  visibilityLayer: PathwayVisibilityLayer;
  durationProfile: PathwayDurationProfile;
  taxonomyNodeIds: string[];
  relatedPathwayIds: string[];
  matchProfileId: string;
  translations: TranslationMap<PathwayTranslatableFields>;
  createdAt: Date;
  updatedAt: Date;
}

// ─────────────────────────────────────────────────────────────────────────────
// PATHWAY VIEW TYPES  (locale-resolved, for API responses)
// ─────────────────────────────────────────────────────────────────────────────

// Common locale-resolved fields (subset used across multiple response shapes)
interface PathwayResolvedFields {
  title: string;
  summary: string;
  keySkills: string[];
  roadmapWindowLabel: string;
}

// Lightweight list item — browse / recommendation card
export type PathwayListView = {
  id: string;
  slug: string;
  type: PathwayType;
  status: ContentStatus;
  visibilityLayer: PathwayVisibilityLayer;
  durationProfile: PathwayDurationProfile;
  taxonomyNodes: TaxonomyNodeRef[];
} & PathwayResolvedFields;

// Full detail — pathway detail page
export type PathwayDetailView = PathwayListView & {
  description: string;
  opportunities: string[];
  verificationNote?: string;
  journeyPhases: PathwayJourneyPhase[];
  relatedPathways: PathwayRelatedSummary[];
};

// Lightweight cross-reference summary (used inside PathwayDetailView.relatedPathways)
export type PathwayRelatedSummary = {
  id: string;
  slug: string;
  type: PathwayType;
  title: string; // resolved for current locale
  summary: string;
};

// Scoring projection — zero translation data (used by scoring engine only)
export type PathwayScoringProjection = {
  id: string;
  slug: string;
  type: PathwayType;
  visibilityLayer: PathwayVisibilityLayer;
  durationProfile: PathwayDurationProfile;
  taxonomyNodeIds: string[];
  matchProfileId: string;
  // English title only — used for explanation generation prompt context
  titleEn: string;
  summaryEn: string;
};

export type RecommendationDimensionScores = {
  strengths: number; // [−0.2, 1]
  passions: number;
  subjects: number;
  learningPreference: number; // ← replaced freeTime
  workEnvironment: number;
  workStyle: number;
  collaborationStyle: number; // ← new
  impact: number;
  goals: number;
};
