import { ONBOARDING_STEPS } from '@/constants/onboarding-steps';

const OnboardingProgress = ({ currentIndex }: { currentIndex: number }) => {
  const progressValue =
    currentIndex >= 0
      ? ((currentIndex + 1) / ONBOARDING_STEPS.length) * 100
      : 0;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>AICA onboarding</span>
        <span>
          Step {Math.max(currentIndex + 1, 1)} of {ONBOARDING_STEPS.length}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-300"
          style={{ width: `${progressValue}%` }}
        />
      </div>
    </div>
  );
};

export default OnboardingProgress;
