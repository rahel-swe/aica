import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useAdvisorHistoryQuery } from '@/queries/advisor-query';
import { useAdvisorHistoryStore } from '@/stores/advisor-history-store';
import type {
  AdvisorHistoryItem,
  AdvisorResponse,
} from '@contracts/shared/types/advisor-types';
import { Clock3, ReplaceIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import DeleteConversationButton from './delete-conversation-button';
import StartNewAdvisor from './start-new-advisor';

export type AdvisorHistoryListProps = {
  onSelect: (item: AdvisorHistoryItem) => void;
};

export function AdvisorHistoryList({ onSelect }: AdvisorHistoryListProps) {
  const { data: history, isPending, error, refetch } = useAdvisorHistoryQuery();
  const { selectedHistory } = useAdvisorHistoryStore();

  if (isPending) {
    return (
      <aside className="space-y-3">
        <Skeleton className="h-10 rounded-full" />
        <Skeleton className="h-20 rounded-xl" />
        <Skeleton className="h-20 rounded-xl" />
      </aside>
    );
  }

  if (error)
    return (
      <div>
        <p className="text-destructive">
          Something went wrong, please try again.
        </p>
        <Button onClick={() => refetch()}>
          Try Again
          <ReplaceIcon />
        </Button>
      </div>
    );

  return (
    <aside className="flex-col gap-2 sticky top-0 shrink  flex max-w-sm h-full">
      <div className="flex items-center justify-between gap-2 text-sm font-medium">
        <div className="flex items-end gap-2 h-8">
          <Clock3 className="size-6 text-muted-foreground" />
          <p className="self-end">Recent advisor</p>
        </div>
        <StartNewAdvisor size="sm" />
      </div>

      {!history?.data?.length ? (
        <p className="text-sm leading-6 text-muted-foreground">
          Your useful advisor answers will appear here.
        </p>
      ) : (
        <div className="h-full min-h-0">
          <ScrollArea className="h-full">
            <div className="grid gap-2 pb-4">
              {history?.data.map((item) => (
                <button
                  key={item._id}
                  type="button"
                  className={cn(
                    'rounded-xl border bg-card px-3 py-3 text-left transition-colors hover:bg-muted/60 cursor-pointer',
                    selectedHistory?._id === item._id &&
                      'rounded-xl border bg-secondary px-3 py-3 text-left transition-colors'
                  )}
                  onClick={() => {
                    onSelect(item);
                  }}
                >
                  <div className="min-w-0 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        <Badge variant="secondary" className="capitalize">
                          {formatMode(item.mode)}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {item.source}
                        </Badge>
                      </div>
                      <DeleteConversationButton conversationId={item._id} />
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
