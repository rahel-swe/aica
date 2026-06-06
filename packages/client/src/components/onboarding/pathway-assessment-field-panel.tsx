/* eslint-disable react-hooks/refs */
import type { PathwayAssessmentStep } from '@/constants/pathway-assessment-steps-data';
import MultiSelectField from '../form/multi-select-field';
import SingleSelectField from '../form/single-select-field';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';

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
      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight mb-10 mx-auto">
        {step.title}
      </h1>

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
  );
};

export default PathwayAssessmentFieldPanel;
