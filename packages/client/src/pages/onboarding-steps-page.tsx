import OnboardingFieldPanel from '@/components/onboarding/onboarding-field-panel';
import OnboardingIntroPanel from '@/components/onboarding/onboarding-intro-panel';
import OnboardingStepsNavigations from '@/components/onboarding/onboarding-steps-navigations';
import OnboardingSummaryPanel from '@/components/onboarding/onboarding-summary-panel';
import { ONBOARDING_STEPS } from '@/constants/onboarding-steps';
import type { OnboardingFormValues } from '@contracts/shared/types/onboarding-types';
import { useFormContext, useWatch } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const OnboardingStepsPage = () => {
  const { stepId } = useParams();
  const form = useFormContext<OnboardingFormValues>();
  const watchedValues = useWatch<OnboardingFormValues>({
    control: form.control,
  });

  const step = ONBOARDING_STEPS.find((item) => item.id === stepId);

  if (!step) return null;

  const fieldError = step.fieldName
    ? form.formState.errors[step.fieldName]
    : undefined;

  return (
    <>
      {step.type === 'intro' && <OnboardingIntroPanel step={step} />}
      {step.type === 'cta' && (
        <OnboardingSummaryPanel
          key={step.type}
          step={step}
          values={watchedValues as OnboardingFormValues}
        />
      )}
      {step.type !== 'intro' && step.type !== 'cta' && (
        <OnboardingFieldPanel step={step} />
      )}
      {step.type !== 'intro' && step.type !== 'cta' && fieldError?.message && (
        <p className="text-sm text-destructive">{String(fieldError.message)}</p>
      )}
      <OnboardingStepsNavigations step={step} disableNext={false} />
    </>
  );
};

export default OnboardingStepsPage;
