import apiClient from '@/lib/api-client';
import type {
  AdvisorChatRequest,
  AdvisorChatResponse,
} from '@contracts/shared/types/advisor-types';

export const askAdvisor = async (
  payload: AdvisorChatRequest
): Promise<AdvisorChatResponse> => {
  const response = await apiClient.post('/api/advisor/chat', payload);
  return response.data;
};
