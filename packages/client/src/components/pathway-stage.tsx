import GetStartedButton from '@/components/get-started-button';
import PathwayRecommendationCard from '@/components/pathway-recommendation-card';
import { cn } from '@/lib/utils';
import type { RecommendationResult } from '@contracts/shared/types/pathway-domain-types';

type Props = {
  pathways: RecommendationResult[];
  selectedPathwaySlug: string;
  isSubmitting: boolean;
  onSelectPathway: (slug: string) => void;
  onSubmit: () => void;
};

const PathwayStage = ({
  pathways,
  selectedPathwaySlug,
  isSubmitting,
  onSelectPathway,
  onSubmit,
}: Props) => (
  <section className="space-y-10">
    <h2 className="mx-auto text-4xl md:text-6xl text-center font-semibold">
      Pick your pathway
    </h2>

    <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3 items-start">
      {pathways.map((item, index) => (
        <PathwayRecommendationCard
          key={item.pathwayId}
          className={cn(
            'border border-gray-200/75  dark:border-gray-950/75',
            selectedPathwaySlug === item.slug &&
              'shadow-[8px_10px_0px] shadow-primary'
          )}
          item={{ ...item, rank: index + 1 }}
          onTapCard={() => onSelectPathway(item.slug)}
        />
      ))}
    </div>

    <GetStartedButton
      shouldDisable={!selectedPathwaySlug || isSubmitting}
      onButtonClicked={onSubmit}
      className="mx-auto flex"
    />
  </section>
);

export default PathwayStage;
