import { ONBOARDING_STEPS } from '@/constants/onboarding-steps';
import { Outlet, useParams } from 'react-router-dom';

function OnboardingLayout() {
  const { stepId } = useParams();

  const currentIndex = ONBOARDING_STEPS.findIndex((s) => s.id === stepId);

  return (
    <div className="min-h-screen h-full flex flex-col items-center justify-center gap-4">
      {/* Progress */}
      <p className="">
        Step {currentIndex + 1} / {ONBOARDING_STEPS.length}
      </p>

      {/* Step Content */}
      <Outlet />
    </div>
  );
}
export default OnboardingLayout;
