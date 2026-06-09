import {
  createRoadmapSetupAssessment,
  getRoadmapSetupAssessmentStatus,
} from '@/services/roadmap-setup-assessment-service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { profileKeys } from './profile-query';
import { deleteRoadmapSetupAssessment } from '../services/roadmap-setup-assessment-service';

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

      queryClient.invalidateQueries({
        queryKey: profileKeys.me(),
      });
    },
  });
};

export const useRoadmapSetupAssessmentDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRoadmapSetupAssessment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: roadmapKeys.status(),
      });

      queryClient.invalidateQueries({
        queryKey: profileKeys.me(),
      });
    },
  });
};
