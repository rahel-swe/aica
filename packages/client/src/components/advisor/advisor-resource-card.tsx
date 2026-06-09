import { ExternalLink, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SearchResult } from '@contracts/shared/types/advisor-types';

// ─── Single resource card ──────────────────────────────────────────────────────

type ResourceCardProps = {
  result: SearchResult;
};

function ResourceCard({ result }: ResourceCardProps) {
  return (
    <a
      href={result.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group flex flex-col gap-1 rounded-xl border bg-background px-3 py-2.5',
        'hover:bg-muted/40 hover:border-foreground/20 transition-colors',
        'text-left no-underline'
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-[12px] font-medium text-foreground leading-snug line-clamp-2 flex-1">
          {result.title}
        </p>
        <ExternalLink className="size-3 text-muted-foreground shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
        <Globe className="size-2.5 shrink-0" />
        <span className="truncate">{result.source}</span>
        {result.score !== undefined && (
          <>
            <span className="mx-0.5">·</span>
            <span>{Math.round(result.score * 100)}% match</span>
          </>
        )}
      </div>
    </a>
  );
}

// ─── Resources section ─────────────────────────────────────────────────────────

type AdvisorResourcesProps = {
  items: SearchResult[];
};

export function AdvisorResources({ items }: AdvisorResourcesProps) {
  if (!items.length) return null;

  return (
    <div className="space-y-1.5">
      <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider px-0.5">
        Sources
      </p>
      <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
        {items.slice(0, 4).map((result, i) => (
          <ResourceCard key={i} result={result} />
        ))}
      </div>
    </div>
  );
}

// ─── Searching indicator ───────────────────────────────────────────────────────
// Shown in the streaming bubble while the search is in progress (before text arrives)

type SearchingIndicatorProps = {
  query: string;
};

export function SearchingIndicator({ query }: SearchingIndicatorProps) {
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground py-1">
      <Globe className="size-3.5 animate-pulse" />
      <span>
        Searching for{' '}
        <span className="font-medium text-foreground">"{query}"</span>
        <span className="animate-[ellipsis_1.5s_steps(4,end)_infinite]">
          ...
        </span>
      </span>
    </div>
  );
}
