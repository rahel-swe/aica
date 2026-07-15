import { z } from 'zod';

// ─── Enums ──────────

// What the USER picks — controls which tools are active and how the LLM responds
export const advisorResponseModeSchema = z.enum(['guided', 'focused', 'deep']);

export const advisorContextSourceSchema = z.enum([
  'onboarding',
  'recommendations',
  'pathway',
  'pathwayKnowledge',
  'roadmapSetup',
  'roadmap',
]);

// ─── Search result ─────────────────────────────────────────────────────────────

export const searchResultSchema = z.object({
  title: z.string(),
  url: z.string(),
  content: z.string(),
  source: z.string(),
  score: z.number().optional(),
  favicon: z.string(),
});

// ─── Conversation message ──────────────────────────────────────────────────────

export const advisorMessageRoleArray = ['user', 'assistant'] as const;

export const adviosrMessageRoleEnum = z.enum(advisorMessageRoleArray);

export const advisorChatMessageSchema = z.object({
  role: adviosrMessageRoleEnum,
  id: z.string(),
  content: z.string().min(1),
  actions: z.array(z.string()).max(5).default([]),
  followUps: z.array(z.string()).max(3).default([]),
  cautions: z.array(z.string()).default([]),
  contextUsed: z.array(advisorContextSourceSchema).default([]),
  resources: z.array(searchResultSchema).default([]), // ← web search results
  createdAt: z.coerce.date(),
});

// ─── Conversation ──────────────────────────────────────────────────────────────

export const advisorConversationSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  title: z.string(),
  messages: z.array(advisorChatMessageSchema),
  contextSnapshot: z.record(z.unknown()),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const advisorConversationSummarySchema = z.object({
  _id: z.string(),
  title: z.string(),
  lastMessage: z.string().optional(),
  messageCount: z.number().int().min(0),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

// ─── Request ───────────────────────────────────────────────────────────────────

export const advisorChatRequestSchema = z.object({
  conversationId: z.string().optional(),
  message: z.string().trim().min(1).max(2000),
  responseMode: advisorResponseModeSchema.optional().default('guided'),
  roadmapStep: z
    .object({
      roadmapId: z.string().min(1),
      phaseId: z.string().min(1),
      stepId: z.string().min(1),
    })
    .optional(),
});

// ─── SSE stream events ─────────────────────────────────────────────────────────
//
// Full event sequence with search:
//   start → searching → delta(n) → resources → metadata → done
//
// Without search:
//   start → delta(n) → metadata → done

export const advisorStreamEventSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('start'),
    conversationId: z.string(),
    messageId: z.string(),
  }),

  // ← NEW: emitted before Tavily call, lets the UI show "Searching..."
  z.object({
    type: z.literal('searching'),
    query: z.string(),
  }),
  z.object({
    type: z.literal('delta'),
    content: z.string(),
  }),
  // ← NEW: emitted after search completes, before metadata
  z.object({
    type: z.literal('resources'),
    items: z.array(searchResultSchema),
  }),
  z.object({
    type: z.literal('metadata'),
    actions: z.array(z.string()).default([]),
    followUps: z.array(z.string()).default([]),
    cautions: z.array(z.string()).default([]),
    contextUsed: z.array(advisorContextSourceSchema).default([]),
  }),
  z.object({ type: z.literal('done') }),
  z.object({ type: z.literal('error'), message: z.string() }),
]);

// ─── HTTP envelopes ────────────────────────────────────────────────────────────

export const advisorConversationListResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(advisorConversationSummarySchema),
});

export const advisorConversationDetailResponseSchema = z.object({
  success: z.boolean(),
  data: advisorConversationSchema,
});
