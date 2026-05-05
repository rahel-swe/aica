import type { RoadmapStep } from '@/constants/roadmap-setup-steps';
import { cn } from '@/lib/utils';

type RoadmapSetupIntroPanelProps = {
  step: RoadmapStep;
};

const RoadmapSetupIntroPanel = ({ step }: RoadmapSetupIntroPanelProps) => {
  return (
    <div
      key={step.id}
      className={cn(
        'flex flex-col items-center justify-center text-center',
        'transition-all duration-500 animate-in fade-in slide-in-from-left-6'
      )}
    >
      <img
        src="/roadmap-setup.png"
        alt="Roadmap setup hero image"
        className="max-w-120 w-full h-full object-contain pointer-events-none select-none"
      />

      <div className="flex flex-col gap-4">
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight">
          {step.title}
        </h1>

        {step.description && (
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            {step.description}
          </p>
        )}

        {step.helperText && (
          <p className="text-sm text-muted-foreground">{step.helperText}</p>
        )}
      </div>
    </div>
  );
};

export default RoadmapSetupIntroPanel;
