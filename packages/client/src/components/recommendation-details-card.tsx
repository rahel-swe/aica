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
  onPickedPathway: (item: RecommendationResult) => void;
  isPathwayPicking: boolean;
}

const RecommendationDetailsCard = ({ item }: Props) => {
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
        {/* BASIC INFO */}
        <div className="flex items-center justify-center text-sm space-y-1 opacity-80">
          <p>Rank: {item.rank ?? 'N/A'}</p>
        </div>
        <Badge variant="secondary">{item.type}</Badge>
        {/* REASONS */}
        <div className="flex flex-col gap-2 border border-black/15 rounded-xl p-2">
          <p className="font-medium">Reasons</p>
          <div className="flex flex-wrap flex-col">
            {item.reasons.map((r, i) => (
              <p key={i} className="rounded-full text-xs">
                {r}
              </p>
            ))}
          </div>
        </div>

        {/* EXPLANATION */}
        <Accordion type="single" collapsible className="border-0">
          <AccordionItem value="explanation" className="data-open:bg-white/50">
            <AccordionTrigger className="bg-white text-inherit rounded-full">
              Why this recommendation?
            </AccordionTrigger>

            <AccordionContent className="py-4 h-full">
              <CardDescription className="text-inherit">
                {item.explanation}
              </CardDescription>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default RecommendationDetailsCard;
