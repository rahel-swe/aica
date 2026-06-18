import type { DashboardResponse } from '@contracts/shared/types/dashboard-types';
import {
  BrainCircuit,
  CheckCircle2,
  CircleDashed,
  Rocket,
  Target,
} from 'lucide-react';
import { StatCard } from './stat-card';

export function DashboardStats({
  dashboard,
}: {
  dashboard: DashboardResponse;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <StatCard
        label="Onboarding"
        value={dashboard.profile.onboardingCompleted ? 'Done' : 'Pending'}
        helper="Profile status"
        icon={
          dashboard.profile.onboardingCompleted ? CheckCircle2 : CircleDashed
        }
      />

      <StatCard
        label="Roadmap"
        value={dashboard.profile.roadmapSetupCompleted ? 'Done' : 'Pending'}
        helper="Roadmap status"
        icon={dashboard.profile.roadmapSetupCompleted ? Target : Rocket}
      />

      <StatCard
        label="Recommendations"
        value={dashboard.recommendation.top.length.toString()}
        helper="AI matches"
        icon={BrainCircuit}
      />
    </div>
  );
}
