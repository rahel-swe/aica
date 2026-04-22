import StepFactory from '@/components/onboarding/step-factory';
import { ONBOARDING_STEPS } from '@/constants/onboarding-steps';
import { useParams, useNavigate } from 'react-router-dom';

function OnboardingStepRenderer() {
  const { stepId } = useParams();
  const navigate = useNavigate();

  const currentIndex = ONBOARDING_STEPS.findIndex((s) => s.id === stepId);

  const step = ONBOARDING_STEPS[currentIndex];

  if (!step) {
    navigate('/onboarding/welcome');
    return null;
  }

  const handleNext = () => {
    const next = ONBOARDING_STEPS[currentIndex + 1];
    if (next) {
      navigate(`/onboarding/${next.id}`);
    }
  };

  return <StepFactory step={step} onNext={handleNext} />;
}

export default OnboardingStepRenderer;
