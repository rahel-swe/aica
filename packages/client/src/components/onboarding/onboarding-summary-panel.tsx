import { type OnboardingStep } from '@/constants/onboarding-steps';

type OnboardingSummaryPanelProps = {
  step: OnboardingStep;
};

const OnboardingSummaryPanel = ({ step }: OnboardingSummaryPanelProps) => {
  return (
    <div className="mx-auto">
      <img
        src="/onboard-welcome.png"
        alt="welcome image"
        className="pointer-events-none max-w-110 mx-auto select-none z-0"
      />
      <div className="space-y-3">
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight">
          {step.title}
        </h1>
        <p className="max-w-2xl text-sm leading-6">{step.description}</p>

        {step.helperText ? <p className="text-sm">{step.helperText}</p> : null}
      </div>
    </div>
  );
};

export default OnboardingSummaryPanel;
