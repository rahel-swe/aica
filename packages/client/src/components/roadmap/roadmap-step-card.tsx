import { Badge } from '@/components/ui/badge';
import type { RoadmapStep } from '@contracts/shared/types/roadmap-types';
import { ChevronDown, ExternalLink } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { stepStatusMeta } from './roadmap-view-utils';

type RoadmapStepCardProps = {
  step: RoadmapStep;
};

const RoadmapStepCard = ({ step }: RoadmapStepCardProps) => {
  const {
    icon: StatusIcon,
    label,
    iconClassName,
  } = stepStatusMeta[step.status];

  return (
    <div>
      <div className="min-w-0">
        <div className="flex flex-wrap gap-2">
          <Badge variant={'secondary'}>
            {label}
            <StatusIcon className={iconClassName} fill="currentColor" />
          </Badge>
          {step.estimatedTime ? (
            <Badge className="border">{step.estimatedTime}</Badge>
          ) : null}
        </div>
        <h4 className="mt-3 text-base font-semibold">{step.title}</h4>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {step.why}
        </p>
      </div>
      <div className="grid gap-4">
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
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium"></div>
          <p className="text-sm leading-6 text-muted-foreground"></p>
        </div>
      </div>

      {step.resources.length > 0 ? (
        <Popover>
          <PopoverTrigger className="relative -bottom-1">
            <Button size={'xs'} variant={'secondary'}>
              Suggested resources
              <ChevronDown />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="gap-0 ms-5">
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
          </PopoverContent>
        </Popover>
      ) : null}
    </div>
  );
};

export default RoadmapStepCard;
