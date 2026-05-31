import apiClient from '@/lib/api-client';
import type { ProfileStatusResponse } from '@contracts/shared/types/profile-types';

export const getProfileStatus = async (): Promise<ProfileStatusResponse> => {
  const response = await apiClient.get('/api/users/me');
  return response.data;
};
