import { z } from 'zod';

export const advisorIntentSchema = z.enum([
  'fit',
  'roadmap',
  'compare',
  'adjust',
  'decide',
]);

export const advisorContextSourceSchema = z.enum([
  'onboarding',
  'recommendations',
  'pathway',
  'roadmapSetup',
  'roadmap',
  'pathwayKnowledge',
]);

export const advisorChatRequestSchema = z.object({
  message: z.string().trim().min(3).max(800),
  intent: advisorIntentSchema.default('roadmap'),
});

export const advisorResponseSchema = z.object({
  intent: advisorIntentSchema,
  title: z.string().min(1),
  directAnswer: z.string().min(1),
  meaning: z.string().min(1),
  nextActions: z.array(z.string()).min(1).max(5),
  cautions: z.array(z.string()).default([]),
  contextUsed: z.array(advisorContextSourceSchema).default([]),
  suggestedFollowUps: z.array(z.string()).default([]),
});

export const advisorChatResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: advisorResponseSchema,
});
