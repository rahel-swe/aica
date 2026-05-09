import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import type { RoadmapPhase } from '@contracts/shared/types/roadmap-types';
import {
  getPhaseTone,
  phaseToneClasses,
  sortSteps,
} from './roadmap-view-utils';
import { RoadmapStepCard } from './roadmap-step-card';

type RoadmapPhaseCardProps = {
  phase: RoadmapPhase;
  index: number;
};

export function RoadmapPhaseCard({ phase, index }: RoadmapPhaseCardProps) {
  const tone = getPhaseTone(phase, index);
  const toneClasses = phaseToneClasses[tone];
  const steps = sortSteps(phase.steps);

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      whileHover={{ y: -2 }}
      className="relative rounded-3xl border p-5"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className={toneClasses.badge}>Phase {index + 1}</Badge>
            <Badge className="border-slate-200 bg-slate-100 text-slate-700">
              {steps.length} steps
            </Badge>
          </div>
          <h3 className="mt-3 text-xl font-semibold">{phase.title}</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            {phase.objective}
          </p>
        </div>
      </div>

      <Separator className="my-5" />

      <div className="grid gap-3">
        {steps.map((step) => (
          <RoadmapStepCard key={step.id} step={step} />
        ))}
      </div>
    </motion.article>
  );
}
