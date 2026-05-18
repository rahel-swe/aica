import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { recommendationSurfaceColors } from '@/constants/recommendation-constant';
import { cn } from '@/lib/utils';
import type { RecommendationDirectionMatch } from '@contracts/shared/types/pathway-domain-types';

type Props = {
  item: RecommendationDirectionMatch;
  index: number;
  onTapCard?: () => void;
  className?: string;
};

const formatLabel = (value: string) =>
  value
    .replaceAll('-', ' ')
    .replaceAll(/\bstem\b/gi, 'STEM')
    .replace(/\b\w/g, (char) => char.toUpperCase());

const RecommendationDirectionCard = ({
  item,
  index,
  onTapCard,
  className,
}: Props) => {
  return (
    <Card
      className={cn(
        'h-full shadow-none transition-all duration-200',
        recommendationSurfaceColors[index % recommendationSurfaceColors.length],
        className
      )}
      onClick={onTapCard}
    >
      <CardHeader className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm tracking-[0.18rem] font-medium opacity-85">
            Direction
          </p>
          <CardTitle className="mt-1 text-2xl">{item.title}</CardTitle>
        </div>
        <div className="text-right">
          <p className="text-4xl font-semibold font-heading">
            {item.matchPercent}%
          </p>
          <p className="text-xs opacity-60">Match</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div
          className={cn(
            'flex items-center justify-between rounded-2xl px-4 py-3 bg-white/27'
          )}
        >
          <span className="text-sm opacity-85">Strong pathways here</span>
          <Badge variant={'secondary'}>{item.pathwayCount}</Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          {item.topPathwaySlugs.slice(0, 5).map((slug) => (
            <Badge
              key={slug}
              variant="outline"
              className="bg-transparent text-inherit border-gray-900/10"
            >
              {formatLabel(slug)}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationDirectionCard;
