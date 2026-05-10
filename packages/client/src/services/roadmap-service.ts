import apiClient from '@/lib/api-client';
import type {
  RoadmapGenerateRequest,
  RoadmapGenerateResponse,
  RoadmapResponse,
  RoadmapStepStatus,
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

export type RoadmapServiceStepStutusProps = {
  roadmapId: string;
  stepId: string;
  stepStatus: RoadmapStepStatus;
};

export const changeRoadmapStepStatus = async ({
  roadmapId,
  stepId,
  stepStatus,
}: RoadmapServiceStepStutusProps): Promise<RoadmapGenerateResponse> => {
  const response = await apiClient.put(
    `/api/roadmaps/${roadmapId}/steps/${stepId}`,
    {
      status: stepStatus,
    }
  );
  return response.data;
};
