import { ArrowUpRight } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
}

const RecommendationCard = ({ item }: Props) => {
  const score = Math.round(item.totalScore * 100);
  const reasons = item.reasons?.slice(0, 3) ?? [];

  return (
    <Card
      className={cn(
        'relative transition-all duration-500 shadow-none',
        'animate-in fade-in slide-in-from-bottom-6 md:slide-in-from-right-6 w-full',
        cardbgColors[item.rank! - 1]
      )}
    >
      <CardHeader>
        <div className="mx-auto mb-4 relative">
          <p className="text-6xl md:text-7xl font-semibold">{score}%</p>
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
        <Badge variant="secondary">{item.type}</Badge>

        <div className="flex flex-col gap-2 border border-black/15 rounded-xl p-2">
          <p>Reasons</p>
          <div className="flex flex-wrap flex-col">
            {reasons.map((r, i) => (
              <p key={i} className="rounded-full text-xs">
                {r}
              </p>
            ))}
          </div>
        </div>

        <Accordion type="single" collapsible className="border-0">
          <AccordionItem value="explanation" className="data-open:bg-white/50">
            <AccordionTrigger className="bg-white text-inherit">
              Why this recommendation?
            </AccordionTrigger>
            <AccordionContent className="py-4 h-full">
              <CardDescription className='text-inherit"'>
                {item.explanation}
              </CardDescription>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>

      <div className="p-4 pt-0 flex justify-center">
        <Button
          size="lg"
          variant="outline"
          className="text-inherit dark:bg-white py-7 px-7"
          onClick={() => console.log('selected', item)}
        >
          Get Started
          <ArrowUpRight />
        </Button>
      </div>
    </Card>
  );
};

export default RecommendationCard;
