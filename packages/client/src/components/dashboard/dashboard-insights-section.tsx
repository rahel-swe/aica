import { usePathwayDetailQuery } from '@/queries/pathway-query';
import type { DashboardResponse } from '@contracts/shared/types/dashboard-types';
import ErrorState from '../error-state';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import DashboardInsightsCard from './dashboard-insights-card';

import { m } from '../../paraglide/messages';

export function DashboardInsightsSection({
  dashboard,
}: {
  dashboard: DashboardResponse;
}) {
  const {
    profileAssessmentCompleted,
    roadmapCompletedSteps,
    roadmapProgressPercent,
    roadmapSetupCompleted,
    roadmapTotalSteps,
    topPathwaySlug,
    topRecommendedPathwayScore,
    hasRoadmap,
  } = dashboard.insights;

  const {
    isPending,
    data: pathwayDetailsResponse,
    error,
    refetch,
  } = usePathwayDetailQuery(topPathwaySlug);

  if (isPending) return <p>{m.dashboard_insights_loading()}</p>;

  if (error) {
    return (
      <ErrorState
        onRetry={refetch}
        isRetrying={isPending}
        title={m.dashboard_insights_error_title()}
        message={error.message}
      />
    );
  }

  const { title } = pathwayDetailsResponse.data;

  return (
    <Card className="rounded-3xl border-muted/60 shadow-sm">
      <CardHeader className="space-y-2">
        <CardTitle className="text-xl rtl:font-sans">
          {m.dashboard_insights_title()}
        </CardTitle>

        <CardDescription>{m.dashboard_insights_description()}</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-4 flex-wrap">
        <DashboardInsightsCard
          label={m.dashboard_insights_direction_status()}
          value={
            profileAssessmentCompleted
              ? m.dashboard_insights_profile_ready()
              : m.dashboard_insights_profile_needed()
          }
          helper={
            profileAssessmentCompleted
              ? m.dashboard_insights_profile_ready_helper()
              : m.dashboard_insights_profile_needed_helper()
          }
        />

        <DashboardInsightsCard
          label={m.dashboard_insights_best_match()}
          value={title ?? m.dashboard_insights_not_generated()}
          helper={
            topRecommendedPathwayScore
              ? m.dashboard_insights_best_match_helper({
                  score: Math.round(topRecommendedPathwayScore * 100),
                })
              : m.dashboard_insights_generate_recommendations_helper()
          }
        />

        <DashboardInsightsCard
          label={m.dashboard_insights_roadmap_progress()}
          value={
            hasRoadmap
              ? m.dashboard_insights_complete({
                  progress: roadmapProgressPercent,
                })
              : m.dashboard_insights_no_roadmap()
          }
          helper={
            hasRoadmap
              ? m.dashboard_insights_steps_completed({
                  completed: roadmapCompletedSteps,
                  total: roadmapTotalSteps,
                })
              : roadmapSetupCompleted
                ? m.dashboard_insights_setup_ready()
                : m.dashboard_insights_setup_needed()
          }
        />
      </CardContent>
    </Card>
  );
}
