import { useNavigate } from 'react-router-dom';
import PathwayListCard from '@/components/cards/pathway-list-card';
import SpinnerBars from '@/components/shadcn-space/spinner/spinner-06';
import { Bookmark } from 'lucide-react';
import { m } from '../paraglide/messages';

import type { PathwayListView } from '@contracts/shared/types/pathway-domain-types';
import { useSavedPathwaysQuery } from '@/queries/saved-resource-query';

export default function SavedPathwaysPage() {
  const navigate = useNavigate();
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
    return <div className="p-6 text-red-500">{m.error_page_message()}</div>;
  }

  const savedPathways: PathwayListView[] =
    data?.pages.flatMap((page: any) => (page as any).data.items) ?? [];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{m.saved_pathways_title()}</h1>

      <p className="text-muted-foreground mt-2 mb-6">
        {m.saved_pathways_explore_cta()}
      </p>

      {savedPathways.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-border p-12 text-center text-muted-foreground">
          <div className="rounded-full bg-secondary/10 p-8 text-secondary shadow-sm shadow-secondary/10">
            <Bookmark className="size-16" />
          </div>
          <div className="space-y-2">
            <p className="text-xl font-semibold text-foreground">
              {m.saved_pathways_empty()}
            </p>
            <p className="text-sm text-muted-foreground">
              {m.saved_pathways_explore_cta()}
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/app/explore')}
            className="rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            {m.saved_pathways_explore_cta()}
          </button>
        </div>
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
                {isFetchingNextPage
                  ? m.common_loading()
                  : m.saved_pathways_enroll_cta()}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
