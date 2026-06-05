import ErrorState from '../error-state';

export function DashboardErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <ErrorState
      onRetry={onRetry}
      title=" Dashboard failed to load"
      message=" There was a problem fetching your dashboard data. Try again to reload the latest state."
    />
  );
}
