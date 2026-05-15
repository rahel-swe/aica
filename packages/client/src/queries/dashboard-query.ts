import { getDashboard } from '@/services/dashboard-service';
import { useQuery } from '@tanstack/react-query';

export const dashboardQueryKey = ['dashboard'] as const;

export const useDashboardQuery = () => {
  return useQuery({
    queryKey: dashboardQueryKey,
    queryFn: getDashboard,
  });
};
