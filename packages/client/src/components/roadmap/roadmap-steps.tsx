import { useRoadmapStepsAndPhasesParams } from '@/params/roadmap-steps-and-phases-params';
import type {
  RoadmapPhase,
  RoadmapStep,
} from '@contracts/shared/types/roadmap-types';
import { useState } from 'react';
import RoadmapStepButton from './roadmap-step-button';
import RoadmapStepCardDrawer from './roadmap-step-card-drawer';
import { useIsMobile } from '@/hooks/use-mobile';

const RoadmapSteps = ({
  steps,
  phases,
  roadmapId,
}: {
  steps: RoadmapStep[];
  phases: RoadmapPhase[];
  roadmapId: string;
}) => {
  const [, setRoadmapParams] = useRoadmapStepsAndPhasesParams();
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile(1024);

  return (
    <div className="flex flex-wrap items-center justify-evenly gap-20 px-4 sm:gap-25">
      {isMobile && (
        <RoadmapStepCardDrawer
          phases={phases}
          steps={steps}
          roadmapId={roadmapId}
          onOpenChage={setOpen}
          open={open}
        />
      )}
      {steps.map((step, idx) => (
        <RoadmapStepButton
          order={idx + 1}
          key={step.id}
          isInProgress={step.status === 'in_progress'}
          isCompleted={step.status === 'completed'}
          onClick={() => {
            setRoadmapParams({
              phaseId: step.phaseId,
              stepId: step.id,
            });
            setOpen(true);
          }}
        />
      ))}
    </div>
  );
};

export default RoadmapSteps;
