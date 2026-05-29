import type z from 'zod';
import {
  matchWeightSchema,
  pathwayDetailResponseSchema,
  pathwayDetailSchema,
  pathwayDurationProfileSchema,
  pathwayJourneyPhaseSchema,
  pathwayListItemSchema,
  pathwayMatchProfileSchema,
  pathwayVisibilityLayerSchema,
  degreeRequirementSchema,
  pathwaySchema,
  pathwayCommitmentLevelSchema,
  pathwayStatusSchema,
  pathwayTimelineTypeSchema,
  pathwaysListResponseSchema,
  pathwayTypeSchema,
  relatedPathwaySummarySchema,
  scoreBandSchema,
  taxonomyNodeKindSchema,
  taxonomyNodeSchema,
  taxonomyNodeStatusSchema,
  taxonomyNodeSummarySchema,
} from '../schemas/pathway-domain-schema';

export type TaxonomyNodeKind = z.infer<typeof taxonomyNodeKindSchema>;
export type TaxonomyNodeStatus = z.infer<typeof taxonomyNodeStatusSchema>;
export type PathwayType = z.infer<typeof pathwayTypeSchema>;
export type PathwayStatus = z.infer<typeof pathwayStatusSchema>;
export type PathwayVisibilityLayer = z.infer<
  typeof pathwayVisibilityLayerSchema
>;
export type PathwayCommitmentLevel = z.infer<
  typeof pathwayCommitmentLevelSchema
>;
export type PathwayTimelineType = z.infer<typeof pathwayTimelineTypeSchema>;
export type DegreeRequirement = z.infer<typeof degreeRequirementSchema>;
export type ScoreBand = z.infer<typeof scoreBandSchema>;
export type MatchWeight = z.infer<typeof matchWeightSchema>;
export type TaxonomyNode = z.infer<typeof taxonomyNodeSchema>;
export type PathwayDurationProfile = z.infer<
  typeof pathwayDurationProfileSchema
>;
export type PathwayJourneyPhase = z.infer<typeof pathwayJourneyPhaseSchema>;
export type Pathway = z.infer<typeof pathwaySchema>;
export type PathwayMatchProfile = z.infer<typeof pathwayMatchProfileSchema>;
export type TaxonomyNodeSummary = z.infer<typeof taxonomyNodeSummarySchema>;
export type RelatedPathwaySummary = z.infer<typeof relatedPathwaySummarySchema>;

export type PathwayListItem = z.infer<typeof pathwayListItemSchema>;

export type PathwayDetail = z.infer<typeof pathwayDetailSchema>;
export type PathwaysListResponse = z.infer<typeof pathwaysListResponseSchema>;
export type PathwayDetailResponse = z.infer<typeof pathwayDetailResponseSchema>;

export type RecommendationDimensionScores = {
  strengths: number;
  subjects: number;
  passions: number;
  freeTime: number;
  workEnvironment: number;
  workStyle: number;
  impact: number;
  goals: number;
};

export type RecommendationGroupRef = {
  slug: string;
  title: string;
};

export type RecommendationDirectionMatch = RecommendationGroupRef & {
  totalScore: number;
  matchPercent: number;
  pathwayCount: number;
  topPathwaySlugs: string[];
};

export type RecommendationFamilyMatch = RecommendationGroupRef & {
  direction: RecommendationGroupRef;
  totalScore: number;
  matchPercent: number;
  pathwayCount: number;
  topPathwaySlugs: string[];
};

export type RecommendationItem = {
  pathwayId: string;
  title: string;
  slug: string;
  type: PathwayType;
  summary: string;
  totalScore: number;
  matchPercent?: number;
  dimensionScores: RecommendationDimensionScores;
  reasons: string[];
  explanation?: string;
  visibilityLayer?: PathwayVisibilityLayer;
  direction?: RecommendationGroupRef;
  family?: RecommendationGroupRef;
  rank?: number;
  matchingVersion?: number;
};

export type RecommendationOverview = {
  directionMatches: RecommendationDirectionMatch[];
  familyMatches: RecommendationFamilyMatch[];
  pathwayRecommendations: RecommendationItem[];
};
