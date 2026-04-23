import {
  ONBOARDING_STEPS,
  type OnboardingStep,
} from '@/constants/onboarding-steps';
import { getStepValueLabel } from '@/lib/get-step-value-label';
import type { OnboardingFormValues } from '@contracts/shared/types/onboarding-types';
import OnboardingStepSummaryCard from './onboarding-step-summary-card';

type OnboardingSummaryPanelProps = {
  step: OnboardingStep;
  values: OnboardingFormValues;
};

const OnboardingSummaryPanel = ({
  step,
  values,
}: OnboardingSummaryPanelProps) => {
  return (
    <div className="space-y-5">
      <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
        {step.description}
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        {ONBOARDING_STEPS.filter((item) => item.fieldName).map((item) => (
          <OnboardingStepSummaryCard
            key={item.id}
            step={item}
            labels={getStepValueLabel(step, values)}
          />
        ))}
      </div>
      {step.helperText ? (
        <p className="text-sm text-muted-foreground">{step.helperText}</p>
      ) : null}
    </div>
  );
};

export default OnboardingSummaryPanel;
