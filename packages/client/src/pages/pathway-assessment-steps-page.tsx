import PathwayAssessmentFieldPanel from '@/components/onboarding/pathway-assessment-field-panel';
import PathwayAssessmentIntroPanel from '@/components/onboarding/pathway-assessment-intro-panel';
import PathwayAssessmentStepsNavigations from '@/components/onboarding/pathway-assessment-steps-navigations';
import PathwayAssessmentSummaryPanel from '@/components/onboarding/pathway-assessment-summary-panel';
import { PATHWAY_ASSESSMENT_STEPS } from '@/constants/pathway-assessment-steps-data';
import { usePathwayAssessment } from '@/hooks/use-pathway-assessment';
import type { PathwayAssessmentFormValues } from '@contracts/shared/types/pathway-assessment-types';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const PathwayAssessmentStepsPage = () => {
  const { stepId } = useParams();
  const { currentIndex } = usePathwayAssessment();
  const form = useFormContext<PathwayAssessmentFormValues>();

  const step = PATHWAY_ASSESSMENT_STEPS.find((item) => item.id === stepId);

  if (!step) return null;

  const fieldError = step.fieldName
    ? form.formState.errors[step.fieldName]
    : undefined;

  return (
    <>
      {step.type === 'intro' && <PathwayAssessmentIntroPanel step={step} />}
      {step.type !== 'intro' && step.type !== 'cta' && (
        <PathwayAssessmentFieldPanel step={step} currentIndex={currentIndex} />
      )}
      {step.type !== 'intro' && step.type !== 'cta' && fieldError?.message && (
        <p className="text-sm text-destructive">{String(fieldError.message)}</p>
      )}
      {step.type === 'cta' && (
        <PathwayAssessmentSummaryPanel key={step.type} step={step} />
      )}
      <PathwayAssessmentStepsNavigations step={step} disableNext={false} />
    </>
  );
};

export default PathwayAssessmentStepsPage;
