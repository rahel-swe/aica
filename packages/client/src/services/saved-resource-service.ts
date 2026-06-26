import apiClient from '@/lib/api-client';

export const saveResource = async (data: {
  userId: string;
  resourceType: string;
  resourceId: string;
}) => {
  const res = await apiClient.post('/api/saved-resources', data);
  return res.data;
};

export const getSavedResources = async (userId: string) => {
  const res = await apiClient.get('/api/saved-resources', {
    params: { userId },
  });

  return res.data;
};

export const removeSavedResource = async (data: {
  userId: string;
  resourceId: string;
}) => {
  const { userId, resourceId } = data;

  const res = await apiClient.delete(`/api/saved-resources/${resourceId}`, {
    data: { userId },
  });

  return res.data;
};

export const getSavedPathways = async (cursor?: string | null, limit = 12) => {
  const res = await apiClient.get('/api/saved-resources/pathways', {
    params: { cursor, limit },
  });

  return res.data;
};
