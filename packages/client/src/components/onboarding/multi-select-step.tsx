import StepLayout from '@/layouts/step-layout';
import { useState } from 'react';
import type { OnboardingStepProps } from './step-factory';

export default function MultiSelectStep({ step }: OnboardingStepProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const disabledNextButton = !!selected?.length;

  return (
    <StepLayout
      title={step.title}
      subtitle="Pick a few"
      disabled={!disabledNextButton}
    >
      <div>
        {step.options &&
          step.options.map((opt) => (
            <button
              key={opt}
              onClick={() => toggle(opt)}
              style={{
                margin: 5,
                background: selected.includes(opt) ? '#333' : '#eee',
                color: selected.includes(opt) ? '#fff' : '#000',
              }}
            >
              {opt}
            </button>
          ))}
      </div>
    </StepLayout>
  );
}
