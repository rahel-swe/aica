import { useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import SpinnerBars from '@/components/shadcn-space/spinner/spinner-06';
import ErrorState from '@/components/error-state';
import FamilyStage from '@/components/recommendations/family-stage';
import DirectionStage from '@/components/recommendations/direction-stage';
import PathwayStage from '@/components/recommendations/pathway-stage';

import { useRecommendationQuery } from '@/queries/recommendation-query';
import { useProfileStatusQuery } from '@/queries/profile-query';
import { useRoadmapSetupAssessmentSubmitMutation } from '@/queries/roadmap-setup-assessment-queries';
import { usePathwayPickerParams } from '@/params/use-picker-pathway-params';
import { roadmapSetupDefaultValues } from '@/constants/roadmap-setup-assessment-data';
import { formatSlug } from '@/lib/slug-formatter';

/**
 * PathwayRecommendationsLayout
 *
 * Orchestrator only — owns data fetching, auth redirects, and submit mutation.
 * All UI and stage-level data concerns live in the three stage components.
 *
 * Data architecture:
 *   RecommendationOverview.families   → FamilyStage    (Layer 1 — domain)
 *   FamilyRecommendation.directions   → DirectionStage (Layer 2 — field)
 *   RecommendationOverview.pathways   → PathwayStage   (Layer 3 — specialization)
 *
 * Submit:
 *   pickedPathwayId = PathwayDetailView.id (pathway document _id)
 *   resolved inside DirectionStage / PathwayStage from the fetched pathway detail.
 */
const PathwayRecommendationsLayout = () => {
  const navigate = useNavigate();

  const {
    data: recResponse,
    isPending: isRecPending,
    error,
    refetch,
  } = useRecommendationQuery();

  const { data: profileStatus, isPending: isProfilePending } =
    useProfileStatusQuery();

  const {
    mutate,
    isPending: isSubmitting,
    isSuccess: isSubmitted,
  } = useRoadmapSetupAssessmentSubmitMutation();

  const {
    params,
    isNavigatingBack,
    selectFamily,
    selectDirection,
    selectPathway,
    goToDirection,
    goToPathway,
    goBack,
  } = usePathwayPickerParams();

  useEffect(() => {
    if (isSubmitted)
      navigate('/pathway-congratulations', { viewTransition: true });
  }, [isSubmitted, navigate]);

  // ── Loading ──────────────────────────────────────────────────────────────

  if (isProfilePending || isRecPending) {
    return (
      <div className="grid min-h-dvh place-items-center">
        <SpinnerBars />
      </div>
    );
  }

  // ── Auth guard ───────────────────────────────────────────────────────────

  if (!profileStatus?.data.assessments.pathwayAssessmentCompleted) {
    return <Navigate to="/pathway-assessment" />;
  }

  // ── Error ────────────────────────────────────────────────────────────────

  if (error) {
    return (
      <ErrorState
        onRetry={refetch}
        title="Couldn't load recommendations"
        message={error.message}
      />
    );
  }

  // ── Empty state ──────────────────────────────────────────────────────────

  const data = recResponse?.data;

  if (!data || data.families.length === 0) {
    return (
      <div className="grid min-h-dvh place-items-center p-6 text-center">
        <div className="space-y-2">
          <p className="text-lg font-medium">No recommendations yet.</p>
          <p className="text-sm text-muted-foreground">
            Complete your pathway assessment to unlock matches.
          </p>
        </div>
      </div>
    );
  }

  // ── Derived stage data ───────────────────────────────────────────────────

  const { families, pathways } = data;

  // Directions are embedded inside FamilyRecommendation — no extra filter needed
  const selectedFamily = families.find(
    (f) => f.familySlug === params.familySlug
  );
  const directionsForFamily = selectedFamily?.directions ?? [];

  // Pathways for the selected direction, ranked ascending, capped at 5
  const pathwaysForDirection = pathways
    .filter((p) => p.directionSlug === params.directionSlug)
    .sort((a, b) => a.rank - b.rank)
    .slice(0, 5);

  // ── Submit handler ───────────────────────────────────────────────────────

  // pathwayId = PathwayDetailView.id (MongoDB _id of pathway document)
  // Resolved inside DirectionStage / PathwayStage from the fetched PathwayDetailView.
  const handleSubmit = (pathwayId: string) => {
    mutate({ ...roadmapSetupDefaultValues, pickedPathwayId: pathwayId });
  };

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="min-h-dvh px-4 py-10 md:px-8 md:py-16">
      <div className="mx-auto max-w-4xl space-y-12">
        {/* Back button — hidden on Stage 1 */}
        {isNavigatingBack && (
          <Button
            variant="ghost"
            size="sm"
            onClick={goBack}
            className="group -ml-2 gap-1"
          >
            <ChevronLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            Back
          </Button>
        )}

        {/* Stage 1 — pick a domain */}
        {params.stage === 'family' && (
          <FamilyStage
            families={families}
            selectedFamilySlug={params.familySlug}
            onSelectFamily={selectFamily}
            onContinue={goToDirection}
          />
        )}

        {/* Stage 2 — pick a field within the selected domain */}
        {params.stage === 'direction' && selectedFamily && (
          <DirectionStage
            directions={directionsForFamily}
            allPathways={pathways}
            selectedDirectionSlug={params.directionSlug}
            familyName={formatSlug(params.familySlug)}
            onSelectDirection={selectDirection}
            onStartHere={handleSubmit}
            onExploreDeeper={goToPathway}
            isSubmitting={isSubmitting}
          />
        )}

        {/* Stage 3 — pick a specialization within the selected field */}
        {params.stage === 'pathway' && (
          <PathwayStage
            pathways={pathwaysForDirection}
            selectedPathwaySlug={params.pathwaySlug}
            directionName={formatSlug(params.directionSlug)}
            onSelectPathway={selectPathway}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
};

export default PathwayRecommendationsLayout;
