import { useQuery } from '@tanstack/react-query';
import { getSavedResources } from '@/services/saved-resource-service';

export const useSavedResourcesQuery = (userId: string) => {
  return useQuery({
    queryKey: ['saved-resources', userId],
    queryFn: () => getSavedResources(userId),
  });
};
