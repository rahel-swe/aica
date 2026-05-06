import { ROADMAP_SETUP_STEPS } from '@/constants/roadmap-setup-steps';
import { useUserStatus } from '@/hooks/use-user-status';
import { FormProvider } from 'react-hook-form';
import { Navigate, Outlet } from 'react-router-dom';

import SpinnerBars from '../components/shadcn-space/spinner/spinner-06';

import { useRoadmapSetupAssessment } from '@/hooks/use-roadmap-setup-assessment';

export type RoadmapSetupOutletContext = {
  currentIndex: number;
  totalSteps: number;
  isSubmitting: boolean;
  submitRoadmapSetup: () => void;
};

const RoadmapSetupLayout = () => {
  const { isPending, error, userData, isRoadmapSetupCompleted } =
    useUserStatus();

  const { currentIndex, form, isRoadmapSetupCreating, submitRoadmapSetup } =
    useRoadmapSetupAssessment();

  if (isPending) return <SpinnerBars />;

  if (!isRoadmapSetupCompleted?.data.completed)
    return <Navigate to={'/pathway-recommendations'} />;

  if (error)
    return (
      <p className="text-destructive">
        Failed fetching user status {error.message}
      </p>
    );

  if (!userData?.user) return <Navigate to="/auth/sign-in" replace />;

  if (currentIndex === -1) {
    return <Navigate to="/roadmap-setup-assessment/welcome" replace />;
  }

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
