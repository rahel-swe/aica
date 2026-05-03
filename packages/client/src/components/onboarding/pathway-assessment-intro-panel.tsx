import type { PathwayAssessmentStep } from '@/constants/pathway-assessment-steps';
import { cn } from '@/lib/utils';

type PathwayAssessmentIntroPanelProps = {
  step: PathwayAssessmentStep;
};

const PathwayAssessmentIntroPanel = ({
  step,
}: PathwayAssessmentIntroPanelProps) => {
  return (
    <div
      key={step.id}
      className={cn(
        'flex flex-col items-center justify-center text-center',
        'transition-all duration-500 animate-in fade-in slide-in-from-left-6'
      )}
    >
      <img
        src="/onboard-welcome.png"
        alt="Pathway Assessment hero background"
        className="inset-0 max-w-120 w-full h-full object-contain pointer-events-none select-none z-0"
      />

      {/* <img
        src="/onboard-welcome.png"
        alt="welcome image"
        className="pointer-events-none w-100 select-none z-0 md:hidden"
      /> */}
      <div className="flex flex-col gap-4">
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight">
          {step.title}
        </h1>
        <p className="max-w-2xl text-sm leading-6">{step.description}</p>
        {/* {step.helperText && <p className="text-sm">{step.helperText}</p>} */}
      </div>
    </div>
  );
};

export default PathwayAssessmentIntroPanel;
