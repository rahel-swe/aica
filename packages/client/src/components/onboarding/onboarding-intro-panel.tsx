import type { OnboardingStep } from '@/constants/onboarding-steps';

type OnboardingIntroPanelProps = {
  step: OnboardingStep;
};

const OnboardingIntroPanel = ({ step }: OnboardingIntroPanelProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      {/* <img
        src="/onboard-welcome.png"
        alt="welcome image"
        className="max-w-md md:max-w-xl"
      /> */}
      <div className="flex flex-col gap-4">
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight">
          {step.title}
        </h1>
        <p className="max-w-2xl text-sm leading-6">{step.description}</p>
        {/* {step.helperText && <p className="text-sm">{step.helperText}</p>} */}
      </div>
    </div>
  );
};

export default OnboardingIntroPanel;
