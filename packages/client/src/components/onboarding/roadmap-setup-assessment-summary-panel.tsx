import {
  CheckCircle,
  FileCheck,
  ClipboardList,
  Sparkles,
  Rocket,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import type { RoadmapSetupStep } from '@/constants/roadmap-setup-assessment-data';

type RoadmapSetupAssessmentSummaryPanelProps = {
  step: RoadmapSetupStep;
};

const RoadmapSetupAssessmentSummaryPanel = ({
  step,
}: RoadmapSetupAssessmentSummaryPanelProps) => {
  return (
    <div
      key={step.id}
      className={cn(
        'relative mx-auto max-w-2xl text-center',
        'transition-all duration-500',
        'animate-in fade-in slide-in-from-right-6'
      )}
    >
      {/* Background Blobs */}
      <div className="fixed -left-25 -top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="fixed -right-20 -bottom-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      {/* Floating Icons */}
      <FileCheck className="absolute top-8 left-8 size-12 text-primary/20 -rotate-12" />
      <ClipboardList className="absolute top-14 right-12 size-10 text-primary/20 rotate-12" />
      <Sparkles className="absolute bottom-10 md:-bottom-4 left-16 size-10 text-primary/20" />
      <Rocket className="absolute bottom-0 md:-bottom-30 right-10 size-12 text-primary/20" />

      {/* Hero */}
      <div className="relative mb-6 flex justify-center">
        <CheckCircle className="size-24 text-primary" />
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-5">
        <h1 className="text-4xl md:text-5xl font-semibold">{step.title}</h1>

        <p className="text-sm md:text-base leading-7 text-card-foreground">
          {step.description}
        </p>

        {step.helperText && (
          <p className="text-xs md:text-sm leading-7 text-muted-foreground">
            {step.helperText}
          </p>
        )}
      </div>
    </div>
  );
};

export default RoadmapSetupAssessmentSummaryPanel;
