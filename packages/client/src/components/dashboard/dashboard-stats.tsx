import type { DashboardResponse } from '@contracts/shared/types/dashboard-types';
import { CheckCircle2, Clock3, CircleDashed } from 'lucide-react';

import { StatCard } from './stat-card';
import { m } from '../../paraglide/messages';

export function DashboardStats({
  dashboard,
}: {
  dashboard: DashboardResponse;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <StatCard
        label={m.dashboard_stats_profile_assessment()}
        value={
          dashboard.profile.onboardingCompleted
            ? m.dashboard_stats_done()
            : m.dashboard_stats_pending()
        }
        icon={
          dashboard.profile.onboardingCompleted ? CheckCircle2 : CircleDashed
        }
      />

      <StatCard
        label={m.dashboard_stats_roadmap_generation()}
        value={
          dashboard.profile.roadmapSetupCompleted
            ? m.dashboard_stats_done()
            : m.dashboard_stats_pending()
        }
        icon={dashboard.profile.roadmapSetupCompleted ? CheckCircle2 : Clock3}
      />

      <StatCard
        label={m.dashboard_stats_pathway_recommendations()}
        value={m.dashboard_stats_done()}
        icon={CheckCircle2}
      />
    </div>
  );
}
