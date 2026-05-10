import { cn } from '@/lib/utils';
import type { PathwayRoadmap } from '@contracts/shared/types/roadmap-types';
import { Trash } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import RoadmapStepStatusActionButton from './roadmap-step-status-action-button';
import { roadmapPhaseStatusMeta } from './roadmap-view-utils';

const RoadmapActionableSection = ({ roadmap }: { roadmap: PathwayRoadmap }) => {
  const { steps, phases, _id } = roadmap;
  const activePhase =
    phases.find((p) => p.status === 'in_progress') ??
    phases.find((p) => p.status === 'pending');

  const currentPhaseSteps = steps.filter(
    (step) => step.phaseId === activePhase?.id
  );

  const step =
    currentPhaseSteps.find((s) => s.status === 'in_progress') ??
    currentPhaseSteps.find((s) => s.status === 'pending');

  const { titleClassName } =
    roadmapPhaseStatusMeta[activePhase?.id ?? 'phase_1'];

  return (
    <div className="flex flex-col gap-6 py-4">
      <Badge
        className={cn(
          'text-2xl font-semibold py-6 px-4 mx-auto  relative rotate-6',
          titleClassName
        )}
      >
        {activePhase!.title}
        <span className={'absolute text-xs top-0'}>
          Phase {activePhase?.order}
        </span>
      </Badge>
      <div className="flex flex-wrap gap-2">
        <h3>{activePhase?.objective}</h3>
        <Badge
          variant={'secondary'}
          className={cn('text-md font-semibold py-5 px-4 mx-auto')}
        >
          Step {step.order}
        </Badge>
      </div>

      <div className="grid gap-2">
        <h3>Evidence Of Completion</h3>
        {step.evidenceOfCompletion && (
          <p className="text-muted-foreground">{step.evidenceOfCompletion}</p>
        )}
      </div>

      <RoadmapStepStatusActionButton roadmapId={_id} step={step} />
      <Separator />
      <Button
        variant={'destructive'}
        className={'w-min mx-auto text-destructive px-4'}
      >
        Delete Roadmap
        <Trash />
      </Button>
    </div>
  );
};

export default RoadmapActionableSection;
