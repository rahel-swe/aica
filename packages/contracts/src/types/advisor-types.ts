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
