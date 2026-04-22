import StepLayout from '@/layouts/step-layout';
import type { OnboardingStepProps } from './step-factory';

const CTAStep = ({ step, onNext }: OnboardingStepProps) => {
  return (
    <StepLayout title={step.title}>
      <p>We’re preparing your results...</p>
    </StepLayout>
  );
};
export default CTAStep;
