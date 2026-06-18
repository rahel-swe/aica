import { PATHWAY_ASSESSMENT_STEPS } from '@/constants/pathway-assessment-steps-data';
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
    currentIndex,
    form,
    isPathwayAssessmentCreating,
    submitPathwayAssisment,
  } = usePathwayAssessment();

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
