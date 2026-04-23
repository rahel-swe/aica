import type { OnboardingStep } from '@/constants/onboarding-steps';

type OnboardingStepSummaryCardProps = {
  step: OnboardingStep;
  labels: string[];
};

const OnboardingStepSummaryCard = ({
  step,
  labels,
}: OnboardingStepSummaryCardProps) => {
  return (
    <div className="rounded-2xl border bg-card px-4 py-3">
      <p className="text-sm font-medium">{step.title}</p>
      <p className="mt-2 text-sm text-muted-foreground">
        {labels.length > 0 ? labels.join(', ') : 'Not answered yet'}
      </p>
    </div>
  );
};

export default OnboardingStepSummaryCard;
