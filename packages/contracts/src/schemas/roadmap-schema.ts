import { z } from 'zod';

export const roadmapPhaseSchema = z.enum([
  'short_term',
  'medium_term',
  'long_term',
]);

export const roadmapStepStatusSchema = z.enum([
  'pending',
  'in_progress',
  'completed',
]);

export const roadmapStepSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  phase: roadmapPhaseSchema,
  order: z.number().int().nonnegative(),
  status: roadmapStepStatusSchema.default('pending'),
});

export const roadmapGenerateRequestSchema = z.object({
  pathwayId: z.string().min(1),
});

export const roadmapSchema = z.object({
  id: z.string(),
  pathwayId: z.string(),
  title: z.string(),
  summary: z.string(),
  guidanceNote: z.string().optional(),
  steps: z.array(roadmapStepSchema),
  sourceRecommendation: z
    .object({
      pathwayId: z.string(),
      reasons: z.array(z.string()),
      explanation: z.string().optional(),
      totalScore: z.number(),
    })
    .optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const roadmapGenerateResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: roadmapSchema,
});

export const roadmapListResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(roadmapSchema),
});
