import { useRoadmapStepsAndPhases } from '@/hooks/use-roadmap-steps-and-phases';
import { cn } from '@/lib/utils';
import type {
  RoadmapPhase,
  RoadmapStep,
} from '@contracts/shared/types/roadmap-types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Badge } from '../ui/badge';
import RoadmapStepCardResources from './roadmap-step-card-resources';
import RoadmapStepStatusActionButton from './roadmap-step-status-action-button';
import { roadmapPhaseStatusMeta, stepStatusMeta } from './roadmap-view-utils';

const RoadmapStepDetailsCard = ({
  steps,
  phases,
  roadmapId,
}: {
  steps: RoadmapStep[];
  phases: RoadmapPhase[];
  roadmapId: string;
}) => {
  const { activePhase, step } = useRoadmapStepsAndPhases({ steps, phases });
  const {
    icon: StatusIcon,
    label,
    iconClassName,
  } = stepStatusMeta[step.status];
  const { titleClassName } =
    roadmapPhaseStatusMeta[activePhase?.id ?? 'phase_1'];

  return (
    <div className="flex flex-col gap-6 py-4 lg:max-w-sm lg:w-full">
      <div className=" flex items-center justify-center">
        <RoadmapStepStatusActionButton roadmapId={roadmapId} step={step} />
        {/* <Button variant={'secondary'} size={'sm'}>
          Ask AI
        </Button> */}
      </div>
      <Badge
        className={cn(
          'text-2xl font-semibold capitalize py-6 px-10 mx-auto  relative rotate-8 mt-5',
          titleClassName
        )}
      >
        {activePhase!.phase}
        <span className={'absolute text-xs top-0'}>
          Phase {activePhase?.order}
        </span>
      </Badge>

      <div className="flex flex-wrap gap-2">
        <h3 className="text-lg font-semibold">{activePhase?.title}</h3>
        <p className="text-sm text-muted-foreground">
          {activePhase?.objective}
        </p>
      </div>
      <Badge
        variant={'secondary'}
        className={cn('text-md font-semibold py-5 px-5 mx-auto -rotate-14')}
      >
        Step {step.order}
      </Badge>

      <div className="flex flex-wrap gap-2">
        <Badge variant={'secondary'}>
          {label}
          <StatusIcon className={iconClassName} fill="currentColor" />
        </Badge>
        {step.estimatedTime ? (
          <Badge className="border">{step.estimatedTime}</Badge>
        ) : null}
      </div>

      <Accordion type="single" collapsible className="border-0">
        <AccordionItem
          value="prerequisites"
          className="border-none data-open:bg-transparent"
        >
          <AccordionTrigger className="px-0 py-2">
            Prerequisites
          </AccordionTrigger>
          <AccordionContent>
            {step.prerequisites.length > 0 ? (
              <ul className="space-y-1 text-sm leading-6 text-muted-foreground">
                {step.prerequisites.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm leading-6 text-muted-foreground">
                No formal prerequisites.
              </p>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div>
        <h3 className="text-lg mb-2 font-semibold">{step.title}</h3>
        <p className="text-sm text-muted-foreground">{step.why}</p>
      </div>

      <RoadmapStepCardResources stepResources={step.resources} />

      <Accordion type="single" collapsible className="border-0">
        <AccordionItem value="evidence" className="data-open:bg-transparent">
          <AccordionTrigger className="px-0 py-2">
            Evidence of completion
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            {step.evidenceOfCompletion ??
              'A visible artifact, note, or review that proves this step is complete.'}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default RoadmapStepDetailsCard;
