import { ONBOARDING_STEPS } from '@/constants/onboarding-steps';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../ui/button';

const StepNavigation = ({
  disableNextButton,
}: {
  disableNextButton?: boolean;
}) => {
  const navigate = useNavigate();
  const { stepId } = useParams();

  const currentIndex = ONBOARDING_STEPS.findIndex((s) => s.id === stepId);

  const nextStep = () => {
    const next = ONBOARDING_STEPS[currentIndex + 1];
    if (next) navigate(`/onboarding/${next.id}`);
  };

  const prevStep = () => {
    const prev = ONBOARDING_STEPS[currentIndex - 1];
    if (prev) navigate(`/onboarding/${prev.id}`);
  };

  const shouldRenderNavigation = currentIndex !== 0 && currentIndex !== 9;

  return shouldRenderNavigation ? (
    <div className="flex items-center justify-between w-full px-4">
      <Button variant={'outline'} onClick={prevStep}>
        <ChevronLeft />
        Back
      </Button>

      <Button onClick={nextStep} disabled={disableNextButton}>
        Next <ChevronRight />
      </Button>
    </div>
  ) : null;
};

export default StepNavigation;
