import { useQuery } from '@tanstack/react-query';

import { getPathwayDetail, getPathways } from '@/services/pathway-service';

export const usePathwaysQuery = () => {
  return useQuery({
    queryKey: ['pathways'],
    queryFn: getPathways,
  });
};

export const usePathwayDetailQuery = (id: string) => {
  return useQuery({
    queryKey: ['pathway', id],
    queryFn: () => getPathwayDetail(id),
    enabled: !!id,
  });
};
