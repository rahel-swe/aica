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
      className="overflow-hidden"
    >
      <div className=" px-5 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl text-center py-6">
            <h1 className="text-5xl font-semibold tracking-normal relative font-heading mx-auto">
              {roadmap.title}
              <Badge
                variant={'outline'}
                className="bg-emerald-100 text-emerald-950 absolute rotate-45 inset-x-0 mx-auto"
              >
                {formatRoadmapStyle(roadmap.roadmapStyle)}
              </Badge>
            </h1>
            <p className="mt-4 font-heading hidden sm:block">
              {roadmap.summary}
            </p>
          </div>

          {/* <Sheet>
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
                  {roadmap.guidanceNote}
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet> */}
        </div>
      </div>

      {/* <div className="grid gap-0  border-t sm:grid-cols-2 lg:grid-cols-4">
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
      </div> */}
    </motion.section>
  );
}
