import RoadmapSetupFieldPanel from '@/components/roadmap/roadmap-setup-field-panel';

import RoadmapSetupAssessmentStepsNavigation from '@/components/roadmap/roadmap-setup-assessment-steps-navigation';

import { ROADMAP_SETUP_STEPS } from '@/constants/roadmap-setup-assessment-data';
import type { RoadmapSetupAssessmentFormValues } from '@contracts/shared/types/roadmap-setup-assessment-types';

import RoadmapSetupIntroPanel from '@/components/roadmap/roadmap-setup-assessment-intro-panel';
import RoadmapStepsPreview from '@/components/roadmap/roadmap-steps-preview';
import { useRoadmapSetupAssessment } from '@/hooks/use-roadmap-setup-assessment';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const RoadmapSetupAssesmentStepsPage = () => {
  const { stepId } = useParams();
  const { currentIndex } = useRoadmapSetupAssessment();
  const form = useFormContext<RoadmapSetupAssessmentFormValues>();

  const step = ROADMAP_SETUP_STEPS.find((item) => item.id === stepId);

  if (!step) return null;

  const fieldError = step.fieldName
    ? form.formState.errors[step.fieldName]
    : undefined;

  return (
    <>
      {step.type === 'intro' && <RoadmapSetupIntroPanel step={step} />}
      {step.type !== 'intro' && step.type !== 'cta' && (
        <RoadmapSetupFieldPanel step={step} currentIndex={currentIndex} />
      )}
      {step.type !== 'intro' && step.type !== 'cta' && fieldError?.message && (
        <p className="text-sm text-destructive">{String(fieldError.message)}</p>
      )}

      {step.id === 'finish' && (
        <div>
          <RoadmapStepsPreview />
        </div>
      )}

      <RoadmapSetupAssessmentStepsNavigation step={step} />
    </>
  );
};

export default RoadmapSetupAssesmentStepsPage;
