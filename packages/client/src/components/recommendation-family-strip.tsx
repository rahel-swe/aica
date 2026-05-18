import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { RecommendationFamilyMatch } from '@contracts/shared/types/pathway-domain-types';

type Props = {
  item: RecommendationFamilyMatch;
  className?: string;
};

const formatLabel = (value: string) =>
  value
    .replaceAll('-', ' ')
    .replaceAll(/\bstem\b/gi, 'STEM')
    .replace(/\b\w/g, (char) => char.toUpperCase());

const RecommendationFamilyStrip = ({ item, className }: Props) => {
  return (
    <div
      key={item.slug}
      className={cn('p-2 bg-secondary/30 border rounded-4xl', className)}
    >
      <div className={cn('rounded-2xl p-4 bg-card')}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs opacity-85 font-medium">
              {item.direction.title}
            </p>
            <h3 className="text-lg font-semibold">{item.title}</h3>
          </div>
          <Badge variant="secondary" className="font-heading">
            {item.matchPercent}%
          </Badge>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {item.topPathwaySlugs.slice(0, 3).map((slug) => (
            <Badge key={slug} variant="outline">
              {formatLabel(slug)}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};
export default RecommendationFamilyStrip;
