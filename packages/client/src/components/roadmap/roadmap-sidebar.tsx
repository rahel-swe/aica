import { Lightbulb, ShieldCheck, Sparkles, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { PathwayRoadmap } from '@contracts/shared/types/roadmap-types';
import { sortSteps } from './roadmap-view-utils';

type RoadmapSidebarProps = {
  roadmap: PathwayRoadmap;
};

export function RoadmapSidebar({ roadmap }: RoadmapSidebarProps) {
  const thisWeekSteps = sortSteps(roadmap.steps)
    .filter((step) => step.status !== 'completed')
    .slice(0, 3);

  return (
    <aside className="space-y-4 lg:sticky lg:top-6">
      <Card className="rounded-3xl shadow-none">
        <CardHeader>
          <CardTitle className="flex gap-2 items-center">
            <Sparkles className="size-5 text-emerald-500" />
            AI summary
          </CardTitle>
          <CardDescription className="leading-6">
            {roadmap.aiSummary ??
              'Your roadmap is structured to turn the selected pathway into clear weekly action.'}
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="rounded-3xl shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 ">
            <Target className="size-5 text-amber-500" />
            This week
          </CardTitle>
          <CardDescription className="leading-6">
            Keep the next move small enough to actually finish.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {thisWeekSteps.length > 0 ? (
            thisWeekSteps.map((step, index) => (
              <div key={step.id} className="rounded-2xl border p-3">
                <div className="flex items-center gap-2">
                  <span className="flex size-6 items-center justify-center rounded-full text-xs font-semibold">
                    {index + 1}
                  </span>
                  <p className="text-sm font-medium">{step.title}</p>
                </div>
                {step.estimatedTime ? (
                  <p className="mt-2 text-xs">{step.estimatedTime}</p>
                ) : null}
              </div>
            ))
          ) : (
            <p className="text-sm leading-6">
              All visible steps are complete. Review the roadmap and plan the
              next phase with your advisor.
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="rounded-3xl">
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="size-5" />
              Reality note
            </CardTitle>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className=""
                >
                  <Lightbulb className="size-4" />
                  <span className="sr-only">Why this note matters</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Long pathways need local verification before commitment.
              </TooltipContent>
            </Tooltip>
          </div>
          <CardDescription className="leading-6">
            {roadmap.guidanceNote}
          </CardDescription>
        </CardHeader>
      </Card>

      {roadmap.sourceRecommendation ? (
        <Card className="rounded-3xl shadow-none">
          <CardHeader>
            <CardTitle className="">Fit context</CardTitle>
            <CardDescription className="">
              This roadmap is connected to the recommendation that led here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Badge className="">
              {Math.round(roadmap.sourceRecommendation.totalScore)} fit score
            </Badge>
            {roadmap.sourceRecommendation.reasons.length > 0 ? (
              <>
                <Separator className="my-4" />
                <ul className="space-y-2 text-sm">
                  {roadmap.sourceRecommendation.reasons
                    .slice(0, 3)
                    .map((reason) => (
                      <li key={reason}>{reason}</li>
                    ))}
                </ul>
              </>
            ) : null}
          </CardContent>
        </Card>
      ) : null}
    </aside>
  );
}
