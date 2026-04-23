import type { OnboardingFormValues } from '@contracts/shared/types/onboarding-types';
import type { OnboardingStep } from '@/constants/onboarding-steps';

export const getStepValueLabel = (
  step: OnboardingStep,
  values: OnboardingFormValues
): string[] => {
  if (!step.fieldName || !step.options) {
    return [];
  }

  const currentValue = values[step.fieldName];

  if (Array.isArray(currentValue)) {
    return step.options
      .filter((option) => currentValue.includes(option.value as never))
      .map((option) => option.label);
  }

  return step.options
    .filter((option) => option.value === currentValue)
    .map((option) => option.label);
};
