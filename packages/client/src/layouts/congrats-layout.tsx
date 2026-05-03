import RecommendationCard from '@/components/recommendation-card';
import { useRecommendationQuery } from '@/queries/recommendation-query';

const CongratsLayout = () => {
  const { data, isLoading, isError } = useRecommendationQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  return (
    <div className="min-h-screen p-6 space-y-6">
      <h1 className="text-2xl font-bold"> Congrats!</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {data?.data.map((item) => (
          <RecommendationCard
            key={item.pathwayId}
            item={item}
            onView={(i) => console.log('view', i)}
          />
        ))}
      </div>
    </div>
  );
};

export default CongratsLayout;
