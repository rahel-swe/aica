import { useDashboardQuery } from '@/queries/dashboard-query';
import { DashboardErrorState } from '@/components/dashboard/dashboard-error-state';
import { DashboardSkeleton } from '@/components/dashboard/dashboard-skeleton';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';

export default function DashboardPage() {
  const { data, isPending, isError, refetch } = useDashboardQuery();

  if (isPending) return <DashboardSkeleton />;
  if (isError) return <DashboardErrorState onRetry={refetch} />;

  const dashboard = data?.data;

  if (!dashboard) return <DashboardErrorState onRetry={refetch} />;

  return <DashboardLayout dashboard={dashboard} />;
}
