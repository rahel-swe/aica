import StepLayout from '@/layouts/step-layout';
import { useState } from 'react';
import type { OnboardingStepProps } from './step-factory';

export default function SingleSelectStep({ step }: OnboardingStepProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const disabledNextButton = !!selected?.length;

  return (
    <StepLayout title={step.title} disabled={!disabledNextButton}>
      <div>
        {step.options &&
          step.options.map((opt) => (
            <button
              key={opt}
              onClick={() => setSelected(opt)}
              style={{
                display: 'block',
                margin: '10px 0',
                background: selected === opt ? '#333' : '#eee',
                color: selected === opt ? '#fff' : '#000',
              }}
            >
              {opt}
            </button>
          ))}
      </div>
    </StepLayout>
  );
}
