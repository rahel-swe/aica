import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, CheckCircle2, Lightbulb, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { AdvisorResponse } from '@contracts/shared/types/advisor-types';
import { AdvisorEmptyState } from './advisor-empty-state';

type AdvisorResponsePanelProps = {
  response?: AdvisorResponse;
  isPending: boolean;
};

export function AdvisorResponsePanel({
  response,
  isPending,
}: AdvisorResponsePanelProps) {
  if (isPending) {
    return (
      <Card className="rounded-[2rem] border-blue-200 bg-blue-100/70 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-950">
            <Sparkles className="size-5 animate-pulse" />
            Advisor is reading your AICA context
          </CardTitle>
          <CardDescription className="text-blue-950/75">
            The response is being shaped around pathway fit, roadmap, and
            recommendation data.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!response) {
    return <AdvisorEmptyState />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${response.intent}-${response.title}`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <Card className="rounded-[2rem] border-emerald-200 bg-white/85 shadow-sm">
          <CardHeader>
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="h-7 border-emerald-300 bg-emerald-200 px-3 text-emerald-950">
                {response.intent}
              </Badge>
              {response.contextUsed.map((source) => (
                <Badge
                  key={source}
                  className="h-7 border-slate-300 bg-slate-100 px-3 text-slate-700"
                >
                  {source}
                </Badge>
              ))}
            </div>
            <CardTitle className="mt-3 text-2xl text-slate-950">
              {response.title}
            </CardTitle>
            <CardDescription className="text-base leading-7 text-slate-700">
              {response.directAnswer}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <section className="rounded-3xl bg-blue-100/80 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-950">
                <Lightbulb className="size-4" />
                What this means
              </div>
              <p className="text-sm leading-6 text-blue-950/80">
                {response.meaning}
              </p>
            </section>

            <section className="rounded-3xl bg-yellow-100/90 p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-yellow-950">
                <CheckCircle2 className="size-4" />
                What to do next
              </div>
              <ul className="space-y-2 text-sm leading-6 text-yellow-950/85">
                {response.nextActions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ul>
            </section>

            {response.cautions.length > 0 ? (
              <section className="rounded-3xl bg-orange-100/80 p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-orange-950">
                  <AlertTriangle className="size-4" />
                  Reality notes
                </div>
                <ul className="space-y-2 text-sm leading-6 text-orange-950/85">
                  {response.cautions.map((caution) => (
                    <li key={caution}>{caution}</li>
                  ))}
                </ul>
              </section>
            ) : null}

            {response.suggestedFollowUps.length > 0 ? (
              <>
                <Separator />
                <div>
                  <p className="text-sm font-semibold text-slate-950">
                    Useful follow-ups
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {response.suggestedFollowUps.map((followUp) => (
                      <Badge
                        key={followUp}
                        className="h-auto border-green-300 bg-green-100 px-3 py-1.5 text-green-950"
                      >
                        {followUp}
                      </Badge>
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
