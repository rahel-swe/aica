import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { RoadmapHero } from './roadmap-hero';
import { RoadmapPhaseTimeline } from './roadmap-phase-timeline';
import { sampleRoadmap } from './roadmap-view-utils';
import { useGenerateRoadmapMutation } from '@/queries/roadmap-query';
import { useRoadmapSetupAssessmentStatusQuery } from '@/queries/roadmap-setup-assessment-queries';

export function RoadmapEmptyState() {
  const { mutate } = useGenerateRoadmapMutation();
  const { data: roadmapStatusData, isPending } =
    useRoadmapSetupAssessmentStatusQuery();

  if (isPending) return <p>Loading...</p>;

  return (
    <div className="space-y-8">
      <Button
        onClick={() => {
          const { pickedPathwayId } = roadmapStatusData!.data;

          mutate({ pathwayId: pickedPathwayId });
        }}
      >
        Generate
      </Button>
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="rounded-3xl border p-6 shadow-sm shadow-slate-200/70 sm:p-8"
      >
        <div className="flex max-w-3xl flex-col items-start gap-5">
          <div className="flex size-12 items-center justify-center rounded-full">
            <Compass className="size-6" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-normal ">
              Your roadmap is not generated yet
            </h1>
            <p className="mt-3 text-base leading-7 ">
              Choose a recommended pathway and complete the roadmap setup so
              AICA can generate a plan that reflects your current level,
              timeline, and weekly time budget.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="">
              <Link to="/app/recommendations">
                Review recommendations
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="border">
              <Link to="/roadmap-setup-assessment">Complete roadmap setup</Link>
            </Button>
          </div>
        </div>
      </motion.section>

      <section className="space-y-5">
        <div>
          <p className="text-sm font-medium uppercase tracking-normal ">
            Preview
          </p>
          <h2 className="mt-2 text-2xl font-semibold">
            A generated roadmap will look like this
          </h2>
        </div>
        <RoadmapHero roadmap={sampleRoadmap} />
        <RoadmapPhaseTimeline roadmap={sampleRoadmap} />
      </section>
    </div>
  );
}
