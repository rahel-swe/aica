import { z } from 'zod';

// ─── Enums ────────────────────────────────────────────────────────────────────

export const advisorIntentSchema = z.enum([
  'fit', // "does this pathway fit me?"
  'compare', // "how do I choose between options?"
  'adjust', // "I need to change the plan"
  'decide', // "should I commit to this?"
  'roadmap', // "what should I do next?"
  'general', // catch-all for out-of-bucket questions
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
  intent: advisorIntentSchema,
  answer: z.string().min(1),
  nextActions: z.array(z.string()).min(1).max(5),
  cautions: z.array(z.string()).default([]),
  suggestedFollowUps: z.array(z.string()).min(2).max(3),
  contextUsed: z.array(advisorContextSourceSchema).default([]),
});

// ─── HTTP envelope ────────────────────────────────────────────────────────────

export const advisorChatResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: advisorResponseSchema,
});
