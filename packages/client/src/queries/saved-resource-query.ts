import { useQuery } from '@tanstack/react-query';
import { getSavedResources } from '@/services/saved-resource-service';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getSavedPathways } from '@/services/saved-resource-service';
import type { PathwayListView } from '@contracts/shared/types/pathway-domain-types';

type SavedPathwaysPayload = {
  items: PathwayListView[];
  nextCursor?: string | null;
  hasMore: boolean;
};

type SavedPathwaysResponse = {
  success: boolean;
  data: SavedPathwaysPayload;
  message?: string;
};

export const useSavedResourcesQuery = (userId: string) => {
  return useQuery({
    queryKey: ['saved-resources', userId],
    queryFn: () => getSavedResources(userId),
  });
};

export const useSavedPathwaysQuery = (initialCursor?: string | null) => {
  return useInfiniteQuery({
    queryKey: ['saved-pathways'],
    queryFn: ({ pageParam = initialCursor || null }) =>
      getSavedPathways(pageParam),

    getNextPageParam: (lastPage) => lastPage.data.nextCursor,

    initialPageParam: null as string | null,
  });
};
