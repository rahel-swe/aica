import apiClient from '@/lib/api-client';
import type { RecommendationResult } from '@contracts/shared/types/pathway-domain-types';

export const generateRecommendations = async () => {
  const response = await apiClient.post(`/api/recommendations/generate`);
  return response.data;
};

export const getMyRecommendations = async (): Promise<{
  success: boolean;
  message: string;
  data: RecommendationResult[];
}> => {
  const response = await apiClient.get(`/api/recommendations/me`);
  return response.data;
};
