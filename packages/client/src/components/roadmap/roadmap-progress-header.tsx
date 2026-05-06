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
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="border-emerald-200 bg-emerald-100 text-emerald-900">
              {stats.completedSteps} completed
            </Badge>
            <Badge className="border-sky-200 bg-sky-100 text-sky-900">
              {stats.inProgressSteps} active
            </Badge>
            <Badge className="border-slate-200 bg-slate-100 text-slate-700">
              {stats.totalSteps} total steps
            </Badge>
          </div>
          <h2 className="mt-3 text-lg font-semibold text-slate-950">
            {stats.currentFocus ?? 'Start with the first planned step'}
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            Keep the roadmap light enough to use weekly, but detailed enough to
            show what progress looks like.
          </p>
        </div>

        <Separator className="lg:hidden" />

        <div className="min-w-0 lg:w-72">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-slate-700">Roadmap progress</span>
            <span className="font-semibold text-slate-950">
              {stats.progress}%
            </span>
          </div>
          <Progress value={stats.progress} className="h-2 bg-slate-100" />
        </div>
      </div>
    </section>
  );
}
