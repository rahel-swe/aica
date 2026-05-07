import { ExternalLink, FileCheck2, ListChecks } from 'lucide-react';
import type { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import type { RoadmapStep } from '@contracts/shared/types/roadmap-types';
import { difficultyMeta, stepStatusMeta } from './roadmap-view-utils';

type RoadmapStepCardProps = {
  step: RoadmapStep;
};

export function RoadmapStepCard({ step }: RoadmapStepCardProps) {
  const status = stepStatusMeta[step.status];
  const difficulty = difficultyMeta[step.difficulty ?? 'medium'];

  return (
    <div className="rounded-2xl border p-4 transition hover:-translate-y-0.5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap gap-2">
            <Badge className={status.className}>{status.label}</Badge>
            <Badge className={difficulty.className}>{difficulty.label}</Badge>
            {step.estimatedTime ? (
              <Badge className="border">{step.estimatedTime}</Badge>
            ) : null}
          </div>
          <h4 className="mt-3 text-base font-semibold">{step.title}</h4>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {step.why}
          </p>
        </div>
      </div>

      <Accordion type="single" collapsible className="mt-4 border">
        <AccordionItem value={step.id}>
          <AccordionTrigger className="p-3 text-sm hover:no-underline">
            Explore details
          </AccordionTrigger>
          <AccordionContent className="px-3 pb-3">
            <div className="grid gap-4 md:grid-cols-2">
              <DetailGroup
                icon={<ListChecks className="size-4" />}
                title="Prerequisites"
                empty="No formal prerequisites."
                items={step.prerequisites}
              />
              <div>
                <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <FileCheck2 className="size-4" />
                  Evidence of completion
                </div>
                <p className="text-sm leading-6 text-muted-foreground">
                  {step.evidenceOfCompletion ??
                    'A visible artifact, note, or review that proves this step is complete.'}
                </p>
              </div>
            </div>

            {step.resources.length > 0 ? (
              <>
                <Separator className="my-4" />
                <div>
                  <p className="mb-2 text-sm font-medium">
                    Suggested resources
                  </p>
                  <div className="flex flex-wrap gap-2">
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
                          className="inline-flex rounded-full border px-3 py-1 text-xs font-medium"
                        >
                          {resource.title}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </>
            ) : null}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

type DetailGroupProps = {
  icon: ReactNode;
  title: string;
  items?: string[];
  empty: string;
};

function DetailGroup({ icon, title, items = [], empty }: DetailGroupProps) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-sm font-medium">
        {icon}
        {title}
      </div>
      {items.length > 0 ? (
        <ul className="space-y-1 text-sm leading-6 text-muted-foreground">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="text-sm leading-6 text-muted-foreground">{empty}</p>
      )}
    </div>
  );
}
