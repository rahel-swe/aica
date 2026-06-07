import type { RoadmapSetupStep } from '@/constants/roadmap-setup-assessment-data';
import { cn } from '@/lib/utils';

type RoadmapSetupIntroPanelProps = {
  step: RoadmapSetupStep;
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
        src="/roadmap-img.png"
        alt="Roadmap setup hero image"
        className="w-full scale-125 sm:scale-100 fixed -top-28 h-full object-contain pointer-events-none select-none"
      />

      <div className="flex flex-col gap-2 mt-50 md:mt-60">
        <h1 className="max-w-3xl text-5xl font-semibold tracking-tight">
          {step.title}
        </h1>

        {step.helperText && (
          <p className="text-base text-muted-foreground">{step.helperText}</p>
        )}
      </div>
    </div>
  );
};

export default RoadmapSetupIntroPanel;
