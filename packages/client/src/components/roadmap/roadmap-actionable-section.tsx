import { cn } from '@/lib/utils';
import type { PathwayRoadmap } from '@contracts/shared/types/roadmap-types';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import RoadmapDeleteButton from './roadmap-delete-button';
import RoadmapStepStatusActionButton from './roadmap-step-status-action-button';
import { roadmapPhaseStatusMeta } from './roadmap-view-utils';
import { ExternalLink } from 'lucide-react';
import { useRoadmapStepsAndPhases } from '@/hooks/use-roadmap-steps-and-phases';

const RoadmapActionableSection = ({ roadmap }: { roadmap: PathwayRoadmap }) => {
  const { steps, phases, _id } = roadmap;
  const { activePhase, step } = useRoadmapStepsAndPhases({ steps, phases });

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

      {step.resources.length > 0 && (
        <div className="grid gap-2">
          <h3>Suggested resources</h3>
          <p className="text-muted-foreground">
            {step.resources.map((resource) =>
              resource.url ? (
                <a
                  key={`${resource.title}-${resource.url}`}
                  href={resource.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium"
                >
                  {resource.title}
                  <ExternalLink className="size-3" />
                </a>
              ) : (
                <span
                  key={resource.title}
                  className="inline-flex rounded-full px-3 py-1 text-xs font-medium"
                >
                  {resource.title}
                </span>
              )
            )}
          </p>
        </div>
      )}

      <RoadmapStepStatusActionButton roadmapId={_id} step={step} />
      <Separator />
      <RoadmapDeleteButton roadmapId={_id} />
    </div>
  );
};

export default RoadmapActionableSection;
