import StepLayout from '@/layouts/step-layout';
import type { OnboardingStepProps } from './step-factory';
import { Button } from '../ui/button';

export default function IntroStep({ step, onNext }: OnboardingStepProps) {
  return (
    <StepLayout title={step.title}>
      <p>This will take about 3 minutes.</p>

      <Button className="mx-auto w-60" onClick={onNext}>
        {step.cta || 'Start'}
      </Button>
    </StepLayout>
  );
}
