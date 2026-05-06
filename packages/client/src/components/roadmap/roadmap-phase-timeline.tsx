import { motion } from 'motion/react';
import type { PathwayRoadmap } from '@contracts/shared/types/roadmap-types';
import {
  getPhaseTone,
  getRoadmapStats,
  phaseToneClasses,
} from './roadmap-view-utils';
import { RoadmapPhaseCard } from './roadmap-phase-card';

type RoadmapPhaseTimelineProps = {
  roadmap: PathwayRoadmap;
};

export function RoadmapPhaseTimeline({ roadmap }: RoadmapPhaseTimelineProps) {
  const { phases } = getRoadmapStats(roadmap);

  return (
    <section className="relative">
      <div className="absolute left-4 top-4 hidden h-[calc(100%-2rem)] w-px bg-slate-200 md:block" />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="absolute left-4 top-4 hidden h-[calc(100%-2rem)] w-px origin-top bg-slate-300 md:block"
      />

      <div className="space-y-5 md:pl-12">
        {phases.map((phase, index) => {
          const tone = getPhaseTone(phase, index);
          const toneClasses = phaseToneClasses[tone];

          return (
            <div key={phase.id} className="relative">
              <div
                className={`absolute -left-11 top-7 hidden size-7 rounded-full ring-8 md:block ${toneClasses.dot}`}
              />
              <RoadmapPhaseCard phase={phase} index={index} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
