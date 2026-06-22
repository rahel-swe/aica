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

  if (isPending) return <p>Dashboard insights pending...</p>;

  if (error)
    return (
      <ErrorState
        onRetry={refetch}
        isRetrying={isPending}
        title="Dashboard insights failed"
        message={error.message}
      />
    );

  const { title } = pathwayDetailsResponse.data;

  return (
    <Card className="rounded-3xl border-muted/60 shadow-sm">
      <CardHeader className="space-y-2">
        <CardTitle className="text-xl">Insights</CardTitle>
        <CardDescription>
          Compact signals that explain your current progress.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-4 flex-wrap">
        <DashboardInsightsCard
          label="Direction status"
          value={
            profileAssessmentCompleted ? 'Profile ready' : 'Profile needed'
          }
          helper={
            profileAssessmentCompleted
              ? 'Recommendations can use your onboarding traits.'
              : 'Complete onboarding to unlock useful pathway matching.'
          }
        />

        <DashboardInsightsCard
          label="Best match"
          value={title ?? 'Not generated'}
          helper={
            topRecommendedPathwayScore
              ? `${topRecommendedPathwayScore}% fit based on your current profile.`
              : 'Generate recommendations after onboarding.'
          }
        />

        <DashboardInsightsCard
          label="Roadmap progress"
          value={
            hasRoadmap
              ? `${roadmapProgressPercent}% complete`
              : 'No roadmap yet'
          }
          helper={
            hasRoadmap
              ? `${roadmapCompletedSteps} of ${roadmapTotalSteps} steps completed.`
              : roadmapSetupCompleted
                ? 'Setup is ready. Generate a roadmap next.'
                : 'Roadmap setup is needed before generation.'
          }
        />
      </CardContent>
    </Card>
  );
}
