import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';

export function DashboardErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="min-h-screen  p-4 md:p-6">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-start gap-5 rounded-3xl border bg-background p-6 shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-destructive/10">
          <AlertTriangle className="h-6 w-6 text-destructive" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Dashboard failed to load
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            There was a problem fetching your dashboard data. Try again to
            reload the latest state.
          </p>
        </div>
        <Button onClick={onRetry} className="rounded-full">
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry
        </Button>
      </div>
    </div>
  );
}
