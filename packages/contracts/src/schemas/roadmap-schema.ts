import { z } from 'zod';
import { roadmapSetupStyle } from './roadmap-setup-assessment-schema';

export const roadmapStepStatusSchema = z.enum([
  'pending',
  'in_progress',
  'completed',
]);

export const roadmapStepDifficultySchema = z.enum(['easy', 'medium', 'hard']);

export const roadmapResourceTypeSchema = z.enum([
  'course',
  'video',
  'article',
  'project',
  'tool',
  'other',
]);

export const roadmapStatusSchema = z.enum(['draft', 'active', 'archived']);

export const roadmapResourceSchema = z.object({
  title: z.string().min(1),
  url: z.string().url().optional(),
  type: roadmapResourceTypeSchema.default('other'),
});

export const roadmapStepSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  why: z.string().min(1),
  estimatedTime: z.string().optional(),
  difficulty: roadmapStepDifficultySchema.default('medium'),
  prerequisites: z.array(z.string()).default([]),
  resources: z.array(roadmapResourceSchema).default([]),
  evidenceOfCompletion: z.string().optional(),
  status: roadmapStepStatusSchema.default('pending'),
  order: z.number().int().nonnegative(),
});

export const roadmapPhaseSchema = z.object({
  id: z.string(),
  phase: z.string().min(1),
  title: z.string().min(1),
  objective: z.string().min(1),
  order: z.number().int().nonnegative(),
  steps: z.array(roadmapStepSchema).min(1),
});

export const roadmapGenerateRequestSchema = z.object({
  pathwayId: z.string().min(1),
});

export const roadmapSourceRecommendationSchema = z.object({
  pathwayId: z.string(),
  reasons: z.array(z.string()),
  explanation: z.string().optional(),
  totalScore: z.number(),
});

export const roadmapSchema = z.object({
  id: z.string(),
  pathwayId: z.string(),
  version: z.number().int().positive(),
  status: roadmapStatusSchema,
  title: z.string(),
  summary: z.string(),
  goal: z.string().optional(),
  currentLevel: z.string().optional(),
  timeBudgetPerWeek: z.string().optional(),
  roadmapStyle: roadmapSetupStyle.optional(),
  phases: z.array(roadmapPhaseSchema).min(1),
  aiSummary: z.string().optional(),
  guidanceNote: z.string().optional(),
  userEdits: z.array(z.string()).default([]),
  lastGeneratedAt: z.string().optional(),
  nextReviewAt: z.string().optional(),
  sourceRecommendation: roadmapSourceRecommendationSchema.optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const roadmapGenerateResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: roadmapSchema,
});

export const roadmapResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: roadmapSchema.nullable(),
});
