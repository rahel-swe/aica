import ErrorState from '@/components/error-state';
import RoadmapDeleteButton from '@/components/roadmap/roadmap-delete-button';
import RoadmapEditButton from '@/components/roadmap/roadmap-edit-button';
import { RoadmapEmptyState } from '@/components/roadmap/roadmap-empty-state';
import { RoadmapHero } from '@/components/roadmap/roadmap-hero';
import RoadmapStepDetailsCard from '@/components/roadmap/roadmap-step-details-card';
import RoadmapSteps from '@/components/roadmap/roadmap-steps';
import { useIsMobile } from '@/hooks/use-mobile';
import { useRoadmapQuery } from '@/queries/roadmap-query';

export default function RoadmapPage() {
  const isMobile = useIsMobile(1024);
  const { data, isPending, isError, refetch } = useRoadmapQuery();

  const roadmap = data?.data;

  if (isPending) return <p>Roadmap loading...</p>;

  if (isError)
    return (
      <ErrorState
        onRetry={refetch}
        title="Roadmap could not be loaded"
        message="Try again later. or look your roadmap map setup!"
      />
    );

  if (!roadmap)
    return (
      <RoadmapEmptyState className="px-4 md:px-6 pt-26 pb-22 md:pt-6 md:pb-4" />
    );

  return (
    <main className="lg:px-8 flex flex-col lg:flex-row gap-6 px-4 md:px-6 pt-18 pb-20 md:pt-0 md:pb-4">
      {!isMobile && (
        <RoadmapStepDetailsCard
          phases={roadmap.phases}
          steps={roadmap.steps}
          roadmapId={roadmap._id}
        />
      )}

      <div className="mx-auto max-w-7xl flex flex-col gap-10">
        <RoadmapHero roadmap={roadmap} />
        <RoadmapSteps
          steps={roadmap.steps}
          phases={roadmap.phases}
          roadmapId={roadmap._id}
        />
        <div className="flex gap-2 justify-evenly">
          <RoadmapEditButton roadmapId={roadmap._id} />
          <RoadmapDeleteButton roadmapId={roadmap._id} />
        </div>
      </div>
    </main>
  );
}
