import { z } from 'zod';

export const contentStatusEnum = ['active', 'draft', 'archived'] as const;

export const contentStatusSchema = z.enum(contentStatusEnum);

export type ContentStatus = z.infer<typeof contentStatusSchema>;
