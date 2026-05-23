import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { RecommendationFamilyMatch } from '@contracts/shared/types/pathway-domain-types';
import { Card, CardContent, CardFooter } from './ui/card';

type Props = {
  item: RecommendationFamilyMatch;
  onTapCard?: () => void;

  className?: string;
};

const formatLabel = (value: string) =>
  value
    .replaceAll('-', ' ')
    .replaceAll(/\bstem\b/gi, 'STEM')
    .replace(/\b\w/g, (char) => char.toUpperCase());

const RecommendationFamilyCard = ({
  item,
  onTapCard,

  className,
}: Props) => {
  return (
    <Card
      key={item.slug}
      className={cn('shadow-none', className)}
      onClick={onTapCard}
    >
      <CardContent className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs opacity-85 font-medium">
            {item.direction.title}
          </p>
          <h3 className="text-lg font-semibold">{item.title}</h3>
        </div>
        <Badge variant="secondary" className="font-heading">
          {item.matchPercent}%
        </Badge>
      </CardContent>

      <CardFooter className="mt-4 flex flex-wrap gap-2">
        {item.topPathwaySlugs.slice(0, 3).map((slug) => (
          <Badge key={slug} variant="outline" className="border">
            {formatLabel(slug)}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  );
};
export default RecommendationFamilyCard;
