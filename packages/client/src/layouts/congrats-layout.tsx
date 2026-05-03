import { useMemo, useState } from 'react';

import RecommendationCard from '@/components/recommendation-card';
import { Button } from '@/components/ui/button';
import { rankedBadgeColor } from '@/constants/recommendation-constant';
import { cn } from '@/lib/utils';
import { useRecommendationQuery } from '@/queries/recommendation-query';

const RecommendedPathwaysLayout = () => {
  const { data, isLoading, error } = useRecommendationQuery();

  const topThree = useMemo(() => {
    const items = data?.data ?? [];
    return [...items]
      .sort((a, b) => a.rank! - b.rank! || b.totalScore - a.totalScore)
      .slice(0, 3);
  }, [data]);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = topThree[activeIndex];

  if (isLoading) return <p className="p-6">Loading...</p>;

  if (error) return <p className="p-6">{error.message}</p>;

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/30 p-8 md:p-10">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Header */}
        <h1 className="text-5xl capitalize text-start text-wrap px-28 font-semibold tracking-tight md:text-6xl sm:text-center">
          Pick your pathway
        </h1>

        {/* Ranking Selector */}
        <div className="flex justify-center gap-3">
          {topThree.map((item, index) => (
            <Button
              key={item.pathwayId}
              size={'lg'}
              onClick={() => setActiveIndex(index)}
              variant={'outline'}
              className={cn(
                'relative font-semibold text-lg transition-all py-5 px-5',
                rankedBadgeColor[index],
                activeIndex === index &&
                  'bg-background dark:bg-background dark:text-white'
              )}
            >
              #{item.rank}
            </Button>
          ))}
        </div>

        {/* Active Card */}
        <div className="relative">
          <RecommendationCard key={activeItem.pathwayId} item={activeItem} />
        </div>
      </div>
    </div>
  );
};

export default RecommendedPathwaysLayout;
