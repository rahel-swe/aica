import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import type { PathwayRoadmap } from '@contracts/shared/types/roadmap-types';
import { getRoadmapStats } from './roadmap-view-utils';

type RoadmapProgressHeaderProps = {
  roadmap: PathwayRoadmap;
};

export function RoadmapProgressHeader({ roadmap }: RoadmapProgressHeaderProps) {
  const stats = getRoadmapStats(roadmap);

  return (
    <section className="rounded-3xl border p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="border bg-emerald-100 text-emerald-900">
              {stats.completedSteps} completed
            </Badge>
            <Badge className="border-sky-200 bg-sky-100 text-sky-900">
              {stats.inProgressSteps} active
            </Badge>
            <Badge className="border bg-slate-100 text-slate-700">
              {stats.totalSteps} total steps
            </Badge>
          </div>
          <h2 className="mt-3 text-lg font-semibold">
            {stats.currentFocus ?? 'Start with the first planned step'}
          </h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Keep the roadmap light enough to use weekly, but detailed enough to
            show what progress looks like.
          </p>
        </div>

        <Separator className="lg:hidden" />

        <div className="min-w-0 lg:w-72">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-muted-foreground">
              Roadmap progress
            </span>
            <span className="font-semibold text-muted-foreground">
              {stats.progress}%
            </span>
          </div>
          <Progress value={stats.progress} className="h-2 bg-secondary" />
        </div>
      </div>
    </section>
  );
}
