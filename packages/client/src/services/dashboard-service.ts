import apiClient from '@/lib/api-client';
import type { DashboardApiResponse } from '@contracts/shared/types/dashboard-types';

export const getDashboard = async (): Promise<DashboardApiResponse> => {
  const response = await apiClient.get('/api/dashboard');
  return response.data;
};
