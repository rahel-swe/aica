import GetStartedButton from '@/components/get-started-button';
import RecommendationFamilyCard from '@/components/recommendation-family-card';
import { cn } from '@/lib/utils';
import type {
  RecommendationDirectionMatch,
  RecommendationFamilyMatch,
} from '@contracts/shared/types/pathway-domain-types';
import BackdropShapes from './backdrop-shapes';
import RecommendationStageCheckedRadio from './recommendation-stage-checked-radio';

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
        <div className="relative">
          <RecommendationFamilyCard
            key={item.slug}
            item={item}
            className={cn(
              'w-full sm:max-w-max bg-card/50 backdrop-blur-sm z-20 relative',
              selectedFamilySlug === item.slug && 'ring-7 bg-card/70 pt-10'
            )}
            onTapCard={() => onSelectFamily(item.slug)}
          />

          <BackdropShapes index={index} />

          {selectedFamilySlug === item.slug && (
            <RecommendationStageCheckedRadio />
          )}
        </div>
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
