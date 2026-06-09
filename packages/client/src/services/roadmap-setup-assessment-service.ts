import apiClient from '@/lib/api-client';
import type {
  RoadmapSetupAssessmentFormValues,
  RoadmapSetupAssessmentStatusResponse,
  RoadmapSetupAssessmentSubmitResponse,
} from '@contracts/shared/types/roadmap-setup-assessment-types';

export const createRoadmapSetupAssessment = async (
  payload: RoadmapSetupAssessmentFormValues
): Promise<RoadmapSetupAssessmentSubmitResponse> => {
  const response = await apiClient.post(
    `/api/roadmap-setup-assessment/submit`,
    payload
  );
  const data = await response.data;

  return data;
};

export const getRoadmapSetupAssessmentStatus =
  async (): Promise<RoadmapSetupAssessmentStatusResponse> => {
    const response = await apiClient.get(
      `/api/roadmap-setup-assessment/status`
    );
    const data = await response.data;
    return data;
  };

export const deleteRoadmapSetupAssessment = async (
  id: string
): Promise<RoadmapSetupAssessmentStatusResponse> => {
  const response = await apiClient.delete(
    `/api/roadmap-setup-assessment/${id}`
  );
  const data = await response.data;

  return data;
};
