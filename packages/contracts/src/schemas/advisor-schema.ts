import { z } from 'zod';

// ─── Enums ────────────────────────────────────────────────────────────────────

export const advisorModeSchema = z.enum([
  'explain',
  'decide',
  'guide_step',
  'reflect',
  'adjust',
  'verify',
  'general',
]);

export const advisorSourceSchema = z.enum([
  'profile',
  'recommendation',
  'pathway',
  'roadmap',
  'advisor',
]);

export const advisorContextSourceSchema = z.enum([
  'onboarding',
  'recommendations',
  'pathway',
  'pathwayKnowledge',
  'roadmapSetup',
  'roadmap',
]);

// ─── Request ──────────────────────────────────────────────────────────────────

export const advisorChatRequestSchema = z.object({
  message: z.string().trim().min(3).max(800),
  mode: advisorModeSchema.optional(),
  source: advisorSourceSchema.optional(),
  roadmapStep: z
    .object({
      roadmapId: z.string().min(1),
      phaseId: z.string().min(1),
      stepId: z.string().min(1),
    })
    .optional(),
  // Reserved for conversation history support — not active yet.
  // Include now so clients don't need a breaking change when we wire it up.
  conversationId: z.string().uuid().optional(),
});

// ─── Response ─────────────────────────────────────────────────────────────────
// Shape is designed around what the chat UI actually renders:
//   answer            → main message bubble content
//   intent            → optional badge/icon the UI can surface
//   nextActions       → action cards below the bubble (1–5 items)
//   cautions          → warning chips (licensing, missing data, etc.)
//   suggestedFollowUps → quick-reply chips the user can tap
//   contextUsed       → source pills for transparency / trust

export const advisorResponseSchema = z.object({
  mode: advisorModeSchema,
  source: advisorSourceSchema,
  title: z.string().min(1).max(90),
  answer: z.string().min(1),
  nextActions: z.array(z.string()).max(5).default([]),
  cautions: z.array(z.string()).default([]),
  suggestedFollowUps: z.array(z.string()).max(3).default([]),
  contextUsed: z.array(advisorContextSourceSchema).default([]),
});

// ─── HTTP envelope ────────────────────────────────────────────────────────────

export const advisorChatResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: advisorResponseSchema,
});

export const advisorHistoryItemSchema = z.object({
  _id: z.string(),
  message: z.string(),
  mode: advisorModeSchema,
  source: advisorSourceSchema,
  response: advisorResponseSchema,
  createdAt: z.string(),
});

export const advisorHistoryResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(advisorHistoryItemSchema),
});
