import apiClient from '@/lib/api-client';
import type {
  AdvisorChatRequest,
  AdvisorChatResponse,
  AdvisorHistoryResponse,
} from '@contracts/shared/types/advisor-types';

export const askAdvisor = async (
  payload: AdvisorChatRequest
): Promise<AdvisorChatResponse> => {
  const response = await apiClient.post('/api/advisor/chat', payload);
  return response.data;
};

export const getAdvisorHistory = async (): Promise<AdvisorHistoryResponse> => {
  const response = await apiClient.get('/api/advisor/history');
  return response.data;
};
