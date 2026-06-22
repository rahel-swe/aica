import type { DashboardResponse } from '@contracts/shared/types/dashboard-types';
import { Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import ChartRadialStacked from '../chart-radial-stacked';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

import { getRoadmapProgressTone } from '@/lib/dashboard-utils';
import { m } from '../../paraglide/messages';

export function DashboardRoadmapCard({
  dashboard,
}: {
  dashboard: DashboardResponse;
}) {
  const {
    roadmap: { notStartedSteps, completedSteps, inProgressSteps },
  } = dashboard;

  const progress = Math.max(
    0,
    Math.min(100, dashboard.roadmap.progressPercent)
  );

  const progressTone = getRoadmapProgressTone(progress);

  return (
    <Card className="">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardTitle className="text-xl rtl:font-sans">
              {m.roadmap_progress_title()}
            </CardTitle>
            <CardDescription>
              {dashboard.roadmap.hasRoadmap
                ? (dashboard.roadmap.title ?? m.roadmap_no_roadmap_yet_title())
                : m.roadmap_no_roadmap_yet_title()}
            </CardDescription>
          </div>
          <Badge
            variant={progress >= 80 ? 'default' : 'secondary'}
            className="rounded-full"
          >
            {progressTone}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        <ChartRadialStacked
          title={`${dashboard.roadmap.progressPercent}%`}
          description={m.roadmap_steps_chart_description()}
          chartData={[
            {
              pending: notStartedSteps,
              in_progress: inProgressSteps,
              completed: completedSteps,
            },
          ]}
        />

        {dashboard.roadmap.hasRoadmap && dashboard.roadmap.nextStep ? (
          <div className="rounded-4xl bg-muted p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-1">
                <p className="text-sm font-medium">
                  {m.roadmap_next_step_title()}
                </p>
                <p className="text-sm text-muted-foreground">
                  {dashboard.roadmap.nextStep.title}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <EmptyState
            title={m.roadmap_no_roadmap_yet_title()}
            description={m.roadmap_no_roadmap_yet_description()}
            ctaLabel={m.roadmap_generate_roadmap()}
            href="/app/roadmap"
            icon={Rocket}
          />
        )}
      </CardContent>
    </Card>
  );
}

function EmptyState({
  title,
  description,
  ctaLabel,
  href,
  icon: Icon,
}: {
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex flex-col items-start gap-4 rounded-2xl border border-dashed p-5">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-muted">
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
      <div>
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="mt-1 max-w-md text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      <Button asChild size="sm" className="rounded-full">
        <Link to={href}>{ctaLabel}</Link>
      </Button>
    </div>
  );
}
