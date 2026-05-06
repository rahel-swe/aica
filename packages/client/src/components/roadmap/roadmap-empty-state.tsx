import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { RoadmapHero } from './roadmap-hero';
import { RoadmapPhaseTimeline } from './roadmap-phase-timeline';
import { sampleRoadmap } from './roadmap-view-utils';

export function RoadmapEmptyState() {
  return (
    <div className="space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70 sm:p-8"
      >
        <div className="flex max-w-3xl flex-col items-start gap-5">
          <div className="flex size-12 items-center justify-center rounded-full bg-sky-100 text-sky-900">
            <Compass className="size-6" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-normal text-slate-950">
              Your roadmap is not generated yet
            </h1>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Choose a recommended pathway and complete the roadmap setup so
              AICA can generate a plan that reflects your current level,
              timeline, and weekly time budget.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              className="bg-slate-950 text-white hover:bg-slate-800"
            >
              <Link to="/app/recommendations">
                Review recommendations
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-slate-200 bg-white text-slate-800"
            >
              <Link to="/roadmap-setup-assessment">Complete roadmap setup</Link>
            </Button>
          </div>
        </div>
      </motion.section>

      <section className="space-y-5">
        <div>
          <p className="text-sm font-medium uppercase tracking-normal text-slate-500">
            Preview
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">
            A generated roadmap will look like this
          </h2>
        </div>
        <RoadmapHero roadmap={sampleRoadmap} />
        <RoadmapPhaseTimeline roadmap={sampleRoadmap} />
      </section>
    </div>
  );
}
