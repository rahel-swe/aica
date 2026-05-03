import type z from 'zod';
import {
  roadmapGenerateRequestSchema,
  roadmapGenerateResponseSchema,
  roadmapListResponseSchema,
  roadmapPhaseSchema,
  roadmapSchema,
  roadmapStepSchema,
  roadmapStepStatusSchema,
} from '../schemas/roadmap-schema';

export type RoadmapPhase = z.infer<typeof roadmapPhaseSchema>;
export type RoadmapStepStatus = z.infer<typeof roadmapStepStatusSchema>;
export type RoadmapStep = z.infer<typeof roadmapStepSchema>;
export type RoadmapGenerateRequest = z.infer<
  typeof roadmapGenerateRequestSchema
>;
export type Roadmap = z.infer<typeof roadmapSchema>;
export type RoadmapGenerateResponse = z.infer<
  typeof roadmapGenerateResponseSchema
>;
export type RoadmapListResponse = z.infer<typeof roadmapListResponseSchema>;
