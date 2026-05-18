import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import GetStartedButton from '@/components/get-started-button';
import RecommendationCard from '@/components/recommendation-card';
import RecommendationDirectionCard from '@/components/recommendation-direction-card';
import RecommendationFamilyCard from '@/components/recommendation-family-card';
import SpinnerBars from '@/components/shadcn-space/spinner/spinner-06';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useRecommendationQuery } from '@/queries/recommendation-query';
import { useRoadmapSetupAssessmentSubmitMutation } from '@/queries/roadmap-setup-assessment-queries';
import { roadmapSetupDefaultValues } from '@/constants/roadmap-setup-steps';

type ViewStage = 'direction' | 'family' | 'pathway';

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

  const [stage, setStage] = useState<ViewStage>('direction');
  const [selectedDirectionSlug, setSelectedDirectionSlug] = useState<
    string | null
  >(null);
  const [selectedFamilySlug, setSelectedFamilySlug] = useState<string | null>(
    null
  );
  const [selectedPathwaySlug, setSelectedPathwaySlug] = useState<string | null>(
    null
  );

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
    (item) => item.slug === selectedDirectionSlug
  );
  const directionFamilies = familyMatches.filter(
    (item) => item.direction.slug === selectedDirection?.slug
  );

  const selectedFamily = directionFamilies.find(
    (item) => item.slug === selectedFamilySlug
  );

  const directionPathways = pathwayRecommendations.filter(
    (item) => item.direction!.slug === selectedDirection?.slug
  );

  const selectedPathway = directionPathways.find(
    (item) => item.slug === selectedPathwaySlug
  );

  const filteredPathways = () => {
    const byDirection = selectedDirection
      ? pathwayRecommendations.filter(
          (item) => item.direction?.slug === selectedDirection.slug
        )
      : [];

    const byFamily = selectedFamily
      ? byDirection.filter((item) => item.family?.slug === selectedFamily.slug)
      : byDirection;

    return byFamily.slice(0, FINAL_PATHWAY_COUNT);
  };

  const handleBack = () => {
    if (stage === 'pathway') {
      setStage('family');
      return;
    }

    if (stage === 'family') {
      setSelectedFamilySlug(null);
      setStage('direction');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 md:px-8 md:py-10">
      <div className="mx-auto space-y-8 font-heading">
        {(selectedDirection || selectedFamily) && (
          <Button
            variant="outline"
            size={'lg'}
            className="me-auto"
            onClick={handleBack}
          >
            <ChevronLeft />
            Back
          </Button>
        )}

        {stage === 'direction' ? (
          <section className="space-y-10 my-auto">
            <h1 className="text-5xl font-semibold tracking-tight md:text-6xl text-center">
              Follow your direction!
            </h1>

            <div className="grid gap-6 lg:grid-cols-3">
              {directionMatches.map((item, index) => (
                <RecommendationDirectionCard
                  key={item.slug}
                  item={item}
                  index={index}
                  className={cn(
                    ' rounded-[2rem]',
                    selectedDirectionSlug === item.slug
                      ? 'border border-gray-900/70 shadow-[8px_10px_0px] shadow-white'
                      : ''
                  )}
                  onTapCard={() => {
                    setSelectedDirectionSlug(item.slug);
                  }}
                />
              ))}
            </div>
            <GetStartedButton
              shouldDisable={false}
              onButtonClicked={() => {
                setSelectedFamilySlug(null);
                setStage('family');
              }}
              className="mx-auto flex"
            />
          </section>
        ) : null}

        {stage === 'family' ? (
          <section className="space-y-10">
            <h2 className="mx-auto text-4xl md:text-6xl text-center font-semibold">
              Pick the family inside {selectedDirection?.title}
            </h2>

            <div className="flex flex-wrap gap-6 items-center justify-center">
              {directionFamilies.map((item, index) => (
                <RecommendationFamilyCard
                  key={item.slug}
                  index={index}
                  item={item}
                  className={cn(
                    'w-full sm:max-w-max',
                    selectedFamilySlug === item.slug
                      ? 'border border-gray-900/70 shadow-[8px_10px_0px] shadow-white'
                      : ''
                  )}
                  onTapCard={() => {
                    setSelectedFamilySlug(item.slug);
                    console.log(filteredPathways);
                  }}
                />
              ))}
            </div>

            <GetStartedButton
              shouldDisable={false}
              onButtonClicked={() => {
                setStage('pathway');
              }}
              className="mx-auto flex"
            />
          </section>
        ) : null}

        {stage === 'pathway' ? (
          <section className="space-y-10">
            <h2 className="mx-auto text-4xl md:text-6xl text-center font-semibold">
              Pick your pathway
            </h2>

            <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3 items-start">
              {filteredPathways().map((item, index) => (
                <RecommendationCard
                  key={item.pathwayId}
                  className={cn(
                    selectedPathwaySlug === item.slug
                      ? 'border border-gray-900/70 shadow-[8px_10px_0px] shadow-white'
                      : ''
                  )}
                  item={{
                    ...item,
                    rank: index + 1,
                  }}
                  onTapCard={() => {
                    setSelectedPathwaySlug(item.slug);
                  }}
                />
              ))}
            </div>
            <GetStartedButton
              shouldDisable={isPathwayPicking}
              onButtonClicked={() => {
                mutate(
                  {
                    ...roadmapSetupDefaultValues,
                    pickedPathwayId: selectedPathway!.pathwayId,
                  },
                  {
                    onSuccess: () => {
                      navigate('/pathway-congratulations', {
                        viewTransition: true,
                      });
                    },
                  }
                );
              }}
              className="mx-auto flex"
            />
          </section>
        ) : null}
      </div>
    </div>
  );
};

export default PathwayRecommendedPathwaysLayout;
