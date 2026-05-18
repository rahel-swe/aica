import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import SpinnerBars from '@/components/shadcn-space/spinner/spinner-06';
import { Button } from '@/components/ui/button';
import { roadmapSetupDefaultValues } from '@/constants/roadmap-setup-steps';
import { useRecommendationQuery } from '@/queries/recommendation-query';
import { useRoadmapSetupAssessmentSubmitMutation } from '@/queries/roadmap-setup-assessment-queries';
import { usePathwayPickerParams } from '@/hooks/use-picker-pathway-params';
import DirectionStage from '@/components/direction-stage';
import FamilyStage from '@/components/family-stage';
import PathwayStage from '@/components/pathway-stage';

const FINAL_PATHWAY_COUNT = 3;

const PathwayRecommendedPathwaysLayout = () => {
  const {
    data: recommendationsResponse,
    isLoading,
    error,
  } = useRecommendationQuery();
  const { mutate, isPending: isPathwayPicking } =
    useRoadmapSetupAssessmentSubmitMutation();
  const navigate = useNavigate();

  const {
    params,
    isNavigatingBack,
    selectDirection,
    selectFamily,
    selectPathway,
    goToFamily,
    goToPathway,
    goBack,
  } = usePathwayPickerParams();

  if (isLoading)
    return (
      <div className="grid min-h-dvh place-items-center">
        <SpinnerBars />
      </div>
    );

  if (error) return <p className="p-6">{error.message}</p>;

  const recommendationData = recommendationsResponse?.data;

  if (!recommendationData) {
    return (
      <div className="grid min-h-dvh place-items-center p-6">
        <p>No recommendations available yet.</p>
      </div>
    );
  }

  const { directionMatches, familyMatches, pathwayRecommendations } =
    recommendationData;

  const selectedDirection = directionMatches.find(
    (item) => item.slug === params.directionSlug
  );

  const directionFamilies = familyMatches.filter(
    (item) => item.direction.slug === selectedDirection?.slug
  );

  const selectedFamily = directionFamilies.find(
    (item) => item.slug === params.familySlug
  );

  const filteredPathways = (() => {
    const byDirection = selectedDirection
      ? pathwayRecommendations.filter(
          (item) => item.direction?.slug === selectedDirection.slug
        )
      : [];

    const byFamily = selectedFamily
      ? byDirection.filter((item) => item.family?.slug === selectedFamily.slug)
      : byDirection;

    return byFamily.slice(0, FINAL_PATHWAY_COUNT);
  })();

  const selectedPathway = filteredPathways.find(
    (item) => item.slug === params.pathwaySlug
  );

  const handleSubmit = () => {
    mutate(
      {
        ...roadmapSetupDefaultValues,
        pickedPathwayId: selectedPathway!.pathwayId,
      },
      {
        onSuccess: () => {
          navigate('/pathway-congratulations', { viewTransition: true });
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 md:px-8 md:py-10">
      <div className="mx-auto space-y-8 font-heading">
        {isNavigatingBack && (
          <Button
            variant="outline"
            size="lg"
            className="me-auto"
            onClick={goBack}
          >
            <ChevronLeft />
            Back
          </Button>
        )}

        {params.stage === 'direction' && (
          <DirectionStage
            directionMatches={directionMatches}
            selectedDirectionSlug={params.directionSlug}
            onSelectDirection={selectDirection}
            onContinue={goToFamily}
          />
        )}

        {params.stage === 'family' && selectedDirection && (
          <FamilyStage
            selectedDirection={selectedDirection}
            directionFamilies={directionFamilies}
            selectedFamilySlug={params.familySlug}
            onSelectFamily={selectFamily}
            onContinue={goToPathway}
          />
        )}

        {params.stage === 'pathway' && (
          <PathwayStage
            pathways={filteredPathways}
            selectedPathwaySlug={params.pathwaySlug}
            isSubmitting={isPathwayPicking}
            onSelectPathway={selectPathway}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default PathwayRecommendedPathwaysLayout;
