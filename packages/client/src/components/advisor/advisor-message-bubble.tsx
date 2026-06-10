import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, ArrowRight, Lightbulb } from 'lucide-react';
import { AdvisorResources, SearchingIndicator } from './advisor-resource-card';
import type { AdvisorChatMessage } from '@contracts/shared/types/advisor-types';
import { Streamdown } from 'streamdown';
import SpinnerBars from '../shadcn-space/spinner/spinner-06';

// ─── Committed message ──────────────────────────────────────────────────────────

type MessageBubbleProps = {
  message: AdvisorChatMessage;
  onFollowUp?: (question: string) => void;
};

export function AdvisorMessageBubble({
  message,
  onFollowUp,
}: MessageBubbleProps) {
  if (message.role === 'user') {
    return (
      <div className="flex justify-end">
        <p className="max-w-[78%] bg-card rounded-4xl px-4 py-3 text-sm">
          {message.content}
        </p>
      </div>
    );
  }

  return (
    <div className="flex gap-3 items-start">
      <div className="flex-1 min-w-0 space-y-3">
        <div className="px-4 py-3">
          <MessageContent content={message.content} />
        </div>

        {/* Cautions */}
        {message.cautions.length > 0 && (
          <div className="space-y-1.5">
            {message.cautions.map((caution, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 rounded-xl px-3 py-2"
              >
                <AlertCircle className="size-3.5 mt-0.5 shrink-0" />
                <span>{caution}</span>
              </div>
            ))}
          </div>
        )}

        {/* Web search resources ← NEW */}
        <AdvisorResources items={message.resources ?? []} />

        {/* Actions */}
        {message.actions.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider px-0.5">
              Next steps
            </p>
            <div className="space-y-1">
              {message.actions.map((action, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 text-xs text-foreground bg-muted/60 border rounded-xl px-3 py-2.5"
                >
                  <ArrowRight className="size-3.5 text-muted-foreground shrink-0" />
                  <span>{action}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Follow-up chips */}
        {message.followUps.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {message.followUps.map((q, i) => (
              <Button
                key={i}
                variant="outline"
                size="sm"
                className="h-auto text-xs font-normal rounded-full px-3 py-1.5 text-left whitespace-normal"
                onClick={() => onFollowUp?.(q)}
              >
                {q}
              </Button>
            ))}
          </div>
        )}

        {/* Context source badges */}
        {message.contextUsed.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {message.contextUsed.map((source) => (
              <ContextBadge key={source} source={source} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Streaming bubble ───────────────────────────────────────────────────────────

type StreamingBubbleProps = {
  content: string;
  searchingQuery: string | null; // ← NEW: shown before text arrives
  resources: { title: string; url: string; content: string; source: string }[];
  error: string | null;
};

export function StreamingBubble({
  content,
  searchingQuery,
  resources,
  error,
}: StreamingBubbleProps) {
  if (error) {
    return (
      <div className="flex gap-3 items-start">
        <div className="bg-destructive/10 border border-destructive/20 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-destructive max-w-[78%]">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 min-w-0 space-y-3">
      <div className="px-4 py-3 text-sm leading-relaxed text-foreground">
        {/* Searching indicator — shown between start and first delta */}
        {searchingQuery && !content && (
          <SearchingIndicator query={searchingQuery} />
        )}

        {content ? (
          <>
            <div className="flex gap-x-1">
              <Lightbulb className="size-4" />
              <p className="flex text-xs self-end mt-1 gap-1">
                Thinking
                <SpinnerBars
                  className="gap-0.5 top-3 h-3"
                  barClassName="w-0.5"
                  heights={['1px', '10px', '1px']}
                />
              </p>
            </div>
            <MessageContent content={content} />
          </>
        ) : !searchingQuery ? (
          // Default loading dots when no search and no content yet
          <SpinnerBars
            className="gap-1 h-3 text-muted-foreground"
            barClassName="w-1"
            heights={['2px', '13px', '2px']}
          />
        ) : null}
      </div>

      {/* Resources appear as soon as search completes, even before text finishes */}
      {resources.length > 0 && <AdvisorResources items={resources} />}
    </div>
  );
}

function MessageContent({ content }: { content: string }) {
  return <Streamdown className="font-heading">{content}</Streamdown>;
}

const contextSourceLabels: Record<string, string> = {
  onboarding: 'Profile',
  recommendations: 'Recs',
  pathway: 'Pathway',
  pathwayKnowledge: 'Knowledge',
  roadmapSetup: 'Setup',
  roadmap: 'Roadmap',
};

function ContextBadge({ source }: { source: string }) {
  return (
    <Badge
      variant="secondary"
      className="text-[10px] px-1.5 py-0 rounded-full font-normal text-muted-foreground"
    >
      {contextSourceLabels[source] ?? source}
    </Badge>
  );
}
