import type { OnboardingStep } from '@/constants/onboarding-steps';

type OnboardingIntroPanelProps = {
  step: OnboardingStep;
};

const OnboardingIntroPanel = ({ step }: OnboardingIntroPanelProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <img
        src="/onboarding-steps-bg.png"
        alt="Onboarding hero background"
        className="fixed max-w-screen inset-0 scale-140 w-full h-full object-contain opacity-80 pointer-events-none select-none z-0 hidden md:block"
      />

      <img
        src="/onboarding-welcome-top.png"
        alt="Onboarding hero background"
        className="pointer-events-none w-80 select-none z-0 md:hidden"
      />

      {/* <img
        src="/onboard-welcome.png"
        alt="welcome image"
        className="pointer-events-none w-100 select-none z-0 md:hidden"
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
