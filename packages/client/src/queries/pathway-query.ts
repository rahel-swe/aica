import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { getPathways, getPathwayDetail } from '@/services/pathway-service';
import { usePathwaysStore } from '@/stores/pathways-store';

export const usePathwaysQuery = () => {
  const search = usePathwaysStore((state) => state.search);
  const type = usePathwaysStore((state) => state.type);

  return useInfiniteQuery({
    queryKey: ['pathways', search, type],

    queryFn: ({ pageParam }) =>
      getPathways(search, type, pageParam as string | null),

    initialPageParam: null as string | null,

    getNextPageParam: (lastPage) => {
      return lastPage.data.nextCursor ?? undefined;
    },
  });
};

export const usePathwayDetailQuery = (slug?: string) => {
  return useQuery({
    queryKey: ['pathway', slug],
    queryFn: () => getPathwayDetail(slug),
    enabled: !!slug,
    retry: 1,
  });
};
