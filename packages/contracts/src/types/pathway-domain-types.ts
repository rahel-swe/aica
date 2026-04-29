import type z from 'zod';
import {
  matchWeightSchema,
  pathwayMatchProfileSchema,
  pathwaySchema,
  pathwayStatusSchema,
  pathwayTypeSchema,
  scoreBandSchema,
  taxonomyNodeKindSchema,
  taxonomyNodeSchema,
  taxonomyNodeStatusSchema,
} from '../schemas/pathway-domain-schema';

export type TaxonomyNodeKind = z.infer<typeof taxonomyNodeKindSchema>;
export type TaxonomyNodeStatus = z.infer<typeof taxonomyNodeStatusSchema>;
export type PathwayType = z.infer<typeof pathwayTypeSchema>;
export type PathwayStatus = z.infer<typeof pathwayStatusSchema>;
export type ScoreBand = z.infer<typeof scoreBandSchema>;
export type MatchWeight = z.infer<typeof matchWeightSchema>;
export type TaxonomyNode = z.infer<typeof taxonomyNodeSchema>;
export type Pathway = z.infer<typeof pathwaySchema>;
export type PathwayMatchProfile = z.infer<typeof pathwayMatchProfileSchema>;

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

export type RecommendationResult = {
  pathwayId: string;
  title: string;
  slug: string;
  type: PathwayType;
  summary: string;
  totalScore: number;
  dimensionScores: RecommendationDimensionScores;
  reasons: string[];
};
