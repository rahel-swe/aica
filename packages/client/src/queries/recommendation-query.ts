import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteMyRecommendations,
  getMyRecommendations,
} from '@/services/recommendations-service';

export const recommendationsKeys = {
  all: ['recommendations'],
  my: () => [...recommendationsKeys.all, 'my'],
};

export const useRecommendationQuery = () => {
  return useQuery({
    queryKey: recommendationsKeys.my(),
    queryFn: () => getMyRecommendations(),
  });
};

export const useRecommendationDeleteMutationQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMyRecommendations,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: recommendationsKeys.my(),
      });
    },
  });
};
