import GetStartedButton from '@/components/get-started-button';
import PathwayRecommendationCard from '@/components/pathway-recommendation-card';
import { cn } from '@/lib/utils';
import type { RecommendationResult } from '@contracts/shared/types/pathway-domain-types';
import BackdropShapes from './backdrop-shapes';
import RecommendationStageCheckedRadio from './recommendation-stage-checked-radio';

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

    <div className="grid gap-7 lg:grid-cols-2 xl:grid-cols-3 items-start">
      {pathways.map((item, index) => (
        <div className="relative">
          <PathwayRecommendationCard
            key={item.pathwayId}
            className={cn(
              'rounded-[2rem] bg-card/50 backdrop-blur-sm z-20 relative',
              selectedPathwaySlug === item.slug && 'ring-7 bg-card/70'
            )}
            item={{ ...item, rank: index + 1 }}
            onTapCard={() => onSelectPathway(item.slug)}
          />

          <BackdropShapes index={index} />

          {selectedPathwaySlug === item.slug && (
            <RecommendationStageCheckedRadio className="top-5" />
          )}
        </div>
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
