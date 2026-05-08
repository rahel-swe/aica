import type { PathwayRoadmap } from '@contracts/shared/types/roadmap-types';
import RoadmapStepButton from './roadmap-step-button';
import { getRoadmapStats } from './roadmap-view-utils';

const RoadmapSteps = ({ roadmap }: { roadmap: PathwayRoadmap }) => {
  const { steps } = getRoadmapStats(roadmap);

  return (
    <div className="flex flex-wrap items-center justify-evenly gap-20 px-4 sm:gap-25">
      {steps.map((step, idx) => (
        <RoadmapStepButton
          order={idx + 1}
          isInProgress={step.status === 'in_progress'}
          isCompleted={step.status === 'completed'}
        />
      ))}
    </div>
  );
};

export default RoadmapSteps;
