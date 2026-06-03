import RoadmapActionableSection from '@/components/roadmap/roadmap-actionable-section';
import RoadmapDeleteButton from '@/components/roadmap/roadmap-delete-button';
import RoadmapEditButton from '@/components/roadmap/roadmap-edit-button';
import { RoadmapEmptyState } from '@/components/roadmap/roadmap-empty-state';
import { RoadmapHero } from '@/components/roadmap/roadmap-hero';
import RoadmapSteps from '@/components/roadmap/roadmap-steps';
import { Button } from '@/components/ui/button';
import { useRoadmapQuery } from '@/queries/roadmap-query';
import { AlertCircle } from 'lucide-react';

export default function RoadmapPage() {
  const { data, isPending, isError, refetch } = useRoadmapQuery();

  const roadmap = data?.data;

  if (isPending) return <p>Roadmap loading...</p>;

  if (isError) return <RoadmapErrorState onRetry={() => refetch()} />;

  if (!roadmap) return <RoadmapEmptyState />;

  return (
    <main className="lg:px-8 flex flex-col lg:flex-row gap-6 px-4 md:px-6 pt-18 pb-20 md:pt-0 md:pb-4">
      <div className="mx-auto max-w-7xl flex flex-col gap-10">
        <RoadmapHero roadmap={roadmap} />
        <RoadmapSteps
          steps={roadmap.steps}
          phases={roadmap.phases}
          roadmapId={roadmap._id}
        />
        <div className="hidden md:flex gap-2 justify-evenly">
          <RoadmapEditButton roadmapId={roadmap._id} />
          <RoadmapDeleteButton roadmapId={roadmap._id} />
        </div>
      </div>
      <RoadmapActionableSection roadmap={roadmap} />
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
