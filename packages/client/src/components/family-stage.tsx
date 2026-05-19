import GetStartedButton from '@/components/get-started-button';
import RecommendationFamilyCard from '@/components/recommendation-family-card';
import { cn } from '@/lib/utils';
import type {
  RecommendationDirectionMatch,
  RecommendationFamilyMatch,
} from '@contracts/shared/types/pathway-domain-types';

type Props = {
  selectedDirection: RecommendationDirectionMatch;
  directionFamilies: RecommendationFamilyMatch[];
  selectedFamilySlug: string;
  onSelectFamily: (slug: string) => void;
  onContinue: () => void;
};

const FamilyStage = ({
  selectedDirection,
  directionFamilies,
  selectedFamilySlug,
  onSelectFamily,
  onContinue,
}: Props) => (
  <section className="space-y-10">
    <h2 className="mx-auto text-4xl md:text-6xl text-center font-semibold">
      Pick the family inside {selectedDirection.title}
    </h2>

    <div className="flex flex-wrap gap-6 items-center justify-center">
      {directionFamilies.map((item, index) => (
        <RecommendationFamilyCard
          key={item.slug}
          index={index}
          item={item}
          className={cn(
            'w-full sm:max-w-max border-gray-200/75  dark:border-gray-950/75',
            selectedFamilySlug === item.slug
              ? 'shadow-[3px_5px_0px] shadow-primary'
              : ''
          )}
          onTapCard={() => onSelectFamily(item.slug)}
        />
      ))}
    </div>

    <GetStartedButton
      shouldDisable={!selectedFamilySlug}
      onButtonClicked={onContinue}
      className="mx-auto flex"
    />
  </section>
);

export default FamilyStage;
