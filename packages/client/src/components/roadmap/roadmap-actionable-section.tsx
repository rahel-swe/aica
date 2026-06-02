import type { PathwayRoadmap } from '@contracts/shared/types/roadmap-types';
import RoadmapDeleteButton from './roadmap-delete-button';
import RoadmapStepDetailsCard from './roadmap-step-details-card';
import RoadmapEditButton from './roadmap-edit-button';
import { useIsMobile } from '@/hooks/use-mobile';

const RoadmapActionableSection = ({ roadmap }: { roadmap: PathwayRoadmap }) => {
  const { steps, phases, _id } = roadmap;
  const isMobile = useIsMobile(1024);

  return (
    <div className="flex flex-col gap-4 lg:max-w-md">
      {!isMobile && (
        <RoadmapStepDetailsCard phases={phases} steps={steps} roadmapId={_id} />
      )}
      <div className="flex gap-2 justify-evenly md:hidden">
        <RoadmapEditButton roadmapId={_id} />
        <RoadmapDeleteButton roadmapId={_id} />
      </div>
    </div>
  );
};

export default RoadmapActionableSection;
