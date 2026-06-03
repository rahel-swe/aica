import { useDashboardQuery } from '@/queries/dashboard-query';
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  CircleDashed,
  Rocket,
  Sparkles,
  Target,
  Users,
} from 'lucide-react';
import * as React from 'react';

import { DashboardErrorState } from '@/components/dashboard/dashboard-error-state';
import { InsightsCard } from '@/components/dashboard/dashboard-insights-card';
import { RoadmapCard } from '@/components/dashboard/dashboard-roadmap-card';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type {
  DashboardNextActionType,
  DashboardResponse,
  DashboardStatus,
} from '@contracts/shared/types/dashboard-types';
import { Link } from 'react-router-dom';

function getStatusMeta(status: DashboardStatus) {
  switch (status) {
    case 'needs_onboarding':
      return {
        label: 'Onboarding needed',
        tone: 'secondary' as const,
        icon: CircleDashed,
        description:
          'Finish setup to unlock recommendations and roadmap generation.',
      };
    case 'needs_recommendations':
      return {
        label: 'Review recommendations',
        tone: 'secondary' as const,
        icon: BrainCircuit,
        description: 'Your profile is ready. Choose the best pathway next.',
      };
    case 'needs_roadmap_setup':
      return {
        label: 'Roadmap setup needed',
        tone: 'secondary' as const,
        icon: Target,
        description: 'Pick a pathway so we can build your roadmap.',
      };
    case 'needs_roadmap':
      return {
        label: 'Generate roadmap',
        tone: 'secondary' as const,
        icon: Rocket,
        description: 'You are one step away from a personalized roadmap.',
      };
    case 'active':
    default:
      return {
        label: 'Active',
        tone: 'default' as const,
        icon: CheckCircle2,
        description: 'Everything is in motion. Keep going.',
      };
  }
}

function getNextActionIcon(type: DashboardNextActionType) {
  switch (type) {
    case 'complete_onboarding':
      return Users;
    case 'review_recommendations':
      return BrainCircuit;
    case 'complete_roadmap_setup':
      return Target;
    case 'generate_roadmap':
      return Rocket;
    case 'continue_roadmap':
    default:
      return ArrowRight;
  }
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/40 p-4 md:p-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <Skeleton className="h-24 w-full rounded-3xl" />
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            <Skeleton className="h-40 w-full rounded-3xl" />
            <Skeleton className="h-72 w-full rounded-3xl" />
            <Skeleton className="h-80 w-full rounded-3xl" />
          </div>
          <div className="space-y-6 lg:col-span-4">
            <Skeleton className="h-64 w-full rounded-3xl" />
            <Skeleton className="h-64 w-full rounded-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  helper,
  icon: Icon,
}: {
  label: string;
  value: string;
  helper: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight">
              {value}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{helper}</p>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-muted">
            <Icon className="h-5 w-5 text-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function NextActionCard({ dashboard }: { dashboard: DashboardResponse }) {
  const meta = getStatusMeta(dashboard.status);
  const ActionIcon = getNextActionIcon(dashboard.nextAction.type);

  return (
    <Card className="relative overflow-hidden rounded-3xl border-muted/60 shadow-sm">
      <div className="pointer-events-none absolute" />
      <CardHeader className="relative space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-2">
            <CardTitle className="text-2xl md:text-3xl">
              {dashboard.profile.name
                ? `Welcome back, ${dashboard.profile.name}`
                : 'Welcome back'}
            </CardTitle>
            <CardDescription className="max-w-2xl text-base">
              {meta.description}
            </CardDescription>
          </div>
          <Button asChild className="rounded-full shadow-sm">
            <Link to={dashboard.nextAction.href}>
              {dashboard.nextAction.ctaLabel}
              <ActionIcon className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="rounded-2xl border bg-background/80 p-4 backdrop-blur">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-muted">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Next action</p>
              <p className="text-sm text-muted-foreground">
                {dashboard.nextAction.title}
              </p>
              <p className="text-sm text-muted-foreground">
                {dashboard.nextAction.description}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

export default function DashboardPage() {
  const { data, isLoading, isError, refetch } = useDashboardQuery();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isError) {
    return <DashboardErrorState onRetry={refetch} />;
  }

  const dashboard: DashboardResponse | undefined = data?.data;

  if (!dashboard) return <DashboardErrorState onRetry={refetch} />;

  if (isError) return <DashboardErrorState onRetry={refetch} />;

  return (
    <div className="h-full pt-18 md:pt-0">
      <div className="mx-auto flex w-full flex-col gap-2 p-4 md:ps-0">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            <NextActionCard dashboard={dashboard} />

            <div className="grid gap-4 sm:grid-cols-3">
              <StatCard
                label="Onboarding"
                value={
                  dashboard.profile.onboardingCompleted ? 'Done' : 'Pending'
                }
                helper={
                  dashboard.profile.onboardingCompleted
                    ? 'Profile is ready'
                    : 'Complete setup first'
                }
                icon={
                  dashboard.profile.onboardingCompleted
                    ? CheckCircle2
                    : CircleDashed
                }
              />
              <StatCard
                label="Roadmap setup"
                value={
                  dashboard.profile.roadmapSetupCompleted ? 'Done' : 'Pending'
                }
                helper={
                  dashboard.profile.roadmapSetupCompleted
                    ? 'Roadmap builder unlocked'
                    : 'Build a roadmap next'
                }
                icon={dashboard.profile.roadmapSetupCompleted ? Target : Rocket}
              />
              <StatCard
                label="Recommendations"
                value={dashboard.recommendation.top.length.toString()}
                helper={
                  dashboard.recommendation.hasRecommendations
                    ? 'Top matches ready'
                    : 'Need more profile data'
                }
                icon={BrainCircuit}
              />
            </div>
          </div>
          <div className="space-y-6 lg:col-span-4 lg:row-span-2">
            <RoadmapCard dashboard={dashboard} />
          </div>
        </div>
        <InsightsCard dashboard={dashboard} />
      </div>
    </div>
  );
}
