import {
  ONBOARDING_STEPS,
  type OnboardingStep,
} from '@/constants/onboarding-steps';
import type { OnboardingOutletContext } from '@/layouts/onboarding-layout';
import { toKebab } from '@/lib/to-kebab';
import { cn } from '@/lib/utils';
import { onboardingFormSchema } from '@contracts/shared/schemas/onboarding-schema';
import { type OnboardingFormValues } from '@contracts/shared/types/onboarding-types';
import { ChevronLeft, ChevronRight, Pencil, Send } from 'lucide-react';
import { useFormContext, useWatch } from 'react-hook-form';
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
  const watchedValues = useWatch<OnboardingFormValues>();
  const { currentIndex, isSubmitting, submitAssisment } =
    useOutletContext<OnboardingOutletContext>();

  const goBack = () => {
    const prev = ONBOARDING_STEPS[currentIndex - 1];
    if (prev) navigate(`/onboarding/${prev.id}`);
  };

  const goNext = async () => {
    if (step.type !== 'intro' && step.fieldName) {
      const isValid = await form.trigger(step.fieldName);
      if (!isValid) return;
    }

    const result = onboardingFormSchema.safeParse(watchedValues);

    if (!result.success) {
      const firstErrorPath = result.error.issues[0].path[0] as string;

      navigate(`/onboarding/${toKebab(firstErrorPath)}`);
      return;
    }

    if (step.type === 'cta') {
      await submitAssisment();
      return;
    }

    const next = ONBOARDING_STEPS[currentIndex + 1];
    if (next) navigate(`/onboarding/${next.id}`);
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
          {step.type !== 'cta' ? <ChevronLeft /> : <Pencil />}
          {step.type === 'cta' ? 'Edit' : 'Back'}
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
          : step.type === 'cta'
            ? 'Submit'
            : 'Continue'}
        {step.type === 'cta' ? <Send /> : <ChevronRight />}
      </Button>
    </div>
  );
};

export default OnboardingStepsNavigations;
