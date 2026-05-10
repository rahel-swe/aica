import type {
  RoadmapPhase,
  RoadmapStep,
} from '@contracts/shared/types/roadmap-types';
import { useRoadmapStepsAndPhasesParams } from './roadmap-steps-and-phases-params';

export const useRoadmapStepsAndPhases = ({
  steps,
  phases,
}: {
  steps: RoadmapStep[];
  phases: RoadmapPhase[];
}) => {
  const [{ phaseId, stepId }] = useRoadmapStepsAndPhasesParams();

  const activePhase =
    phases.find((p) => p.id === phaseId) ??
    phases.find((p) => p.status === 'in_progress') ??
    phases.find((p) => p.status === 'pending') ??
    phases.find((p) => p.status === 'completed');

  const currentPhaseSteps = steps.filter(
    (step) => step.phaseId === activePhase?.id
  );

  const step =
    steps.find((s) => s.id === stepId) ??
    currentPhaseSteps.find((s) => s.status === 'in_progress') ??
    currentPhaseSteps.find((s) => s.status === 'pending') ??
    currentPhaseSteps[0];

  return { activePhase, step };
};
