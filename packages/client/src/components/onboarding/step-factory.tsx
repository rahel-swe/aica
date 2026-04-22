import type { OnboardingStep } from '@/constants/onboarding-steps';
import CTAStep from './cta-step';
import IntroStep from './intro-step';
import MultiSelectStep from './multi-select-step';
import SingleSelectStep from './single-step-select';

export type OnboardingStepProps = {
  step: OnboardingStep;
  onNext: () => void;
};

function StepFactory({ step, onNext }: OnboardingStepProps) {
  switch (step.type) {
    case 'multi-select':
      return <MultiSelectStep step={step} onNext={onNext} />;

    case 'single-select':
      return <SingleSelectStep step={step} onNext={onNext} />;

    case 'intro':
      return <IntroStep step={step} onNext={onNext} />;

    case 'cta':
      return <CTAStep step={step} onNext={onNext} />;

    default:
      return <p>Unknown step</p>;
  }
}

export default StepFactory;
