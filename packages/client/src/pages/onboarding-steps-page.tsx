import OnboardingFieldPanel from '@/components/onboarding/onboarding-field-panel';
import OnboardingIntroPanel from '@/components/onboarding/onboarding-intro-panel';
import OnboardingStepsNavigations from '@/components/onboarding/onboarding-steps-navigations';
import OnboardingSummaryPanel from '@/components/onboarding/onboarding-summary-panel';
import { ONBOARDING_STEPS } from '@/constants/onboarding-steps';
import { getStepValueLabel } from '@/lib/get-step-value-label';
import type { OnboardingFormValues } from '@contracts/shared/types/onboarding-types';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const OnboardingStepsPage = () => {
  const { stepId } = useParams();
  const form = useFormContext<OnboardingFormValues>();

  const step = ONBOARDING_STEPS.find((item) => item.id === stepId);

  if (!step) {
    return null;
  }

  const values = form.getValues();
  const selectedLabels = getStepValueLabel(step, values);
  const fieldError = step.fieldName
    ? form.formState.errors[step.fieldName]
    : undefined;

  // const disableNext =
  //   step.type === 'multi-select'
  //     ? selectedLabels.length < (step.minSelect ?? 1)
  //     : step.type === 'single-select'
  //       ? selectedLabels.length === 0
  //       : false;

  return (
    <>
      {step.type === 'intro' && <OnboardingIntroPanel step={step} />}
      {step.type === 'cta' && (
        <OnboardingSummaryPanel step={step} values={values} />
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
