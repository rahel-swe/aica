import GetStartedButton from '@/components/get-started-button';
import RecommendationDirectionCard from '@/components/recommendation-direction-card';
import { cn } from '@/lib/utils';
import type { RecommendationDirectionMatch } from '@contracts/shared/types/pathway-domain-types';

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
        <RecommendationDirectionCard
          key={item.slug}
          item={item}
          index={index}
          className={cn(
            'rounded-[2rem] border border-gray-200/75  dark:border-gray-950/75',
            selectedDirectionSlug === item.slug &&
              'shadow-[7px_9px_0px] shadow-primary'
          )}
          onTapCard={() => onSelectDirection(item.slug)}
        />
      ))}
    </div>

    <GetStartedButton
      shouldDisable={false}
      onButtonClicked={onContinue}
      className="mx-auto flex"
    />
  </section>
);

export default DirectionStage;
