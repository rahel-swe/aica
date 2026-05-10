import type { PathwayRoadmap } from '@contracts/shared/types/roadmap-types';
import {
  Check,
  ChevronDown,
  Circle,
  ExternalLink,
  LoaderCircle,
  Play,
  Trash,
  Trash2,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { roadmapPhaseStatusMeta, stepStatusMeta } from './roadmap-view-utils';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';

const RoadmapActionableSection = ({ roadmap }: { roadmap: PathwayRoadmap }) => {
  const { steps, phases } = roadmap;

  const activePhase = phases.filter((p) => p.status === 'in_progress').pop();
  const step =
    roadmap.steps.find((step) => step.phaseId === activePhase?.id) ?? steps[0];

  const { titleClassName } = roadmapPhaseStatusMeta[activePhase!.id];

  const {
    icon: StatusIcon,
    label,
    iconClassName,
  } = stepStatusMeta[step.status];

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

      <Button className={cn('px-6 mx-auto')}>
        {step.status === 'pending'
          ? 'Start'
          : step.status === 'in_progress'
            ? 'Complete'
            : step.status === 'completed'
              ? 'Completed'
              : ''}
        {step.status === 'pending' ? (
          <Play />
        ) : step.status === 'in_progress' ? (
          <LoaderCircle />
        ) : step.status === 'completed' ? (
          <Check />
        ) : (
          <Circle />
        )}
      </Button>
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
