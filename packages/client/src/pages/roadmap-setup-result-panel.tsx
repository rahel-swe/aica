import type { RoadmapSetupStep } from '@/constants/roadmap-setup-steps';

type RoadmapSetupResultPanelProps = {
  step: RoadmapSetupStep;
};

const RoadmapSetupResultPanel = ({
  step: _step,
}: RoadmapSetupResultPanelProps) => {
  return <div>RoadmapSetupResultPanel</div>;
};

export default RoadmapSetupResultPanel;
