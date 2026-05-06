import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

import { ArrowRight, Clock3, Layers3 } from 'lucide-react';

import type { PathwayListItem } from '@contracts/shared/types/pathway-domain-types';

type Props = {
  pathway: PathwayListItem;
  onClick?: () => void;
};

export default function PathwayListCard({ pathway, onClick }: Props) {
  return (
    <Card
      onClick={onClick}
      className="group cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <CardContent className="space-y-5 p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-xl font-bold leading-tight transition-colors group-hover:text-primary">
              {pathway.title}
            </h2>

            <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
              {pathway.summary}
            </p>
          </div>

          <Badge className="capitalize">{pathway.type}</Badge>
        </div>

        {/* Skills */}
        {pathway.keySkills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {pathway.keySkills.slice(0, 4).map((skill) => (
              <Badge key={skill} variant="secondary" className="rounded-full">
                {skill}
              </Badge>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock3 className="size-4" />

              <span>
                {/* {pathway.durationProfile.estimatedMonthsMin || 'Flexible'} */}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Layers3 className="size-4" />

              {/* <span>{pathway.journeyPhases.length} phases</span> */}
            </div>
          </div>

          <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </CardContent>
    </Card>
  );
}
