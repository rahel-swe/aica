import { ROADMAP_SETUP_STEPS } from '@/constants/roadmap-setup-steps';
import { useUserStatus } from '@/hooks/use-user-status';
import { FormProvider } from 'react-hook-form';
import { Navigate, Outlet } from 'react-router-dom';

import SpinnerBars from '../components/shadcn-space/spinner/spinner-06';

import { useRoadmapSetup } from '@/hooks/use-roadmap-setup-assessment';

export type RoadmapSetupOutletContext = {
  currentIndex: number;
  totalSteps: number;
  isSubmitting: boolean;
  submitRoadmapSetup: () => void;
};

const RoadmapSetupLayout = () => {
  const { isPending, error, userData } = useUserStatus();

  const {
    currentIndex,
    apiIndex,
    form,
    isRoadmapSetupCreating,
    submitRoadmapSetup,
  } = useRoadmapSetup();

  if (isPending) {
    return <SpinnerBars barDivClassName="scale-180" />;
  }

  if (error) {
    return (
      <p className="text-destructive">
        Failed fetching user status {error.message}
      </p>
    );
  }

  if (!userData?.user) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  // use API index OR route index (fallback system like Pathway)
  const activeIndex = apiIndex !== -1 ? apiIndex : currentIndex;

  if (activeIndex === -1) {
    return <Navigate to="/roadmap-setup-assessment/current-stage" replace />;
  }

  return (
    <FormProvider {...form}>
      <div className="relative min-h-screen bg-background items-center justify-center overflow-hidden z-10 mx-auto flex w-full max-w-5xl flex-col gap-6 text-center px-6 py-8">
        <Outlet
          context={{
            currentIndex: activeIndex,
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
