import type { PathwayRoadmap } from '@contracts/shared/types/roadmap-types';
import { Separator } from '../ui/separator';
import RoadmapDeleteButton from './roadmap-delete-button';
import RoadmapStepDetailsCard from './roadmap-step-details-card';
import RoadmapEditButton from './roadmap-edit-button';

const RoadmapActionableSection = ({ roadmap }: { roadmap: PathwayRoadmap }) => {
  const { steps, phases, _id } = roadmap;

  return (
    <div className="flex flex-col gap-4">
      <RoadmapStepDetailsCard phases={phases} steps={steps} roadmapId={_id} />
      <Separator />
      <div className="flex gap-2">
        <RoadmapEditButton roadmapId={_id} />
        <RoadmapDeleteButton roadmapId={_id} />
      </div>
    </div>
  );
};

export default RoadmapActionableSection;
