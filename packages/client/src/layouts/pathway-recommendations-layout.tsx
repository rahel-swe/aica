import { useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import SpinnerBars from '@/components/shadcn-space/spinner/spinner-06';
import ErrorState from '@/components/error-state';
import DomainStage from '@/components/recommendations/domain-stage';
import FieldStage from '@/components/recommendations/field-stage';
import SpecializationStage from '@/components/recommendations/specialization-stage';

import { useRecommendationQuery } from '@/queries/recommendation-query';
import { useProfileStatusQuery } from '@/queries/profile-query';
import { useRoadmapSetupAssessmentSubmitMutation } from '@/queries/roadmap-setup-assessment-queries';
import { usePathwayPickerParams } from '@/params/use-picker-pathway-params';
import { roadmapSetupDefaultValues } from '@/constants/roadmap-setup-assessment-data';
import { formatSlug } from '@/lib/slug-formatter';

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
    selectDomain,
    selectField,
    selectSpecialization,
    goToField,
    goToSpecialization,
    goBack,
  } = usePathwayPickerParams();

  useEffect(() => {}, [isSubmitted, navigate]);

  // ── Loading───────

  if (isProfilePending || isRecPending) {
    return (
      <div className="grid min-h-dvh place-items-center">
        <SpinnerBars />
      </div>
    );
  }

  // ── Auth guard────

  if (!profileStatus?.data.assessments.pathwayAssessmentCompleted) {
    return <Navigate to="/pathway-assessment" />;
  }

  // ── Error─────────

  if (error) {
    return (
      <ErrorState
        onRetry={refetch}
        title="Couldn't load recommendations"
        message={error.message}
      />
    );
  }

  // ── Empty state───

  const data = recResponse?.data;

  if (!data || data.domains.length === 0) {
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

  const { domains: families, pathways } = data;

  // Directions are embedded inside FamilyRecommendation — no extra filter needed
  const selectedFamily = families.find(
    (f) => f.domainSlug === params.domainSlug
  );
  const directionsForFamily = selectedFamily?.fields ?? [];

  // Pathways for the selected direction, ranked ascending, capped at 5
  const pathwaysForDirection = pathways
    .filter((p) => p.fieldSlug === params.fieldSlug)
    .sort((a, b) => a.rank - b.rank)
    .slice(0, 7);

  // ── Submit handler

  const handleSubmit = (pathwaySlug: string) => {
    mutate({ ...roadmapSetupDefaultValues, pickedPathwaySlug: pathwaySlug });
    navigate('/pathway-congratulations', { viewTransition: true });
  };

  // ── Render

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
        {params.stage === 'domain' && (
          <DomainStage
            families={families}
            selectedFamilySlug={params.domainSlug}
            onSelectFamily={selectDomain}
            onContinue={goToField}
          />
        )}

        {/* Stage 2 — pick a field within the selected domain or continue with field */}
        {params.stage === 'field' && selectedFamily && (
          <FieldStage
            fields={directionsForFamily}
            allPathways={pathways}
            selectedFieldSlug={params.fieldSlug}
            domainName={formatSlug(params.domainSlug)}
            onSelectDirection={selectField}
            onStartHere={handleSubmit}
            onExploreDeeper={goToSpecialization}
            isSubmitting={isSubmitting}
          />
        )}

        {params.stage === 'specialization' && (
          <SpecializationStage
            pathways={pathwaysForDirection}
            selectedPathwaySlug={params.specializationSlug}
            directionName={formatSlug(params.fieldSlug)}
            onSelectPathway={selectSpecialization}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
};

export default PathwayRecommendationsLayout;
