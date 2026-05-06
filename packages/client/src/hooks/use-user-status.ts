import { authClient } from '@/lib/auth-client';
import { usePathwayAssessmentStatusQuery } from '@/queries/pathway-assessment-query';
import { useRoadmapSetupAssessmentStatusQuery } from '@/queries/roadmap-setup-assessment-queries';

export const useUserStatus = () => {
  const { isPending: isUserDataPending, data: userData } =
    authClient.useSession();

  const {
    data: pathwayAssessmentStatusData,
    isPending: isPathwayAssessmentStatusPending,
    error: pathwayAssessmentStatusError,
  } = usePathwayAssessmentStatusQuery();

  const { data: roadmapSetupStatusData, isPending: isRoadmapStatusPending } =
    useRoadmapSetupAssessmentStatusQuery();

  return {
    isPending:
      isUserDataPending ||
      isPathwayAssessmentStatusPending ||
      isRoadmapStatusPending,
    isPathwayAssessmentCompleted: pathwayAssessmentStatusData,
    isRoadmapSetupCompleted: roadmapSetupStatusData,
    error: pathwayAssessmentStatusError,
    userData,
  };
};
