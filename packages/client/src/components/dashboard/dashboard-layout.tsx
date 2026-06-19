import type { DashboardResponse } from '@contracts/shared/types/dashboard-types';

import { RoadmapCard } from './dashboard-roadmap-card';
import { InsightsCard } from './dashboard-insights-card';
import { NextActionCard } from './next-action-card';
import { DashboardStats } from './dashboard-stats';

export function DashboardLayout({
  dashboard,
}: {
  dashboard: DashboardResponse;
}) {
  return (
    <div className="h-full pt-18 md:pt-2">
      <div className="mx-auto flex w-full flex-col gap-2 p-4 md:ps-0">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            <NextActionCard dashboard={dashboard} />
            <DashboardStats dashboard={dashboard} />
          </div>

          <div className="space-y-6 lg:col-span-4">
            <RoadmapCard dashboard={dashboard} />
          </div>
        </div>

        <InsightsCard dashboard={dashboard} />
      </div>
    </div>
  );
}
