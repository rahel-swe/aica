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
import type { RecommendationResult } from '@contracts/shared/types/pathway-domain-types';

interface Props {
  item: RecommendationResult;
}

const RecommendationDetailsCard = ({ item }: Props) => {
  return (
    <div className="border p-3 rounded-[2.5rem] bg-secondary/30">
      <Card
        className={cn(
          'relative shadow-none',
          'transition-all duration-500 animate-in fade-in slide-in-from-bottom-6 md:slide-in-from-top-6 w-full ring-0'
          // cardbgColors[item.rank! - 1]
        )}
      >
        <CardHeader>
          <div className="mx-auto mb-4 relative">
            <p className="text-6xl md:text-7xl font-semibold font-heading">
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
          <Badge className="bg-white mx-auto px-3 text-md font-heading">
            Rank: {item.rank ?? 'N/A'}
          </Badge>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="capitalize">
              {item.type}
            </Badge>
            {item.direction ? (
              <Badge variant="secondary">{item.direction.title}</Badge>
            ) : null}
            {item.family ? (
              <Badge variant="secondary">{item.family.title}</Badge>
            ) : null}
          </div>
          <div className={cn('flex flex-col gap-2 rounded-2xl p-3 border')}>
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
              className="rounded-2xl data-[state=open]:bg-secondary/30 dark:data-[state=open]:bg-secondary/50"
            >
              <AccordionTrigger className="rounded-full bg-secondary/75 text-inherit dark:bg-secondary/75">
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
    </div>
  );
};

export default RecommendationDetailsCard;
