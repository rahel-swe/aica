import RoadmapSetupFieldPanel from '@/components/roadmap/roadmap-setup-field-panel';

import RoadmapSetupStepsNavigation from '@/components/roadmap/roadmap-setup-steps-navigation';

import { ROADMAP_SETUP_STEPS } from '@/constants/roadmap-setup-steps';

import type { RoadmapFormValues } from '@/constants/roadmap-setup-steps';

import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const RoadmapSetupAssesmentStepsPage = () => {
  const { stepId } = useParams();

  const form = useFormContext<RoadmapFormValues>();

  const step = ROADMAP_SETUP_STEPS.find((item) => item.id === stepId);

  if (!step) return null;

  const fieldError = step.fieldName
    ? form.formState.errors[step.fieldName]
    : undefined;

  return (
    <div className="w-full">
      <RoadmapSetupFieldPanel
        step={step}
        currentIndex={0}
        direction="forward"
      />

      {fieldError?.message && (
        <p className="text-sm text-destructive text-center mt-4">
          {String(fieldError.message)}
        </p>
      )}

      <RoadmapSetupStepsNavigation step={step} />
    </div>
  );
};

export default RoadmapSetupAssesmentStepsPage;
