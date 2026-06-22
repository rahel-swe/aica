import { useDashboardQuery } from '@/queries/dashboard-query';
import { DashboardErrorState } from '@/components/dashboard/dashboard-error-state';
import { DashboardSkeleton } from '@/components/dashboard/dashboard-skeleton';
import { DashboardInsightsSection } from '@/components/dashboard/dashboard-insights-section';
import { DashboardRoadmapCard } from '@/components/dashboard/dashboard-roadmap-card';
import { DashboardStatsCard } from '@/components/dashboard/dashboard-stats';
import { NextActionCard } from '@/components/dashboard/next-action-card';

export default function DashboardPage() {
  const { data, isPending, isError, refetch } = useDashboardQuery();

  if (isPending) return <DashboardSkeleton />;
  if (isError) return <DashboardErrorState onRetry={refetch} />;

  const dashboard = data?.data;

  if (!dashboard) return <DashboardErrorState onRetry={refetch} />;

  return (
    <div className="h-full pt-18 md:pt-2">
      <div className="mx-auto flex w-full flex-col gap-6 p-4 md:ps-0">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            <NextActionCard dashboard={dashboard} />
            <DashboardStatsCard dashboard={dashboard} />
          </div>

          <div className="space-y-6 lg:col-span-4">
            <DashboardRoadmapCard dashboard={dashboard} />
          </div>
        </div>

        <DashboardInsightsSection dashboard={dashboard} />
      </div>
    </div>
  );
}
