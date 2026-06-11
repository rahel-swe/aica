import { Map, Route, Compass, Flag, Milestone } from 'lucide-react';

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
        'relative flex flex-col items-center justify-center',
        'text-center max-w-2xl mx-auto',
        'transition-all duration-500',
        'animate-in fade-in slide-in-from-left-6'
      )}
    >
      {/* Background Blobs */}
      <div className="fixed -left-25 -top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="fixed -right-20 -bottom-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      {/* Floating Icons */}
      <Compass className="absolute top-10 left-10 size-12 text-primary/20 rotate-[-15deg]" />

      <Flag className="absolute top-16 right-14 size-10 text-primary/20 rotate-12" />

      <Milestone className="absolute bottom-14 md:-bottom-8 left-20 size-10 text-primary/20" />

      <Route className="absolute bottom-0 md:-bottom-16 right-10 size-12 text-primary/20" />

      {/* Hero */}
      <div className="relative mb-8">
        <Map className="size-24 text-primary" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-3">
        <h1 className="text-4xl md:text-5xl font-semibold">{step.title}</h1>

        {step.helperText && (
          <p className="text-sm md:text-base leading-7 text-muted-foreground">
            {step.helperText}
          </p>
        )}
      </div>
    </div>
  );
};

export default RoadmapSetupIntroPanel;
