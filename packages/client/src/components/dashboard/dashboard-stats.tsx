import type { DashboardResponse } from '@contracts/shared/types/dashboard-types';
import { CheckCircle2, Clock3, CircleDashed } from 'lucide-react';

import { StatCard } from './stat-card';

export function DashboardStats({
  dashboard,
}: {
  dashboard: DashboardResponse;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <StatCard
        label="Profile assessment"
        value={dashboard.profile.onboardingCompleted ? 'Done' : 'Pending'}
        icon={
          dashboard.profile.onboardingCompleted ? CheckCircle2 : CircleDashed
        }
      />

      <StatCard
        label="Roadmap generation"
        value={dashboard.profile.roadmapSetupCompleted ? 'Done' : 'Pending'}
        icon={dashboard.profile.onboardingCompleted ? CheckCircle2 : Clock3}
      />

      <StatCard
        label="Pathway recommendations"
        value="Done"
        icon={CheckCircle2}
      />
    </div>
  );
}
