import RecommendationDetailsCard from '@/components/recommendation-details-card';
import SpinnerBars from '@/components/shadcn-space/spinner/spinner-06';

import { useRecommendationQuery } from '@/queries/recommendation-query';
import type { RecommendationResult } from '@contracts/shared/types/pathway-domain-types';

export default function RecommendationPage() {
  const {
    data: recommendations,
    isLoading,
    isError,
  } = useRecommendationQuery();

  const handlePickedPathway = (item: RecommendationResult) => {
    console.log('picked:', item);
  };
  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <SpinnerBars />
      </div>
    );
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {recommendations?.data?.map((recommendation) => (
        <RecommendationDetailsCard
          key={recommendation.pathwayId}
          item={recommendation}
          onPickedPathway={handlePickedPathway}
          isPathwayPicking={false}
        />
      ))}
    </div>
  );
}
