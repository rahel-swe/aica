import { useQuery } from '@tanstack/react-query';
import { getMyRecommendations } from '@/services/recommendations-service';

export const useRecommendationQuery = () => {
  return useQuery({
    queryKey: ['recommendations'],
    queryFn: () => getMyRecommendations(),
  });
};
