import {
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  Clock3,
  Compass,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { RecommendationResult } from '@contracts/shared/types/pathway-domain-types';
import type { PathwayRoadmap } from '@contracts/shared/types/roadmap-types';
import type { RoadmapSetupAssessmentStatusResponse } from '@contracts/shared/types/roadmap-setup-assessment-types';

type AdvisorSideSummaryProps = {
  selectedTitle: string;
  selectedSummary?: string;
  roadmap?: PathwayRoadmap | null;
  setup?: RoadmapSetupAssessmentStatusResponse['data'];
  recommendations: RecommendationResult[];
};

export function AdvisorSideSummary({
  selectedTitle,
  selectedSummary,
  roadmap,
  setup,
  recommendations,
}: AdvisorSideSummaryProps) {
  const nextStep = roadmap?.steps.find((step) => step.status !== 'completed');

  return (
    <aside className="space-y-4 lg:sticky lg:top-6">
      <Card className="rounded-[2rem] border-blue-200 bg-blue-100/75 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-950">
            <Compass className="size-5" />
            Pathway context
          </CardTitle>
          <CardDescription className="leading-6 text-blue-950/80">
            {selectedSummary ??
              'Advisor will become sharper after a pathway and roadmap exist.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Badge className="h-auto border-blue-300 bg-blue-200 px-3 py-1.5 text-blue-950">
            {selectedTitle}
          </Badge>
        </CardContent>
      </Card>

      <Card className="rounded-[2rem] border-emerald-200 bg-emerald-100/75 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-950">
            <CheckCircle2 className="size-5" />
            Best next action
          </CardTitle>
          <CardDescription className="leading-6 text-emerald-950/80">
            {nextStep?.title ??
              'Generate or open a roadmap to get a precise next action.'}
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="rounded-[2rem] border-yellow-200 bg-yellow-100/80 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-950">
            <Clock3 className="size-5" />
            Roadmap setup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-6 text-yellow-950/85">
          <div className="flex items-center justify-between gap-3">
            <span>Weekly time</span>
            <strong>
              {roadmap?.timeBudgetPerWeek ?? setup?.weeklyTime ?? 'Not set'}
            </strong>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span>Style</span>
            <strong>
              {roadmap?.roadmapStyle ?? setup?.roadmapStyle ?? 'Not set'}
            </strong>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span>Current level</span>
            <strong>
              {roadmap?.currentLevel ?? setup?.currentStage ?? 'Not set'}
            </strong>
          </div>
        </CardContent>
      </Card>

      {roadmap?.nextReviewAt ? (
        <Card className="rounded-[2rem] border-slate-200 bg-white/75 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-950">
              <CalendarClock className="size-5" />
              Review point
            </CardTitle>
            <CardDescription className="text-slate-600">
              {new Intl.DateTimeFormat(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              }).format(new Date(roadmap.nextReviewAt))}
            </CardDescription>
          </CardHeader>
        </Card>
      ) : null}

      {recommendations.length > 0 ? (
        <Card className="rounded-[2rem] border-slate-200 bg-white/75 shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-950">
              Top recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recommendations.slice(0, 3).map((item) => (
              <div
                key={item.pathwayId}
                className="rounded-2xl bg-slate-100 p-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-950">
                    {item.title}
                  </p>
                  <Badge className="border-slate-300 bg-white text-slate-700">
                    {Math.round(item.totalScore)}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : null}

      <Card className="rounded-[2rem] border-orange-200 bg-orange-100/75 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-950">
            <AlertTriangle className="size-5" />
            Advisor boundary
          </CardTitle>
          <CardDescription className="leading-6 text-orange-950/80">
            Advisor helps with AICA decisions. It should not answer unrelated
            questions or replace local university and licensing verification.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Separator className="bg-orange-200" />
          <p className="mt-4 text-sm leading-6 text-orange-950/80">
            Best use: ask what to do next, why something fits, how to compare,
            and how to adjust the plan.
          </p>
        </CardContent>
      </Card>
    </aside>
  );
}
