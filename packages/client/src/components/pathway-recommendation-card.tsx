import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { cn } from '@/lib/utils';
import type { RecommendationItem } from '@contracts/shared/types/pathway-domain-types';

interface Props {
  item: RecommendationItem;
  onTapCard: () => void;
  className?: string;
}

const PathwayRecommendationCard = ({ item, onTapCard, className }: Props) => {
  return (
    <Card
      className={cn(
        'shadow-none',
        'transition-all animate-in fade-in slide-in-from-bottom-6 md:slide-in-from-top-6 w-full',
        className
      )}
      onClick={onTapCard}
    >
      <CardHeader>
        <div className="mx-auto mb-4 relative">
          <p className="text-6xl md:text-7xl font-semibold">
            {item.matchPercent ?? Math.round(item.totalScore * 100)}%
          </p>
          <p className="text-lg opacity-50 mx-auto absolute -bottom-6 inset-s-22">
            Match
          </p>
        </div>
        <div>
          <CardTitle className="text-xl md:text-2xl">{item.title}</CardTitle>
          <CardDescription className="text-inherit">
            {item.summary}
          </CardDescription>
        </div>
      </CardHeader>

      <Badge className="mx-auto px-3 text-md font-heading">
        Rank: {item.rank ?? 'N/A'}
      </Badge>
      <CardContent className="flex flex-col gap-y-4 w-full">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="capitalize">
            {item.type}
          </Badge>
          {item.direction ? (
            <Badge variant="outline">{item.direction.title}</Badge>
          ) : null}
          {item.family ? (
            <Badge variant="outline">{item.family.title}</Badge>
          ) : null}
        </div>

        <div
          className={cn('flex flex-col gap-2 rounded-2xl p-3 bg-secondary/35')}
        >
          <p className="font-medium">Reasons</p>
          <div className="flex flex-wrap flex-col">
            {item.reasons.map((r, i) => (
              <p key={i} className="rounded-full text-xs">
                {r}
              </p>
            ))}
          </div>
        </div>

        <Accordion type="single" collapsible className="border-0">
          <AccordionItem
            value="explanation"
            className="rounded-2xl data-[state=open]:bg-background/35 dark:data-[state=open]:bg-background/35"
          >
            <AccordionTrigger className="rounded-full bg-background/10 px-4 text-inherit dark:bg-background/35">
              Why this recommendation?
            </AccordionTrigger>
            <AccordionContent className="py-4 h-full">
              <CardDescription className="text-inherit">
                {item.explanation ??
                  'This pathway fits the traits you selected. AICA will explain it in more detail as you move into roadmap setup and advisor guidance.'}
              </CardDescription>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default PathwayRecommendationCard;
