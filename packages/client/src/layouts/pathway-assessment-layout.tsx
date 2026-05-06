import { PATHWAY_ASSESSMENT_STEPS } from '@/constants/pathway-assessment-steps';
import { useUserStatus } from '@/hooks/use-user-status';
import { FormProvider } from 'react-hook-form';
import { Navigate, Outlet } from 'react-router-dom';
import SpinnerBars from '../components/shadcn-space/spinner/spinner-06';
import { usePathwayAssessment } from '@/hooks/use-pathway-assessment';

export type PathwayAssessmentOutletContext = {
  currentIndex: number;
  totalSteps: number;
  isSubmitting: boolean;
  submitPathwayAssisment: () => void;
};

const PathwayAssessmentLayout = () => {
  const { isPending, error, isPathwayAssessmentCompleted, userData } =
    useUserStatus();

  const {
    currentIndex,
    form,
    isPathwayAssessmentCreating,
    submitPathwayAssisment,
  } = usePathwayAssessment();

  if (isPending) return <SpinnerBars barDivClassName="scale-180" />;

  if (error)
    return (
      <p className="text-destructive">
        Failed fetching onboarding status {error.message}
      </p>
    );

  if (!userData?.user) return <Navigate to="/auth/sign-in" replace />;

  if (isPathwayAssessmentCompleted?.data.completed)
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
