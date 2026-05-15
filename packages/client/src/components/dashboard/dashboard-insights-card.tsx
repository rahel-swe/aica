import type { DashboardResponse } from '@contracts/shared/types/dashboard-types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { TrendingUp } from 'lucide-react';

export function InsightsCard({ dashboard }: { dashboard: DashboardResponse }) {
  return (
    <Card className="rounded-3xl border-muted/60 shadow-sm">
      <CardHeader className="space-y-2">
        <CardTitle className="text-xl">Insights</CardTitle>
        <CardDescription>
          Compact signals that explain your current progress.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-4 flex-wrap">
        {dashboard.insights.length ? (
          dashboard.insights.map((insight) => (
            <div
              key={insight.label}
              className="rounded-2xl border bg-background p-4 grow"
            >
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {insight.label}
              </p>
              <div className="mt-2 flex items-end justify-between gap-3">
                <p className="text-2xl font-semibold tracking-tight">
                  {insight.value}
                </p>
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {insight.helper}
              </p>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed bg-background p-5">
            <p className="text-sm font-medium">No insights yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Once more activity is available, this panel will show progress
              signals and helpful context.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
