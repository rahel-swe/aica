import { ROADMAP_SETUP_STEPS } from '@/constants/roadmap-setup-assessment-data';
import { FormProvider } from 'react-hook-form';
import { Navigate, Outlet } from 'react-router-dom';

import SpinnerBars from '../components/shadcn-space/spinner/spinner-06';

import { useRoadmapSetupAssessment } from '@/hooks/use-roadmap-setup-assessment';
import { useProfileStatusQuery } from '@/queries/profile-query';
import ErrorState from '@/components/error-state';

export type RoadmapSetupOutletContext = {
  currentIndex: number;
  totalSteps: number;
  isSubmitting: boolean;
  submitRoadmapSetup: () => void;
};

const RoadmapSetupLayout = () => {
  const {
    isPending,
    error,
    data: userProfileStatusResponse,
    refetch,
  } = useProfileStatusQuery();

  const { currentIndex, form, isRoadmapSetupCreating, submitRoadmapSetup } =
    useRoadmapSetupAssessment();

  if (isPending)
    return (
      <div className="grid place-items-center min-h-dvh">
        <SpinnerBars />
      </div>
    );

  if (error)
    return (
      <ErrorState
        title="Failed fetching profile status"
        message={error.message}
        onRetry={refetch}
      />
    );

  const { assessments } = userProfileStatusResponse.data;

  if (!assessments.roadmapSetupCompleted)
    return <Navigate to={'/pathway-recommendations'} />;

  if (currentIndex === -1)
    return <Navigate to="/roadmap-setup-assessment/welcome" replace />;

  return (
    <FormProvider {...form}>
      <div className="relative min-h-screen bg-background items-center justify-center overflow-hidden z-10 mx-auto flex w-full max-w-5xl flex-col gap-6 text-center px-6 py-8">
        <Outlet
          context={{
            currentIndex,
            totalSteps: ROADMAP_SETUP_STEPS.length,
            isSubmitting: isRoadmapSetupCreating,
            submitRoadmapSetup,
          }}
        />
      </div>
    </FormProvider>
  );
};

export default RoadmapSetupLayout;
