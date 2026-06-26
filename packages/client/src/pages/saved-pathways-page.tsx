import PathwayListCard from '@/components/cards/pathway-list-card';
import SpinnerBars from '@/components/shadcn-space/spinner/spinner-06';

import type { PathwayListView } from '@contracts/shared/types/pathway-domain-types';
import { useSavedPathwaysQuery } from '@/queries/saved-resource-query';

export default function SavedPathwaysPage() {
  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSavedPathwaysQuery() as any;

  if (isPending) return <SpinnerBars />;

  if (isError) {
    return <div className="p-6 text-red-500">Failed to load pathways.</div>;
  }

  console.log(data);

  const savedPathways: PathwayListView[] =
    data?.pages.flatMap((page: any) => (page as any).data.items) ?? [];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Saved Pathways</h1>

      <p className="text-muted-foreground mt-2 mb-6">
        Your saved pathways appear here.
      </p>

      {savedPathways.length === 0 ? (
        <div className="text-muted-foreground">No saved pathways yet.</div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {savedPathways.map((pathway) => (
              <PathwayListCard key={pathway.id} pathway={pathway} />
            ))}
          </div>

          {hasNextPage && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="rounded-full border border-border px-4 py-2"
              >
                {isFetchingNextPage ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
