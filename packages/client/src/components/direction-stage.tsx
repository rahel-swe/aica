import GetStartedButton from '@/components/get-started-button';
import RecommendationDirectionCard from '@/components/recommendation-direction-card';
import { cn } from '@/lib/utils';
import type { RecommendationDirectionMatch } from '@contracts/shared/types/pathway-domain-types';
import BackdropShapes from './backdrop-shapes';
import RecommendationStageCheckedRadio from './recommendation-stage-checked-radio';

type Props = {
  directionMatches: RecommendationDirectionMatch[];
  selectedDirectionSlug: string;
  onSelectDirection: (slug: string) => void;
  onContinue: () => void;
};

const DirectionStage = ({
  directionMatches,
  selectedDirectionSlug,
  onSelectDirection,
  onContinue,
}: Props) => (
  <section className="space-y-10 my-auto">
    <h1 className="text-5xl font-semibold tracking-tight md:text-6xl text-center">
      Follow your direction!
    </h1>

    <div className="grid gap-6 lg:grid-cols-3">
      {directionMatches.map((item, index) => (
        <div className="relative">
          <RecommendationDirectionCard
            key={item.slug}
            item={item}
            className={cn(
              'rounded-[2rem] bg-card/50 backdrop-blur-sm z-20 relative',
              selectedDirectionSlug === item.slug && 'ring-7 bg-card/70 pt-10'
            )}
            onTapCard={() => onSelectDirection(item.slug)}
          />

          <BackdropShapes index={index} />

          {selectedDirectionSlug === item.slug && (
            <RecommendationStageCheckedRadio />
          )}
        </div>
      ))}
    </div>

    <GetStartedButton
      shouldDisable={!selectedDirectionSlug}
      onButtonClicked={onContinue}
      className="mx-auto flex"
    />
  </section>
);

export default DirectionStage;
