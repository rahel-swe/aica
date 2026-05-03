import { PATHWAY_ASSESSMENT_STEPS } from '@/constants/pathway-assessment-steps';
import { usePathwayAssessment } from '@/hooks/use-pathway-assessment';
import { FormProvider } from 'react-hook-form';
import { Navigate, Outlet } from 'react-router-dom';

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
    isPathwayAssessmentCompleted,
    currentIndex,
    form,
    isPathwayAssessmentCreating,
    submitPathwayAssisment,
    userData,
  } = usePathwayAssessment();

  if (isPending) return <p>Pathway Assessment loading...</p>;

  if (error)
    return (
      <p className="text-destructive">
        Failed fetching onboarding status {error.message}
      </p>
    );

  if (!userData?.user) return <Navigate to="/auth" replace />;

  if (isPathwayAssessmentCompleted)
    return <Navigate to="/app/dashboard" replace />;

  if (currentIndex === -1)
    return <Navigate to="/pathway-assessment/welcome" replace />;

  return (
    <FormProvider {...form}>
      <div className="relative min-h-screen bg-background flex flex-col items-center justify-center overflow-hidden">
        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-6 text-center px-6 py-8">
          <Outlet
            context={{
              currentIndex,
              totalSteps: PATHWAY_ASSESSMENT_STEPS.length,
              isSubmitting: isPathwayAssessmentCreating,
              submitPathwayAssisment,
            }}
          />
        </div>
      </div>
    </FormProvider>
  );
};

export default PathwayAssessmentLayout;
