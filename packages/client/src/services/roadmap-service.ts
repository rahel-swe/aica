import apiClient from '@/lib/api-client';
import type {
  RoadmapGenerateRequest,
  RoadmapGenerateResponse,
  RoadmapResponse,
} from '@contracts/shared/types/roadmap-types';

export const getMyRoadmap = async (): Promise<RoadmapResponse> => {
  const response = await apiClient.get('/api/roadmaps/me');
  return response.data;
};

export const generateRoadmap = async (
  payload: RoadmapGenerateRequest
): Promise<RoadmapGenerateResponse> => {
  const response = await apiClient.post('/api/roadmaps/generate', payload);
  return response.data;
};
