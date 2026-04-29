import apiClient from '@/lib/api-client';

export const generateRecommendations = async () => {
  const response = await apiClient.post(`/api/recommendations/generate`);
  return response.data;
};

export const getMyRecommendations = async () => {
  const response = await apiClient.get(`/api/recommendations/me`);
  return response.data;
};
