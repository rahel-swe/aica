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

import { cardbgColors } from '@/constants/recommendation-constant';
import { cn } from '@/lib/utils';
import type { RecommendationResult } from '@contracts/shared/types/pathway-domain-types';

interface Props {
  item: RecommendationResult;
  onTapCard: () => void;
  className?: string;
}

const RecommendationCard = ({ item, onTapCard, className }: Props) => {
  return (
    <Card
      className={cn(
        'relative shadow-none',
        'transition-all animate-in fade-in slide-in-from-bottom-6 md:slide-in-from-top-6 w-full',
        cardbgColors[item.rank! - 1],
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
      <CardContent className="flex flex-col gap-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{item.type}</Badge>
          {item.direction ? (
            <Badge variant="outline" className="border-black/10 bg-transparent">
              {item.direction.title}
            </Badge>
          ) : null}
          {item.family ? (
            <Badge variant="outline" className="border-black/10 bg-transparent">
              {item.family.title}
            </Badge>
          ) : null}
        </div>

        <div className={cn('flex flex-col gap-2 rounded-2xl p-3 bg-white/15')}>
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
            className="rounded-2xl data-[state=open]:bg-black/5 dark:data-[state=open]:bg-black/10"
          >
            <AccordionTrigger className="rounded-full bg-black/5 px-4 text-inherit dark:bg-black/10">
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

export default RecommendationCard;
