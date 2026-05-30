import type {
  RoadmapPhase,
  RoadmapStep,
} from '@contracts/shared/types/roadmap-types';
import { Drawer, DrawerContent } from '../ui/drawer';
import RoadmapStepDetailsCard from './roadmap-step-details-card';

interface RoadmapStepCardDrawerProps {
  phases: RoadmapPhase[];
  steps: RoadmapStep[];
  roadmapId: string;
  onOpenChage?: (open: boolean) => void;
  open?: boolean;
}

const RoadmapStepCardDrawer = ({
  phases,
  steps,
  roadmapId,
  onOpenChage,
  open,
}: RoadmapStepCardDrawerProps) => {
  return (
    <Drawer onOpenChange={onOpenChage} open={open}>
      <DrawerContent>
        <div className="overflow-y-auto no-scrollbar py-4 px-2">
          <RoadmapStepDetailsCard
            steps={steps}
            phases={phases}
            roadmapId={roadmapId}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default RoadmapStepCardDrawer;
