import apiClient from '@/lib/api-client';

import type {
  PathwaysListResponse,
  PathwayDetailResponse,
} from '@contracts/shared/types/pathway-domain-types';

export const getPathways = async (
  search?: string,
  type?: string,
  cursor?: string | null
): Promise<PathwaysListResponse> => {
  const response = await apiClient.get('/api/pathways', {
    params: {
      search,
      type,
      cursor,
      limit: 12,
    },
  });

  return response.data;
};

export const getPathwayDetail = async (
  id: string
): Promise<PathwayDetailResponse> => {
  const response = await apiClient.get(`/api/pathways/${id}`);

  return response.data;
};
