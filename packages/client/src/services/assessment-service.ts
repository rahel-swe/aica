import apiClient from '@/lib/api-client';
import type {
  OnboardingFormValues,
  OnboardingStatusResponse,
  OnboardingSubmitResponse,
} from '@contracts/shared/types/onboarding-types';

export const createOnboardingProfile = async (
  payload: OnboardingFormValues
): Promise<OnboardingSubmitResponse> => {
  const response = await apiClient.post(`/api/assessment/submit`, payload);
  const data = await response.data;

  return data;
};

export const getOnboardingStatus =
  async (): Promise<OnboardingStatusResponse> => {
    const response = await apiClient.get(`/api/assessment/status`);
    const data = await response.data;
    return data;
  };
