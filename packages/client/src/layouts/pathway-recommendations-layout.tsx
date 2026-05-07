import { useState } from 'react';

import RecommendationCard from '@/components/recommendation-card';
import RecommendationRankedButton from '@/components/recommendation-ranked-button';
import SpinnerBars from '@/components/shadcn-space/spinner/spinner-06';
import { useRecommendationQuery } from '@/queries/recommendation-query';
import { useRoadmapSetupAssessmentSubmitMutation } from '@/queries/roadmap-setup-assessment-queries';
import { useNavigate } from 'react-router-dom';
import { roadmapSetupDefaultValues } from '@/constants/roadmap-setup-steps';

const PathwayRecommendedPathwaysLayout = () => {
  const {
    data: recommendationsResponse,
    isLoading,
    error,
  } = useRecommendationQuery();
  const { mutate, isPending: isPathwayPicking } =
    useRoadmapSetupAssessmentSubmitMutation();
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(0);

  if (isLoading)
    return (
      <div className="grid place-items-center min-h-dvh">
        <SpinnerBars />
      </div>
    );

  if (error) return <p className="p-6">{error.message}</p>;

  const activeItem = recommendationsResponse!.data[activeIndex];

  return (
    <div className="min-h-screen p-8 md:p-10">
      <div className="mx-auto max-w-5xl space-y-6 md:space-y-8">
        <h1 className="text-5xl capitalize text-start text-wrap px-28 font-semibold tracking-tight md:text-6xl sm:text-center">
          Pick your pathway
        </h1>

        <div className="relative flex flex-col gap-6 md:flex-row w-full">
          <div className="flex justify-center gap-3 md:flex-col">
            {recommendationsResponse?.data.map((item, index) => (
              <RecommendationRankedButton
                rank={item.rank!}
                key={item.rank}
                onClick={() => setActiveIndex(index)}
                isActive={activeIndex === index}
              />
            ))}
          </div>

          {/* Active Card */}
          <RecommendationCard
            key={activeItem.pathwayId}
            item={activeItem}
            isPathwayPicking={isPathwayPicking}
            onPickedPathway={(item) => {
              mutate(
                {
                  ...roadmapSetupDefaultValues,
                  pickedPathwayId: item.pathwayId,
                },
                {
                  onSuccess: () => {
                    navigate('/pathway-congratulations', {
                      // replace: true,
                      viewTransition: true,
                    });
                  },
                }
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PathwayRecommendedPathwaysLayout;
