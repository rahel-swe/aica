import {
  createRoadmapSetupAssessment,
  getRoadmapSetupAssessmentStatus,
} from '@/services/roadmap-setup-assessment-service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const roadmapKeys = {
  all: ['roadmap-setup-assessment'],
  status: () => [...roadmapKeys.all, 'status'],
};

export const useRoadmapSetupAssessmentStatusQuery = () => {
  return useQuery({
    queryKey: roadmapKeys.status(),
    queryFn: getRoadmapSetupAssessmentStatus,
  });
};

export const useRoadmapSetupAssessmentSubmitMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRoadmapSetupAssessment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: roadmapKeys.status(),
      });
    },
  });
};
