import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { AdvisorResponse } from '@contracts/shared/types/advisor-types';

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
  if (isPending) {
    return (
      <Card className="rounded-2xl  bg-card shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2.5 text-sm font-medium text-foreground">
            <Loader2 className="size-4 animate-spin text-muted-foreground" />
            Reading your AICA context…
          </div>
          <p className="text-xs leading-5 text-muted-foreground">
            Response is shaped around your pathway, roadmap, and
            recommendations.
          </p>
        </CardHeader>
      </Card>
    );
  }

  if (!response)
    return (
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="flex flex-col gap-4 text-center sm:justify-between"
      >
        <h1 className="text-4xl font-semibold tracking-tight text-foreground">
          Pathway &amp; roadmap guidance
        </h1>
      </motion.header>
    );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={response.answer.slice(0, 40)}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      >
        <Card className="rounded-2xl bg-card shadow-sm">
          <CardHeader className="pb-4">
            {/* Intent badge + context source pills */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="default" className="capitalize">
                {response.intent}
              </Badge>
              {response.contextUsed.map((source) => (
                <Badge key={source} variant="secondary" className="capitalize">
                  {source}
                </Badge>
              ))}
            </div>

            {/* Main answer */}
            <p className="mt-3 text-sm leading-7 text-foreground">
              {response.answer}
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Next actions */}
            <div className="rounded-xl bg-muted p-4">
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-foreground">
                <CheckCircle2 className="size-3.5" />
                What to do next
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
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
