import type { OnboardingStep } from '@/constants/onboarding-steps';

type OnboardingIntroPanelProps = {
  step: OnboardingStep;
};

const OnboardingIntroPanel = ({ step }: OnboardingIntroPanelProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-6">
      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight">
        {step.title}
      </h1>
      <p className="max-w-2xl text-sm leading-6">{step.description}</p>
      {step.helperText && <p className="text-sm">{step.helperText}</p>}
    </div>
  );
};

export default OnboardingIntroPanel;
