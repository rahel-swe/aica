import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import type {
  AdvisorHistoryItem,
  AdvisorResponse,
} from '@contracts/shared/types/advisor-types';
import { Clock3 } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';

type AdvisorHistoryListProps = {
  items?: AdvisorHistoryItem[];
  isPending: boolean;
  selectedId?: string;
  onSelect: (item: AdvisorHistoryItem) => void;
};

export function AdvisorHistoryList({
  items,
  isPending,
  selectedId,
  onSelect,
}: AdvisorHistoryListProps) {
  if (isPending) {
    return (
      <aside className="space-y-3">
        <Skeleton className="h-10 rounded-full" />
        <Skeleton className="h-20 rounded-xl" />
        <Skeleton className="h-20 rounded-xl" />
      </aside>
    );
  }

  return (
    <aside className="flex-col gap-4 sticky top-0 hidden md:flex">
      <div className="flex items-center gap-2 text-sm font-medium">
        <Clock3 className="size-4 text-muted-foreground" />
        Recent advisor
      </div>

      {!items?.length ? (
        <p className="text-sm leading-6 text-muted-foreground">
          Your useful advisor answers will appear here.
        </p>
      ) : (
        <div className="max-h-[calc(100dvh-11rem)]">
          <ScrollArea className="h-full">
            <div className="grid gap-2">
              {items.map((item) => (
                <button
                  key={item._id}
                  type="button"
                  className={
                    selectedId === item._id
                      ? 'rounded-xl border bg-secondary px-3 py-3 text-left transition-colors'
                      : 'rounded-xl border bg-card px-3 py-3 text-left transition-colors hover:bg-muted/60'
                  }
                  onClick={() => onSelect(item)}
                >
                  <div className="min-w-0 space-y-2">
                    <div className="flex flex-wrap gap-1.5">
                      <Badge variant="secondary" className="capitalize">
                        {formatMode(item.mode)}
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {item.source}
                      </Badge>
                    </div>
                    <p className="truncate text-sm font-medium line-clamp-1">
                      {item.response.title}
                    </p>
                    <p className="text-xs leading-5 text-muted-foreground line-clamp-1">
                      {item.message}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </aside>
  );
}

const formatMode = (mode: AdvisorResponse['mode']) => mode.replace('_', ' ');
