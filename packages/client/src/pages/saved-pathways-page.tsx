import PathwayListCard from '@/components/cards/pathway-list-card';
import SpinnerBars from '@/components/shadcn-space/spinner/spinner-06';

import type { PathwayListView } from '@contracts/shared/types/pathway-domain-types';
import { usePathwaysQuery } from '@/queries/pathway-query';
import { useSavedStore } from '@/stores/saved-resource-store';

export default function SavedPathwaysPage() {
  const savedIds = useSavedStore((s) => s.savedIds);

  const { data, isPending, isError } = usePathwaysQuery();

  if (isPending) return <SpinnerBars />;

  if (isError) {
    return <div className="p-6 text-red-500">Failed to load pathways.</div>;
  }

  const allPathways: PathwayListView[] =
    data?.pages.flatMap((page) => page.data.items) ?? [];

  const savedPathways = allPathways.filter((p) => savedIds.includes(p._id));

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Saved Pathways</h1>

      <p className="text-muted-foreground mt-2 mb-6">
        Your saved pathways appear here.
      </p>

      {savedPathways.length === 0 ? (
        <div className="text-muted-foreground">No saved pathways yet.</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {savedPathways.map((pathway) => (
            <PathwayListCard key={pathway._id} pathway={pathway} />
          ))}
        </div>
      )}
    </div>
  );
}
