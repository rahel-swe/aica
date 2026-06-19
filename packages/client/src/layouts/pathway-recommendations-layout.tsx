import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import ErrorState from '@/components/error-state';
import DomainStage from '@/components/recommendations/domain-stage';
import FieldStage from '@/components/recommendations/field-stage';
import SpecializationStage from '@/components/recommendations/specialization-stage';
import SpinnerBars from '@/components/shadcn-space/spinner/spinner-06';

import NavigationBackButton from '@/components/navigation-back-button';
import { roadmapSetupDefaultValues } from '@/constants/roadmap-setup-assessment-data';
import { formatSlug } from '@/lib/slug-formatter';
import { usePathwayPickerParams } from '@/params/use-picker-pathway-params';
import { useProfileStatusQuery } from '@/queries/profile-query';
import { useRecommendationQuery } from '@/queries/recommendation-query';
import { useRoadmapSetupAssessmentSubmitMutation } from '@/queries/roadmap-setup-assessment-queries';
import { m } from '../paraglide/messages';
import {
  DOMAIN_ICONS,
  type DomainSlug,
} from '@/constants/recommendation-ui-data';

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

  console.log(data);

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

  const { domains, pathways } = data;

  // Directions are embedded inside FamilyRecommendation — no extra filter needed
  const selectedFamily = domains.find(
    (f) => f.domainSlug === params.domainSlug
  );
  const directionsForFamily = selectedFamily?.fields ?? [];

  const Icon = DOMAIN_ICONS[params.domainSlug as DomainSlug];

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
    <div className="min-h-dvh px-4 py-10 md:px-8 md:py-16 relative">
      {params.domainSlug && (
        <Icon className="pointer-events-none absolute size-60 scale-180 opacity-10 inset-e-[25%] top-40 z-0" />
      )}

      <div className="mx-auto max-w-4xl space-y-12 relative z-10">
        {/* Back button — hidden on Stage 1 */}
        {isNavigatingBack && (
          <NavigationBackButton
            onClick={goBack}
            title={m.common_back()}
            className="group -ml-2 gap-1"
          />
        )}

        {/* Stage 1 — pick a domain */}
        {params.stage === 'domain' && (
          <DomainStage
            domains={domains}
            selectedDomainSlug={params.domainSlug}
            onSelectDomain={selectDomain}
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
