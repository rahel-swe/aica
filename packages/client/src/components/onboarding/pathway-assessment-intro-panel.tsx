import type { PathwayAssessmentStep } from '@/constants/pathway-assessment-steps-data';

type PathwayAssessmentIntroPanelProps = {
  step: PathwayAssessmentStep;
};

import { ArrowUpRight, Briefcase, Rocket, Route, Trophy } from 'lucide-react';

const PathwayAssessmentIntroPanel = ({
  step,
}: PathwayAssessmentIntroPanelProps) => {
  return (
    <div
      className="
        relative
        flex flex-col items-center justify-center
        px-8 text-center max-w-2xl
      "
    >
      {/* Floating Background Blobs */}
      <div className="fixed -left-25 -top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="fixed -right-20 -bottom-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      {/* Floating Icons */}
      <Briefcase className="absolute top-10 left-10 size-12 text-primary/20 rotate-[-15deg]" />

      <Rocket className="absolute top-16 right-14 size-10 text-primary/20 rotate-12" />

      <Trophy className="absolute bottom-13 md:-bottom-10 left-20 size-10 text-primary/20" />

      <ArrowUpRight className="absolute bottom-0 md:-bottom-10 right-10 size-12 text-primary/20" />

      {/* Main Hero */}
      <div className="relative mb-6">
        <Route className="size-24 text-primary" />
      </div>

      <div className="relative z-10 space-y-5">
        <h1 className="text-4xl md:text-5xl font-semibold">{step.title}</h1>

        <p className="text-sm md:text-base leading-7 text-card-foreground">
          {step.description}
        </p>
        <p className="text-xs md:text-sm leading-7 text-muted-foreground">
          {step.helperText}
        </p>
      </div>
    </div>
  );
};

export default PathwayAssessmentIntroPanel;
