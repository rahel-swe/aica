import type { DashboardResponse } from '@contracts/shared/types/dashboard-types';
import { Clock3, Rocket } from 'lucide-react';
import ChartRadialStacked from '../chart-radial-stacked';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

function getDifficultyLabel(difficulty?: 'easy' | 'medium' | 'hard') {
  switch (difficulty) {
    case 'easy':
      return 'Easy';
    case 'medium':
      return 'Medium';
    case 'hard':
      return 'Hard';
    default:
      return null;
  }
}

function getProgressTone(progressPercent: number) {
  if (progressPercent >= 80) return 'Excellent';
  if (progressPercent >= 50) return 'Good';
  if (progressPercent >= 20) return 'Growing';
  return 'Getting started';
}

export function RoadmapCard({ dashboard }: { dashboard: DashboardResponse }) {
  const {
    roadmap: { notStartedSteps, completedSteps, inProgressSteps },
  } = dashboard;
  const progress = Math.max(
    0,
    Math.min(100, dashboard.roadmap.progressPercent)
  );
  const progressTone = getProgressTone(progress);

  return (
    <Card className="rounded-3xl border-muted/60 shadow-sm">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardTitle className="text-xl">Roadmap progress</CardTitle>
            <CardDescription>
              {dashboard.roadmap.hasRoadmap
                ? (dashboard.roadmap.title ?? 'Your personalized roadmap')
                : 'No roadmap yet'}
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
          title={dashboard.roadmap.progressPercent.toString() + '%'}
          description="Roadmap Steps"
          chartData={[
            {
              pending: notStartedSteps,
              in_progress: inProgressSteps,
              completed: completedSteps,
            },
          ]}
        />

        {dashboard.roadmap.hasRoadmap && dashboard.roadmap.nextStep ? (
          <div className="rounded-2xl border bg-muted/30 p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-1">
                <p className="text-sm font-medium">Next step</p>
                <p className="text-sm text-muted-foreground">
                  {dashboard.roadmap.nextStep.title}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {dashboard.roadmap.nextStep.estimatedTime ? (
                  <Badge variant="outline" className="rounded-full">
                    <Clock3 className="mr-1.5 h-3.5 w-3.5" />
                    {dashboard.roadmap.nextStep.estimatedTime}
                  </Badge>
                ) : null}
                {dashboard.roadmap.nextStep.difficulty ? (
                  <Badge variant="outline" className="rounded-full">
                    {getDifficultyLabel(dashboard.roadmap.nextStep.difficulty)}
                  </Badge>
                ) : null}
              </div>
            </div>
          </div>
        ) : (
          <EmptyState
            title="No roadmap yet"
            description="Set up a roadmap to turn recommendations into a clear plan with measurable steps."
            ctaLabel="Generate roadmap"
            href={dashboard.nextAction.href}
            icon={Rocket}
          />
        )}

        {/* {dashboard.roadmap.nextReviewAt ? (
          <p className="text-sm text-muted-foreground">
            Next review:{' '}
            <span className="font-medium text-foreground">
              {formatRelativeDate(dashboard.roadmap.nextReviewAt)}
            </span>
          </p>
        ) : null} */}
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
