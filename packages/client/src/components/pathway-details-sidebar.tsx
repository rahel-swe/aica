import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { ScrollArea } from './ui/scroll-area';
import { usePathwaysStore } from '@/stores/pathways-store';
import { usePathwaySidebarQuery } from '@/queries/pathway-infinite-sidebar-query';

export default function PathwaySidebar() {
  const navigate = useNavigate();

  const { search, type } = usePathwaysStore();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    usePathwaySidebarQuery(search, type);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  if (isPending) {
    return (
      <aside className="hidden md:flex w-80 flex-col">
        <p className="p-4 text-muted-foreground">Loading pathways...</p>
      </aside>
    );
  }

  const pathways = data?.pages.flatMap((page) => page.data.items) ?? [];

  return (
    <aside className="hidden md:flex w-80 flex-col">
      <div className="sticky top-20 flex flex-col rounded-4xl border bg-card h-[98%] min-h-0 pb-14 overflow-hidden">
        <div className="border-b p-4">
          <h2 className="text-sm font-semibold text-muted-foreground">
            All Pathways
          </h2>
        </div>

        <ScrollArea className="h-full">
          <div className="flex-1 p-2 space-y-2 h-full">
            {pathways.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/app/pathways/${item._id}`)}
                className="
                  cursor-pointer rounded-lg px-3 py-2 text-sm transition
                  hover:bg-muted
                "
              >
                {item.title}
              </div>
            ))}

            <div ref={loadMoreRef} className="h-10" />

            {isFetchingNextPage && (
              <p className="text-center text-xs text-muted-foreground py-2">
                Loading more...
              </p>
            )}
          </div>
        </ScrollArea>
      </div>
    </aside>
  );
}
