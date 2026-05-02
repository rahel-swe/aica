import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import type { RecommendationResult } from '@contracts/shared/types/pathway-domain-types';

type Recommendation = {
  pathwayId: string;
  title: string;
  type: string;
  summary: string;
  totalScore: number;
  reasons: string[];
  explanation: string;
  rank: number;
};

interface RecommendationCardProps {
  item: RecommendationResult;
  onView?: (item: Recommendation) => void;
}

const typeColors: Record<string, string> = {
  career: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
  hybrid:
    'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
};

const RecommendationCard = ({ item }: RecommendationCardProps) => {
  const score = Math.round(item.totalScore * 100);

  return (
    <Card className="group relative overflow-hidden rounded-3xl border bg-background/80 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Glow */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <CardContent className="relative space-y-5 p-6">
        {/* Top */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-sm font-bold text-primary-foreground">
                #{item.rank}
              </div>

              <Badge
                variant="outline"
                className={
                  typeColors[item.type] ?? 'bg-muted text-muted-foreground'
                }
              >
                {item.type}
              </Badge>
            </div>

            <div>
              <h3 className="text-xl font-semibold tracking-tight">
                {item.title}
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                {item.summary}
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs text-muted-foreground">Match Score</p>

            <h2 className="text-3xl font-bold tracking-tight">{score}%</h2>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Compatibility</span>
            <span>{score}%</span>
          </div>

          <Progress value={score} className="h-2" />
        </div>

        {/* Reasons */}
        <div className="flex flex-wrap gap-2">
          {item.reasons.map((reason, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="rounded-full px-3 py-1"
            >
              {reason}
            </Badge>
          ))}
        </div>

        {/* Explanation */}
        <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
          {item.explanation}
        </p>
      </CardContent>

      <CardFooter className="relative flex items-center justify-between border-t bg-muted/30 px-6 py-4">
        <p className="text-xs text-muted-foreground">
          ID: {item.pathwayId.slice(0, 8)}...
        </p>

        <Button
          size="sm"
          className="rounded-xl"
          //  onClick={() => onView?.(item)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecommendationCard;
