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
  onPickedPathway: (item: RecommendationResult) => void;
  isPathwayPicking: boolean;
}

const RecommendationCard = ({
  item,
  onPickedPathway,
  isPathwayPicking,
}: Props) => {
  // const score = Math.round(item.totalScore * 100);
  return (
    <Card
      className={cn(
        'relative shadow-none',
        'transition-all duration-500 animate-in fade-in slide-in-from-bottom-6 md:slide-in-from-top-6 w-full',
        cardbgColors[item.rank! - 1]
      )}
    >
      <CardHeader>
        <div className="mx-auto mb-4 relative">
          <p className="text-6xl md:text-7xl font-semibold">
            {item.totalScore}%
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
        <Badge variant="secondary">{item.type}</Badge>

        <div className="flex flex-col gap-2 border border-black/15 rounded-xl p-2">
          <p>Reasons</p>
          <div className="flex flex-wrap flex-col">
            {item.reasons.map((r, i) => (
              <p key={i} className="rounded-full text-xs">
                {r}
              </p>
            ))}
          </div>
        </div>

        <Accordion type="single" collapsible className="border-0">
          <AccordionItem value="explanation" className="data-open:bg-white/50">
            <AccordionTrigger className="bg-white text-inherit rounded-full">
              Why this recommendation?
            </AccordionTrigger>
            <AccordionContent className="py-4 h-full">
              <CardDescription className="text-inherit font-sans">
                {item.explanation}
              </CardDescription>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>

      <div className="p-4 pt-0 flex justify-center">
        <Button
          size="lg"
          className="group text-inherit bg-white hover:bg-white/80 dark:bg-white dark:hover:bg-white/80 py-7 px-7"
          disabled={isPathwayPicking}
          onClick={() => onPickedPathway(item)}
        >
          Get Started
          <ArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
        </Button>
      </div>
    </Card>
  );
};

export default RecommendationCard;
