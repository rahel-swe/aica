import apiClient from '@/lib/api-client';
import type { RecommendationOverview } from '@contracts/shared/types/pathway-domain-types';

export const generateRecommendations = async () => {
  const response = await apiClient.post(`/api/recommendations/generate`);
  return response.data;
};

export const getMyRecommendations = async (): Promise<{
  success: boolean;
  message: string;
  data: RecommendationOverview;
}> => {
  const response = await apiClient.get(`/api/recommendations/me`);
  return response.data;
};

export const deleteMyRecommendations = async (): Promise<{
  success: boolean;
  message: string;
  data?: unknown;
}> => {
  const response = await apiClient.delete(`/api/recommendations`);
  return response.data;
};
