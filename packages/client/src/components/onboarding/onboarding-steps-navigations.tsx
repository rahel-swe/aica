import {
  ONBOARDING_STEPS,
  type OnboardingStep,
} from '@/constants/onboarding-steps';
import type { OnboardingOutletContext } from '@/layouts/onboarding-layout';
import { cn } from '@/lib/utils';
import { type OnboardingFormValues } from '@contracts/shared/types/onboarding-types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Button } from '../ui/button';

const OnboardingStepsNavigations = ({
  step,
  disableNext,
}: {
  step: OnboardingStep;
  disableNext: boolean;
}) => {
  const form = useFormContext<OnboardingFormValues>();
  const navigate = useNavigate();
  const { currentIndex, isSubmitting, submitProfile } =
    useOutletContext<OnboardingOutletContext>();

  const goBack = () => {
    const prev = ONBOARDING_STEPS[currentIndex - 1];
    if (prev) navigate(`/onboarding/${prev.id}`);
  };

  const goNext = async () => {
    if (step.type === 'cta') {
      await submitProfile();
      return;
    }

    if (step.type !== 'intro' && step.fieldName) {
      const valid = await form.trigger(step.fieldName);
      if (!valid) {
        return;
      }
    }

    const next = ONBOARDING_STEPS[currentIndex + 1];
    if (next) {
      navigate(`/onboarding/${next.id}`);
    }
  };
  return (
    <div
      className={cn(
        'flex flex-col-reverse sm:items-center justify-center sm:flex-row max-w-xs  mx-auto w-full',
        !(currentIndex === 0) && 'gap-3 sm:gap-8 sm:justify-between'
      )}
    >
      {!(currentIndex === 0) && (
        <Button
          variant="outline"
          onClick={goBack}
          className="py-6 sm:px-12"
          disabled={isSubmitting}
        >
          <ChevronLeft />
          Back
        </Button>
      )}

      <Button
        type="button"
        onClick={goNext}
        className="py-6 sm:px-12"
        disabled={disableNext || isSubmitting}
      >
        {isSubmitting
          ? 'Saving...'
          : step.cta || (step.type === 'cta' ? 'Submit' : 'Continue')}
        <ChevronRight />
      </Button>
    </div>
  );
};

export default OnboardingStepsNavigations;
