import type z from 'zod';
import {
  roadmapGenerateRequestSchema,
  roadmapGenerateResponseSchema,
  roadmapPhaseSchema,
  roadmapResourceSchema,
  roadmapResourceTypeSchema,
  roadmapResponseSchema,
  roadmapSchema,
  roadmapSourceRecommendationSchema,
  roadmapStatusSchema,
  roadmapStepDifficultySchema,
  roadmapStepSchema,
  roadmapStepStatusSchema,
} from '../schemas/roadmap-schema';

export type RoadmapStatus = z.infer<typeof roadmapStatusSchema>;
export type RoadmapStepStatus = z.infer<typeof roadmapStepStatusSchema>;
export type RoadmapStepDifficulty = z.infer<typeof roadmapStepDifficultySchema>;
export type RoadmapResourceType = z.infer<typeof roadmapResourceTypeSchema>;
export type RoadmapResource = z.infer<typeof roadmapResourceSchema>;
export type RoadmapStep = z.infer<typeof roadmapStepSchema>;
export type RoadmapPhase = z.infer<typeof roadmapPhaseSchema>;
export type RoadmapGenerateRequest = z.infer<
  typeof roadmapGenerateRequestSchema
>;
export type RoadmapSourceRecommendation = z.infer<
  typeof roadmapSourceRecommendationSchema
>;
export type PathwayRoadmap = z.infer<typeof roadmapSchema>;
export type RoadmapGenerateResponse = z.infer<
  typeof roadmapGenerateResponseSchema
>;
export type RoadmapResponse = z.infer<typeof roadmapResponseSchema>;
