import { z } from 'zod';

export const roadmapStepStatusEnum = [
  'pending',
  'in_progress',
  'completed',
] as const;

export const roadmapStepStatusSchema = z.enum(roadmapStepStatusEnum);

export const roadmapStepDifficultyEnum = ['easy', 'medium', 'hard'] as const;

export const roadmapStepDifficultySchema = z.enum(roadmapStepDifficultyEnum);

export const roadmapStepResourceEnum = [
  'course',
  'video',
  'article',
  'project',
  'tool',
  'other',
] as const;

export const roadmapResourceTypeSchema = z.enum(roadmapStepResourceEnum);

export const roadmapStatusEnum = ['draft', 'active', 'archived'] as const;
export const roadmapStatusSchema = z.enum(roadmapStatusEnum);
