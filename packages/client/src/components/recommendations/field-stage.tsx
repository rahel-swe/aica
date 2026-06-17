import { ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import type {
  FieldRecommendation,
  PathwayRecommendation,
} from '@contracts/shared/schemas/recommendation-schema';
import { usePathwayDetailQuery } from '@/queries/pathway-query';
import { formatSlug } from '@/lib/slug-formatter';
import PathwayDetailPanel from '@/components/recommendations/pathway-detail-panel';
import RecommendationExplanationPanel from '@/components/recommendations/recommendation-explanation-panel';

type Props = {
  fields: FieldRecommendation[];
  /** Full pathways array — used to look up recommendation metadata for the top pathway */
  allPathways: PathwayRecommendation[];
  selectedFieldSlug: string;
  domainName: string;
  onSelectDirection: (slug: string) => void;
  /**
   * User chose "Start in this field" — submit with the top pathway's document id.
   * The component resolves the id from the fetched PathwayDetailView.
   */
  onStartHere: (pathwayId: string) => void;
  onExploreDeeper: () => void;
  isSubmitting: boolean;
};

const FieldStage = ({
  fields,
  allPathways,
  selectedFieldSlug,
  domainName,
  onSelectDirection,
  onStartHere,
  onExploreDeeper,
  isSubmitting,
}: Props) => {
  const selectedDirection = fields.find(
    (d) => d.fieldSlug === selectedFieldSlug
  );

  // Top pathway slug for the selected direction
  const topSlug = selectedDirection?.topPathwaySlugs[0];

  const { data: pathwayResponse, isLoading: isDetailLoading } =
    usePathwayDetailQuery(selectedDirection?.fieldSlug ?? '');

  const pathwayDetail = pathwayResponse?.data;

  // Match recommendation metadata for the top pathway (reasons[], id for explanation)
  const topRec = allPathways.find((p) => p.pathwaySlug === topSlug);

  const handleStartHere = () => {
    if (pathwayDetail) onStartHere(pathwayDetail.slug);
  };

  return (
    <section className="space-y-12">
      {/* Stage header */}
      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Step 2 of 3
        </p>
        <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
          Narrow the focus.
        </h1>
        <p className="max-w-lg text-base text-muted-foreground md:text-lg">
          Fields within{' '}
          <span className="font-medium text-foreground">{domainName}</span>,
          ranked by how well they match you.
        </p>
      </div>

      {/* Picker buttons */}
      <div className="flex flex-wrap gap-3">
        {fields.map((dir) => {
          const isSelected = selectedFieldSlug === dir.fieldSlug;
          return (
            <button
              key={dir.fieldSlug}
              onClick={() => {
                onSelectDirection(dir.fieldSlug);
                console.log(dir);
              }}
              className={cn(
                'flex items-center gap-3 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                isSelected
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border bg-background text-foreground hover:border-foreground/40'
              )}
            >
              {formatSlug(dir.fieldSlug)}
              <span
                className={cn(
                  'tabular-nums text-xs font-semibold',
                  isSelected ? 'text-background/60' : 'text-muted-foreground'
                )}
              >
                {dir.matchPercent}%
              </span>
            </button>
          );
        })}
      </div>

      {/* Hint when nothing selected */}
      {!selectedDirection && (
        <p className="text-sm text-muted-foreground">
          Select a field above to see the breakdown.
        </p>
      )}

      {/* Detail panel + CTAs */}
      {selectedDirection && (
        <div className="animate-in fade-in-0 slide-in-from-bottom-2 space-y-10 duration-300">
          <Separator />

          {/* Loading state */}
          {isDetailLoading && (
            <div className="flex items-center gap-2.5 py-4 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
              Loading field details…
            </div>
          )}

          {/* Pathway detail (compact preview — description/journey/opportunities hidden) */}
          {pathwayDetail && !isDetailLoading && (
            <>
              <PathwayDetailPanel
                detail={pathwayDetail}
                matchPercent={selectedDirection.matchPercent}
                reasons={topRec?.reasons}
                compact
              />

              {/* Why? — uses the recommendation id, not the pathway id */}
              {topRec && (
                <>
                  <Separator />
                  <RecommendationExplanationPanel
                    recommendationId={topRec.id}
                    pathwayTitle={pathwayDetail.title}
                    isCached={topRec.hasExplanation}
                  />
                </>
              )}
            </>
          )}

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              size="lg"
              onClick={handleStartHere}
              disabled={isSubmitting || !pathwayDetail}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Starting…
                </>
              ) : (
                `Start in ${formatSlug(selectedFieldSlug)}`
              )}
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="group gap-2"
              disabled={!selectedFieldSlug}
              onClick={onExploreDeeper}
            >
              Pick a specialization
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            "Start in {formatSlug(selectedFieldSlug)}" picks your
            highest-matching specialization automatically. You can always refine
            later.
          </p>
        </div>
      )}
    </section>
  );
};

export default FieldStage;
