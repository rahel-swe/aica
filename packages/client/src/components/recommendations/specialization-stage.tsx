import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import type { PathwayRecommendation } from '@contracts/shared/schemas/recommendation-schema';
import { usePathwayDetailQuery } from '@/queries/pathway-query';
import { formatSlug } from '@/lib/slug-formatter';
import PathwayDetailPanel from '@/components/recommendations/pathway-detail-panel';
import RecommendationExplanationPanel from '@/components/recommendations/recommendation-explanation-panel';

type Props = {
  /** Top specializations for the selected direction (pre-sorted by rank, max 5) */
  pathways: PathwayRecommendation[];
  selectedPathwaySlug: string;
  directionName: string;
  onSelectPathway: (slug: string) => void;
  /**
   * Submits with the pathway document's MongoDB _id (from PathwayDetailView.id).
   * The component resolves this id from the fetched detail.
   */
  onSubmit: (pathwayId: string) => void;
  isSubmitting: boolean;
};

const SpecializationStage = ({
  pathways,
  selectedPathwaySlug,
  directionName,
  onSelectPathway,
  onSubmit,
  isSubmitting,
}: Props) => {
  const selectedRec = pathways.find(
    (p) => p.pathwaySlug === selectedPathwaySlug
  );

  // NOTE: passes slug — assumes backend /pathways/:slug route.
  const { data: pathwayResponse, isLoading: isDetailLoading } =
    usePathwayDetailQuery(selectedPathwaySlug);

  const pathwayDetail = pathwayResponse?.data;

  const handleSubmit = () => {
    if (pathwayDetail) onSubmit(pathwayDetail.slug);
  };

  return (
    <section className="space-y-12">
      {/* Stage header */}
      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Step 3 of 3
        </p>
        <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
          Your exact path.
        </h1>
        <p className="max-w-lg text-base text-muted-foreground md:text-lg">
          Specializations within{' '}
          <span className="font-medium text-foreground">{directionName}</span>,
          scored to your profile.
        </p>
      </div>

      {/* Picker buttons — show rank badge inline */}
      <div className="flex flex-wrap gap-3">
        {pathways.map((pw, i) => {
          const isSelected = selectedPathwaySlug === pw.pathwaySlug;
          return (
            <Button
              key={pw.pathwaySlug}
              onClick={() => onSelectPathway(pw.pathwaySlug)}
              className={cn(
                'gap-2 px-4 py-6 font-medium transition-all duration-150'
              )}
              variant={isSelected ? 'default' : 'outline'}
            >
              {/* Rank number */}
              <span className={cn('font-bold text-[10px]')}>#{i + 1}</span>

              {pw.pathwayName ?? formatSlug(pw.pathwaySlug)}

              {/* Match % */}
              <span className={cn('tabular-nums text-sm font-semibold')}>
                {pw.matchPercent}%
              </span>
            </Button>
          );
        })}
      </div>

      {/* Hint when nothing selected */}
      {!selectedRec && (
        <p className="text-sm text-muted-foreground">
          Select a specialization above to see the full breakdown.
        </p>
      )}

      {/* Full detail panel */}
      {selectedRec && (
        <div className="animate-in fade-in-0 slide-in-from-bottom-2 space-y-10 duration-300">
          <Separator />

          {/* Loading */}
          {isDetailLoading && (
            <div className="flex items-center gap-2.5 py-4 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
              Loading specialization details…
            </div>
          )}

          {/* Full pathway detail — description, journey phases, opportunities all visible */}
          {pathwayDetail && !isDetailLoading && (
            <>
              <PathwayDetailPanel
                detail={pathwayDetail}
                matchPercent={selectedRec.matchPercent}
                reasons={selectedRec.reasons}
                compact={false}
              />

              <Separator />

              {/* On-demand LLM explanation */}
              <RecommendationExplanationPanel
                recommendationId={selectedRec.id}
                pathwayTitle={pathwayDetail.title}
                isCached={selectedRec.hasExplanation}
              />

              {/* Final submit */}
              <div className="pt-4">
                <Button
                  className="px-8 py-7"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Locking in your path…
                    </>
                  ) : (
                    `Choose ${pathwayDetail.title}`
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default SpecializationStage;
