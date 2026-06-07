/* eslint-disable react-hooks/refs */
import type { PathwayAssessmentStep } from '@/constants/pathway-assessment-steps-data';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';
import MultiSelectField from '../form/multi-select-field';
import SingleSelectField from '../form/single-select-field';

type OnboardingFieldPanelProps = {
  step: PathwayAssessmentStep;
  currentIndex: number;
};

const PathwayAssessmentFieldPanel = ({
  step,
  currentIndex,
}: OnboardingFieldPanelProps) => {
  const previouseIndex = useRef(0);

  useEffect(() => {
    previouseIndex.current = currentIndex;
  }, [currentIndex]);

  if (!step.fieldName || !step.options) return null;

  return (
    <div
      key={step.id}
      className={cn(
        'space-y-4 transition-all duration-500',
        'animate-in fade-in',
        currentIndex > previouseIndex.current
          ? 'slide-in-from-right-6'
          : 'slide-in-from-left-6'
      )}
    >
      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight mb-10 mx-auto font-heading md:text-5xl">
        {step.title}
      </h1>

      <div className="max-h-[60dvh] h-full overflow-auto pe-1">
        {step.type === 'multi-select' ? (
          <>
            <MultiSelectField
              name={step.fieldName}
              label={step.title}
              options={step.options}
            />
          </>
        ) : step.type === 'single-select' ? (
          <SingleSelectField
            name={step.fieldName}
            label={step.title}
            options={step.options}
          />
        ) : null}
      </div>
    </div>
  );
};

export default PathwayAssessmentFieldPanel;
