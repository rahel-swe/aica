import type { z } from 'zod';
import type {
  advisorChatRequestSchema,
  advisorChatResponseSchema,
  advisorContextSourceSchema,
  advisorIntentSchema,
  advisorResponseSchema,
} from '../schemas/advisor-schema';

export type AdvisorIntent = z.infer<typeof advisorIntentSchema>;
export type AdvisorContextSource = z.infer<typeof advisorContextSourceSchema>;
export type AdvisorChatRequest = z.infer<typeof advisorChatRequestSchema>;
export type AdvisorResponse = z.infer<typeof advisorResponseSchema>;
export type AdvisorChatResponse = z.infer<typeof advisorChatResponseSchema>;
