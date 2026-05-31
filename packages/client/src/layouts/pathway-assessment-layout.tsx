import { PATHWAY_ASSESSMENT_STEPS } from '@/constants/pathway-assessment-steps';
import { usePathwayAssessment } from '@/hooks/use-pathway-assessment';
import { useProfileStatusQuery } from '@/queries/profile-query';
import { FormProvider } from 'react-hook-form';
import { Navigate, Outlet } from 'react-router-dom';
import SpinnerBars from '../components/shadcn-space/spinner/spinner-06';

export type PathwayAssessmentOutletContext = {
  currentIndex: number;
  totalSteps: number;
  isSubmitting: boolean;
  submitPathwayAssisment: () => void;
};

const PathwayAssessmentLayout = () => {
  const {
    isPending,
    error,
    data: userProfileStatusResponse,
  } = useProfileStatusQuery();

  const {
    currentIndex,
    form,
    isPathwayAssessmentCreating,
    submitPathwayAssisment,
  } = usePathwayAssessment();

  if (isPending)
    return (
      <div className="grid place-items-center min-h-dvh">
        <SpinnerBars />
      </div>
    );

  if (error)
    return (
      <p className="text-destructive">
        Failed fetching onboarding status {error.message}
      </p>
    );

  const { assessments, user } = userProfileStatusResponse.data;

  if (!user) return <Navigate to="/auth/sign-in" replace />;

  if (assessments.pathwayCompleted)
    return <Navigate to="/app/dashboard" replace />;

  if (currentIndex === -1)
    return <Navigate to="/pathway-assessment/welcome" replace />;

  return (
    <FormProvider {...form}>
      <div className="relative min-h-screen bg-background items-center justify-center overflow-hidden z-10 mx-auto flex w-full max-w-5xl flex-col gap-6 text-center px-6 py-8">
        <Outlet
          context={{
            currentIndex,
            totalSteps: PATHWAY_ASSESSMENT_STEPS.length,
            isSubmitting: isPathwayAssessmentCreating,
            submitPathwayAssisment,
          }}
        />
      </div>
    </FormProvider>
  );
};

export default PathwayAssessmentLayout;
