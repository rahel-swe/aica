import type { PathwayAssessmentFormValues } from '@contracts/shared/types/pathway-assessment-types';
import type { PathwayAssessmentStep } from '@/constants/pathway-assessment-steps-data';

export const getStepValueLabel = (
  step: PathwayAssessmentStep,
  values: PathwayAssessmentFormValues
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
