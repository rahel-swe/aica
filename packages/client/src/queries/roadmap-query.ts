import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { generateRoadmap, getMyRoadmap } from '@/services/roadmap-service';
import type { RoadmapGenerateRequest } from '@contracts/shared/types/roadmap-types';

export const roadmapQueryKey = ['roadmap', 'me'] as const;

export const useRoadmapQuery = () => {
  return useQuery({
    queryKey: roadmapQueryKey,
    queryFn: getMyRoadmap,
  });
};

export const useGenerateRoadmapMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RoadmapGenerateRequest) => generateRoadmap(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roadmapQueryKey });
    },
  });
};
