import { motion } from 'motion/react';
import { CalendarClock, Clock3, Compass, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import type { PathwayRoadmap } from '@contracts/shared/types/roadmap-types';
import {
  formatDate,
  formatRoadmapStyle,
  getRoadmapStats,
} from './roadmap-view-utils';

type RoadmapHeroProps = {
  roadmap: PathwayRoadmap;
};

export function RoadmapHero({ roadmap }: RoadmapHeroProps) {
  const stats = getRoadmapStats(roadmap);

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="overflow-hidden rounded-3xl border"
    >
      <div className=" px-5 py-6 sm:px-7 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge className="border-sky-200 ">
                <Compass className="size-3" />
                Roadmap
              </Badge>
              <Badge className="border text-emerald-900">
                {formatRoadmapStyle(roadmap.roadmapStyle)}
              </Badge>
              <Badge className="border-amber-200 bg-amber-100 text-amber-900">
                {roadmap.status}
              </Badge>
            </div>

            <h1 className="text-3xl font-semibold tracking-normal sm:text-4xl">
              {roadmap.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7">
              {roadmap.summary}
            </p>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button className="w-fit">
                <Sparkles className="size-4" />
                Guidance note
              </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Roadmap guidance</SheetTitle>
                <SheetDescription className="leading-6">
                  {roadmap.guidanceNote ??
                    'Use this roadmap as a practical weekly guide. Review it regularly and adjust when your context changes.'}
                </SheetDescription>
              </SheetHeader>
              <div className="px-6 pb-6">
                <div className="rounded-2xl p-4 text-sm">
                  Long or regulated pathways should be treated as direction and
                  preparation guidance first. Exact admission, licensing, and
                  training rules must be checked locally.
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="grid gap-0 border-t border-slate-200 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: 'Current level',
            value: roadmap.currentLevel ?? 'Not set',
            icon: <Compass className="size-4" />,
          },
          {
            label: 'Weekly time',
            value: roadmap.timeBudgetPerWeek ?? 'Not set',
            icon: <Clock3 className="size-4" />,
          },
          {
            label: 'Next review',
            value: formatDate(roadmap.nextReviewAt),
            icon: <CalendarClock className="size-4" />,
          },
          {
            label: 'Roadmap size',
            value: `${stats.totalPhases} phases / ${stats.totalSteps} steps`,
            icon: <Sparkles className="size-4" />,
          },
        ].map((item) => (
          <div
            key={item.label}
            className="border-b p-5 last:border-b-0 sm:odd:border-r lg:border-b-0 lg:not-last:border-r"
          >
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-normal ">
              {item.icon}
              {item.label}
            </div>
            <p className="mt-2 text-sm font-semibold">{item.value}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
