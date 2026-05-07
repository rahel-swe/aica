import apiClient from '@/lib/api-client';

import type {
  PathwaysListResponse,
  PathwayDetailResponse,
} from '@contracts/shared/types/pathway-domain-types';

export const getPathways = async (): Promise<PathwaysListResponse> => {
  const response = await apiClient.get('/api/pathways');

  const data = await response.data;

  return data;
};

export const getPathwayDetail = async (
  id: string
): Promise<PathwayDetailResponse> => {
  const response = await apiClient.get(`/api/pathways/${id}`);

  const data = await response.data;

  return data;
};
