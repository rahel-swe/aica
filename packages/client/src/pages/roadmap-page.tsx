import { motion } from 'motion/react';
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  Layers3,
  Target,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useRoadmapQuery } from '@/queries/roadmap-query';
import { RoadmapEmptyState } from '@/components/roadmap/roadmap-empty-state';
import { RoadmapHero } from '@/components/roadmap/roadmap-hero';
import { RoadmapPhaseTimeline } from '@/components/roadmap/roadmap-phase-timeline';
import { RoadmapProgressHeader } from '@/components/roadmap/roadmap-progress-header';
import { RoadmapSidebar } from '@/components/roadmap/roadmap-sidebar';
import { RoadmapSummaryCard } from '@/components/roadmap/roadmap-summary-card';
import { getRoadmapStats } from '@/components/roadmap/roadmap-view-utils';

export default function RoadmapPage() {
  const { data, isPending, isError, refetch } = useRoadmapQuery();
  const roadmap = data?.data;

  if (isPending) {
    return <RoadmapLoadingState />;
  }

  if (isError) {
    return <RoadmapErrorState onRetry={() => refetch()} />;
  }

  if (!roadmap) {
    return (
      <main className="min-h-screen rounded-[2rem] p-4 text-slate-950 sm:p-6 lg:p-8">
        <RoadmapEmptyState />
      </main>
    );
  }

  const stats = getRoadmapStats(roadmap);

  return (
    <main className="min-h-screen rounded-[2rem] p-4 text-slate-950 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <RoadmapHero roadmap={roadmap} />

        <motion.section
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
        >
          {[
            {
              label: 'Phases',
              value: stats.totalPhases,
              detail: 'A clear sequence from first action to next review.',
              icon: <Layers3 className="size-4" />,
              className: 'bg-sky-50/80',
            },
            {
              label: 'Steps',
              value: stats.totalSteps,
              detail: 'Small enough to scan, specific enough to act on.',
              icon: <CheckCircle2 className="size-4" />,
              className: 'bg-emerald-50/80',
            },
            {
              label: 'Current focus',
              value: stats.currentFocus ?? 'First planned step',
              detail: 'The next useful move without opening every section.',
              icon: <Target className="size-4" />,
              className: 'bg-amber-50/80',
            },
            {
              label: 'Next review',
              value: roadmap.nextReviewAt
                ? new Intl.DateTimeFormat(undefined, {
                    month: 'short',
                    day: 'numeric',
                  }).format(new Date(roadmap.nextReviewAt))
                : 'Not set',
              detail: 'A checkpoint keeps the plan honest and adjustable.',
              icon: <CalendarDays className="size-4" />,
              className: 'bg-rose-50/70',
            },
          ].map((item) => (
            <motion.div
              key={item.label}
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <RoadmapSummaryCard {...item} />
            </motion.div>
          ))}
        </motion.section>

        <RoadmapProgressHeader roadmap={roadmap} />

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
          <RoadmapPhaseTimeline roadmap={roadmap} />
          <RoadmapSidebar roadmap={roadmap} />
        </div>
      </div>
    </main>
  );
}

function RoadmapLoadingState() {
  return (
    <main className="min-h-screen rounded-[2rem] bg-slate-50 p-4 text-slate-950 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70">
          <Skeleton className="h-6 w-32 bg-slate-200" />
          <Skeleton className="mt-6 h-10 w-full max-w-xl bg-slate-200" />
          <Skeleton className="mt-4 h-5 w-full max-w-2xl bg-slate-200" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-20 rounded-2xl bg-slate-200" />
            ))}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-36 rounded-2xl bg-slate-200" />
          ))}
        </div>
        <Skeleton className="h-72 rounded-3xl bg-slate-200" />
      </div>
    </main>
  );
}

type RoadmapErrorStateProps = {
  onRetry: () => void;
};

function RoadmapErrorState({ onRetry }: RoadmapErrorStateProps) {
  return (
    <main className="min-h-screen rounded-[2rem] bg-slate-50 p-4 text-slate-950 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-3xl rounded-3xl border border-rose-200 bg-white p-6 shadow-sm shadow-rose-100/70 sm:p-8">
        <div className="flex size-12 items-center justify-center rounded-full bg-rose-100 text-rose-900">
          <AlertCircle className="size-6" />
        </div>
        <h1 className="mt-5 text-2xl font-semibold text-slate-950">
          Roadmap could not be loaded
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          The backend connection is in place, but the latest roadmap request did
          not return successfully. Try again, or generate a roadmap after
          selecting a recommended pathway.
        </p>
        <Button
          type="button"
          onClick={onRetry}
          className="mt-6 bg-slate-950 text-white hover:bg-slate-800"
        >
          Try again
        </Button>
      </div>
    </main>
  );
}
