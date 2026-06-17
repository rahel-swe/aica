import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  generateRecommendations,
  getExplanation,
  getMyRecommendations,
} from '@/services/recommendations-service';

// ── Query key factory

export const recommendationsKeys = {
  all: ['recommendations'] as const,
  my: () => [...recommendationsKeys.all, 'my'] as const,
  explanation: (id: string) =>
    [...recommendationsKeys.all, 'explanation', id] as const,
} as const;

// ── Queries

export const useRecommendationQuery = () =>
  useQuery({
    queryKey: recommendationsKeys.my(),
    queryFn: getMyRecommendations,
  });

export const useExplanationQuery = (
  recommendationId: string,
  enabled: boolean
) =>
  useQuery({
    queryKey: recommendationsKeys.explanation(recommendationId),
    queryFn: () => getExplanation(recommendationId),
    enabled: enabled && !!recommendationId,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 30,
  });

// ── Mutations ────────

export const useGenerateRecommendationsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: generateRecommendations,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recommendationsKeys.my() });
    },
  });
};
