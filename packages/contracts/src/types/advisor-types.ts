import type { z } from 'zod';
import type {
  advisorResponseModeSchema,
  advisorContextSourceSchema,
  searchResultSchema,
  advisorChatMessageSchema,
  advisorConversationSchema,
  advisorConversationSummarySchema,
  advisorChatRequestSchema,
  advisorStreamEventSchema,
  advisorConversationListResponseSchema,
  advisorConversationDetailResponseSchema,
} from '../schemas/advisor-schema';

// ─── Public contract types ─────────────────────────────────────────────────────

export type AdvisorResponseMode = z.infer<typeof advisorResponseModeSchema>;
export type AdvisorContextSource = z.infer<typeof advisorContextSourceSchema>;
export type SearchResult = z.infer<typeof searchResultSchema>;
export type AdvisorChatMessage = z.infer<typeof advisorChatMessageSchema>;
export type AdvisorConversation = z.infer<typeof advisorConversationSchema>;
export type AdvisorConversationSummary = z.infer<
  typeof advisorConversationSummarySchema
>;
export type AdvisorChatRequest = z.infer<typeof advisorChatRequestSchema>;
export type AdvisorStreamEvent = z.infer<typeof advisorStreamEventSchema>;
export type AdvisorConversationListResponse = z.infer<
  typeof advisorConversationListResponseSchema
>;
export type AdvisorConversationDetailResponse = z.infer<
  typeof advisorConversationDetailResponseSchema
>;

// ─── LLM tool call types ───────────────────────────────────────────────────────

export type AdvisorToolCall =
  | { name: 'surface_actions'; input: { actions: string[] } }
  | { name: 'surface_follow_ups'; input: { questions: string[] } }
  | { name: 'flag_caution'; input: { message: string } };

// ─── Internal context types ────────────────────────────────────────────────────

export type AdvisorContext = {
  onboarding: Record<string, unknown> | null;
  recommendations: AdvisorRecommendationItem[];
  selectedPathway: AdvisorPathwayData | null;
  roadmapSetup: Record<string, unknown> | null;
  roadmap: AdvisorRoadmapData | null;
  selectedRoadmapStep: {
    phase: Record<string, unknown> | null;
    step: Record<string, unknown>;
  } | null;
};

export type AdvisorRecommendationItem = {
  slug: string;
  explaination?: string;
  rank: number;
  totalScore: number;
  reasons: string[];
};

export type AdvisorPathwayData = {
  title: string;
  slug: string;
  type: string;
  summary: string;
  description: string;
  keySkills: string[];
  opportunities: string[];
  durationProfile: Record<string, unknown>;
  journeyPhases: unknown[];
  verificationNote?: string;
};

export type AdvisorRoadmapData = {
  title: string;
  summary: string;
  currentLevel: string;
  timeBudgetPerWeek: unknown;
  roadmapStyle: string;
  nextReviewAt: unknown;
  pathwaySlug: string;
  phases: Array<Record<string, unknown>>;
  steps: Array<Record<string, unknown>>;
};
