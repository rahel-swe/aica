import type { PathwayAssessmentStep } from '@/constants/pathway-assessment-steps';
import MultiSelectField from '../form/multi-select-field';
import SingleSelectField from '../form/single-select-field';

type OnboardingFieldPanelProps = {
  step: PathwayAssessmentStep;
};

const PathwayAssessmentFieldPanel = ({ step }: OnboardingFieldPanelProps) => {
  if (!step.fieldName || !step.options) return null;

  return (
    <div className="space-y-4">
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
