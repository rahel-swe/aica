import apiClient from '@/lib/api-client';
import type {
  PathwayAssessmentFormValues,
  PathwayAssessmentStatusResponse,
  PathwayAssessmentSubmitResponse,
} from '@contracts/shared/types/pathway-assessment-types';

export const createPathwayAssessmentProfile = async (
  payload: PathwayAssessmentFormValues
): Promise<PathwayAssessmentSubmitResponse> => {
  const response = await apiClient.post(
    `/api/pathway-assessment/submit`,
    payload
  );
  const data = await response.data;

  return data;
};

export const getPathwayAssessmentStatus =
  async (): Promise<PathwayAssessmentStatusResponse> => {
    const response = await apiClient.get(`/api/pathway-assessment/status`);
    const data = await response.data;
    return data;
  };
