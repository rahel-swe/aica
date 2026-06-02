/* eslint-disable react-hooks/static-components */
import { Badge } from '@/components/ui/badge';
import { CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { AdvisorResponse } from '@contracts/shared/types/advisor-types';
import {
  AlertTriangle,
  CheckCircle2,
  Compass,
  ListChecks,
  MessageCircle,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { ScrollArea } from '../ui/scroll-area';
import AdvisorResponseEmptyState from './advisor-response-empty-state';
import AdvisorResponsePendingState from './advisor-response-pending-state';

type AdvisorResponsePanelProps = {
  response?: AdvisorResponse;
  isPending: boolean;
  onFollowUp: (question: string) => void;
};

export function AdvisorResponsePanel({
  response,
  isPending,
  onFollowUp,
}: AdvisorResponsePanelProps) {
  if (isPending) return <AdvisorResponsePendingState />;

  if (!response) return <AdvisorResponseEmptyState />;

  const actionLabel = getActionLabel(response.mode);
  const ModeIcon = getModeIcon(response.mode);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={response.answer.slice(0, 40)}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="w-full md:h-full md:min-h-0"
      >
        <ScrollArea className="h-full">
          <div className="w-full pb-6">
            <CardHeader className="pb-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="default" className="capitalize">
                  <ModeIcon />
                  {response.mode.replace('_', ' ')}
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {response.source}
                </Badge>
                {response.contextUsed.map((source) => (
                  <Badge
                    key={source}
                    variant="secondary"
                    className="capitalize"
                  >
                    {source}
                  </Badge>
                ))}
              </div>

              <h2 className="mt-3 text-lg font-semibold">{response.title}</h2>
              <p className="mt-3 text-sm leading-7 text-foreground">
                {response.answer}
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              {response.nextActions.length > 0 ? (
                <div className="rounded-xl border bg-muted/50 p-4">
                  <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-foreground">
                    <CheckCircle2 className="size-3.5" />
                    {actionLabel}
                  </div>
                  <ul className="space-y-2">
                    {response.nextActions.map((action, i) => (
                      <li
                        key={action}
                        className="flex gap-2.5 text-sm leading-6 text-foreground"
                      >
                        <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-background text-[10px] font-bold text-muted-foreground">
                          {i + 1}
                        </span>
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {/* Cautions — only when present */}
              {response.cautions.length > 0 ? (
                <div className="rounded-xl border border-border bg-muted/40 p-4">
                  <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-foreground">
                    <AlertTriangle className="size-3.5" />
                    Reality notes
                  </div>
                  <ul className="space-y-1.5">
                    {response.cautions.map((caution) => (
                      <li
                        key={caution}
                        className="text-xs leading-5 text-muted-foreground"
                      >
                        {caution}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {/* Clickable follow-up chips */}
              {response.suggestedFollowUps.length > 0 ? (
                <>
                  <Separator />
                  <div>
                    <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Follow-up
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {response.suggestedFollowUps.map((followUp) => (
                        <button
                          key={followUp}
                          type="button"
                          onClick={() => onFollowUp(followUp)}
                          className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted active:scale-95"
                        >
                          {followUp}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              ) : null}
            </CardContent>
          </div>
        </ScrollArea>
      </motion.div>
    </AnimatePresence>
  );
}

function getActionLabel(mode: AdvisorResponse['mode']) {
  if (mode === 'decide') return 'Decision moves';
  if (mode === 'guide_step') return 'Do next';
  if (mode === 'adjust') return 'Adjusted plan';
  if (mode === 'verify') return 'What to verify';
  if (mode === 'reflect') return 'Reflection steps';
  return 'Next';
}

function getModeIcon(mode: AdvisorResponse['mode']) {
  if (mode === 'decide') return Compass;
  if (mode === 'guide_step') return ListChecks;
  if (mode === 'adjust') return CheckCircle2;
  if (mode === 'verify') return AlertTriangle;
  return MessageCircle;
}
