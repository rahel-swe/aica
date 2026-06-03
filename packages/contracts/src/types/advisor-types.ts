import type { z } from 'zod';
import type {
  advisorChatRequestSchema,
  advisorChatResponseSchema,
  advisorContextSourceSchema,
  advisorHistoryItemSchema,
  advisorHistoryResponseSchema,
  advisorModeSchema,
  advisorResponseSchema,
  advisorSourceSchema,
} from '../schemas/advisor-schema';

export type AdvisorMode = z.infer<typeof advisorModeSchema>;
export type AdvisorSource = z.infer<typeof advisorSourceSchema>;
export type AdvisorContextSource = z.infer<typeof advisorContextSourceSchema>;
export type AdvisorChatRequest = z.infer<typeof advisorChatRequestSchema>;
export type AdvisorResponse = z.infer<typeof advisorResponseSchema>;
export type AdvisorChatResponse = z.infer<typeof advisorChatResponseSchema>;
export type AdvisorHistoryItem = z.infer<typeof advisorHistoryItemSchema>;
export type AdvisorHistoryResponse = z.infer<
  typeof advisorHistoryResponseSchema
>;

export type AdvisorConversationDeleteResponse = {
  success: boolean;
  message: string;
  data: {
    _id: string;
    message: string;
    mode:
      | 'explain'
      | 'decide'
      | 'guide_step'
      | 'reflect'
      | 'adjust'
      | 'verify'
      | 'general';
    source: 'profile' | 'recommendation' | 'pathway' | 'roadmap' | 'advisor';
    response: {
      mode:
        | 'explain'
        | 'decide'
        | 'guide_step'
        | 'reflect'
        | 'adjust'
        | 'verify'
        | 'general';
      source: 'profile' | 'recommendation' | 'pathway' | 'roadmap' | 'advisor';
      title: string;
      answer: string;
      nextActions: string[];
      cautions: string[];
      suggestedFollowUps: string[];
      contextUsed: (
        | 'pathway'
        | 'roadmap'
        | 'onboarding'
        | 'recommendations'
        | 'pathwayKnowledge'
        | 'roadmapSetup'
      )[];
    };
    createdAt: string;
  };
};
