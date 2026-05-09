import { z } from 'zod';

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
