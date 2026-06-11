import type { PathwayRoadmap } from '@contracts/shared/types/roadmap-types';
import { motion } from 'motion/react';
import { formatRoadmapStyle } from '../../lib/roadmap-view-utils';
import { Badge } from '@/components/ui/badge';

type RoadmapHeroProps = {
  roadmap: PathwayRoadmap;
};

export function RoadmapHero({ roadmap }: RoadmapHeroProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="overflow-hidden"
    >
      <div className="px-5 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl text-center py-6">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-normal relative font-heading mx-auto">
              {roadmap.title}
              <Badge
                variant={'outline'}
                className="bg-emerald-100 text-emerald-950 absolute rotate-45 inset-x-0 mx-auto"
              >
                {formatRoadmapStyle(roadmap.roadmapStyle)}
              </Badge>
            </h1>
            <p className="mt-4  hidden sm:block">{roadmap.summary}</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
