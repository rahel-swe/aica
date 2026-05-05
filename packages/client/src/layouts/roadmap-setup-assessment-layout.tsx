import { ROADMAP_SETUP_STEPS } from '@/constants/roadmap-setup-steps';
import { useUserStatus } from '@/hooks/use-user-status';
// import { useRoadmapSetup } from '@/hooks/use-roadmap-setup';
import { FormProvider, useForm } from 'react-hook-form';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import SpinnerBars from '../components/shadcn-space/spinner/spinner-06';
import { useMemo } from 'react';

export type RoadmapSetupOutletContext = {
  currentIndex: number;
  totalSteps: number;
  isSubmitting: boolean;
  submitRoadmapSetup: () => void;
};

const RoadmapSetupLayout = () => {
  const { isPending, error, userData } = useUserStatus();
  const { stepId } = useParams();

  const form = useForm();

  //   const {
  //     currentIndex,
  //     form,
  //     isRoadmapSetupCreating,
  //     submitRoadmapSetup,
  //     isRoadmapSetupCompleted,
  //   } = useRoadmapSetup();

  const currentIndex = useMemo(
    () => ROADMAP_SETUP_STEPS.findIndex((step) => step.id === stepId),
    [stepId]
  );

  if (isPending) return <SpinnerBars barDivClassName="scale-180" />;

  if (error)
    return (
      <p className="text-destructive">
        Failed fetching roadmap setup status {error.message}
      </p>
    );

  if (!userData?.user) return <Navigate to="/auth/sign-in" replace />;

  //   if (isRoadmapSetupCompleted) return <Navigate to="/app/dashboard" replace />;

  if (currentIndex === -1)
    return <Navigate to="/roadmap-setup-assessment/current-stage" replace />;

  return (
    <FormProvider {...form}>
      <div className="relative min-h-screen bg-background items-center justify-center overflow-hidden z-10 mx-auto flex w-full max-w-5xl flex-col gap-6 text-center px-6 py-8">
        <Outlet
        //   context={{
        //     currentIndex,
        //     totalSteps: ROADMAP_SETUP_STEPS.length,
        //     isSubmitting: isRoadmapSetupCreating,
        //     submitRoadmapSetup,
        //   }}
        />
      </div>
    </FormProvider>
  );
};

export default RoadmapSetupLayout;
