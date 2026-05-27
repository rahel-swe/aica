import RecommendationDetailsCard from '@/components/recommendation-details-card';
import RecommendationDirectionCard from '@/components/recommendation-direction-card';
import RecommendationFamilyStrip from '@/components/recommendation-family-strip';
import SpinnerBars from '@/components/shadcn-space/spinner/spinner-06';
import { useRecommendationQuery } from '@/queries/recommendation-query';

export default function RecommendationPage() {
  const {
    data: recommendations,
    isLoading,
    isError,
  } = useRecommendationQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <SpinnerBars />
      </div>
    );
  }

  if (isError || !recommendations?.data) return <div>Something went wrong</div>;

  const { directionMatches, familyMatches, pathwayRecommendations } =
    recommendations.data;

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
          Review your direction, families, and strongest pathways
        </h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {directionMatches.map((direction) => (
          <RecommendationDirectionCard
            key={direction.slug}
            item={direction}
            // className="shadow-[7px_9px_0px] shadow-primary"
          />
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex justify-start">
          <span className="text-3xl text-center bg-card py-2 px-7 rounded-full">
            Best-fit Families
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {familyMatches.map((item) => (
            <RecommendationFamilyStrip key={item.slug} item={item} />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-start">
          <span className="text-3xl text-center bg-card py-2 px-7 rounded-full">
            Best-fit Pathways
          </span>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {pathwayRecommendations.map((recommendation) => (
            <RecommendationDetailsCard
              key={recommendation.pathwayId}
              item={{ ...recommendation }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
