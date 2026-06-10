import { useInfiniteQuery } from '@tanstack/react-query';
import { getPathways } from '@/services/pathway-service';

export const usePathwaySidebarQuery = (search: string, type: string) => {
  return useInfiniteQuery({
    queryKey: ['pathway-sidebar', search, type],

    queryFn: ({ pageParam }: { pageParam: string | null }) =>
      getPathways(search, type, pageParam as string | null),

    initialPageParam: null,

    getNextPageParam: (lastPage) => lastPage.data.nextCursor ?? undefined,
  });
};
