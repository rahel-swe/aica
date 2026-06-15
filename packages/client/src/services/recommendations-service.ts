import apiClient from '@/lib/api-client';
import type {
  RecommendationOverview,
  RecommendationExplanationResponse,
} from '@contracts/shared/schemas/recommendation-schema';

export const generateRecommendations = async () => {
  const response = await apiClient.post('/api/recommendations/generate');
  return response.data;
};

export const getMyRecommendations = async (): Promise<{
  success: boolean;
  message: string;
  data: RecommendationOverview;
}> => {
  const response = await apiClient.get('/api/recommendations/me');
  return response.data;
};

/**
 * GET /recommendations/:id/explanation
 *
 * :id = PathwayRecommendation.id  (the recommendation document's _id, NOT the pathway id)
 *
 * First call: generates via LLM (~400 tokens, 700ms–3s with retries).
 * Subsequent calls: zero tokens — served from DB cache.
 * The backend enforces ownership (userId) before returning.
 */
export const getExplanation = async (
  recommendationId: string
): Promise<RecommendationExplanationResponse> => {
  const response = await apiClient.get(
    `/api/recommendations/${recommendationId}/explanation`
  );
  return response.data;
};

export const deleteMyRecommendations = async (): Promise<{
  success: boolean;
  message: string;
  data?: unknown;
}> => {
  const response = await apiClient.delete('/api/recommendations');
  return response.data;
};
