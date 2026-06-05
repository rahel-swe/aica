import { useQuery } from '@tanstack/react-query';
import { getMyRecommendations } from '@/services/recommendations-service';

export const recommendationsKeys = {
  all: ['recommendations'],
  my: () => [...recommendationsKeys.all, 'my'],
};

export const useRecommendationQuery = () => {
  return useQuery({
    queryKey: [recommendationsKeys.my()],
    queryFn: () => getMyRecommendations(),
  });
};
