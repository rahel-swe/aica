import { useState } from 'react';
import { Loader, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useExplanationQuery } from '@/queries/recommendation-query';

type Props = {
  /** PathwayRecommendation.id — the recommendation document _id, used by GET /recommendations/:id/explanation */
  recommendationId: string;
  pathwayTitle: string;
  /** Pass true when PathwayRecommendation.hasExplanation is true — shows a hint that it's already cached */
  isCached?: boolean;
};

const RecommendationExplanationPanel = ({
  recommendationId,
  pathwayTitle,
  isCached = false,
}: Props) => {
  const [triggered, setTriggered] = useState(false);

  // Enabled only after user clicks — staleTime:Infinity means a second click
  // hits the RQ cache, not the network (the DB also caches, but no point hitting it twice).
  const { data, isPending, isError } = useExplanationQuery(
    recommendationId,
    triggered
  );

  const explanation = data?.data.explanation;

  if (!triggered) {
    return (
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="gap-2 py-6 px-5"
          onClick={() => setTriggered(true)}
        >
          <Sparkles className="size-3.5" />
          Why {pathwayTitle}?
        </Button>
        {isCached && (
          <span className="text-xs text-muted-foreground">
            Explanation ready
          </span>
        )}
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
        <Loader className="size-3.5 animate-spin" />
        Generating your match explanation…
      </div>
    );
  }

  if (isError || !explanation)
    return (
      <p className="text-sm text-muted-foreground">
        Couldn't generate explanation right now.{' '}
        <button
          className="underline underline-offset-2 hover:text-foreground transition-colors"
          onClick={() => setTriggered(false)}
        >
          Try again
        </button>
      </p>
    );

  return (
    <div className="space-y-3">
      <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground">
        <Sparkles className="size-3" />
        Why this matches you
      </p>
      <p className="max-w-2xl border-l-2 border-foreground/20 pl-4 text-sm leading-relaxed text-muted-foreground">
        {explanation}
      </p>
    </div>
  );
};

export default RecommendationExplanationPanel;
