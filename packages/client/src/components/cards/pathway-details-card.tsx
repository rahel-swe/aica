import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

import type { PathwayDetail } from '@contracts/shared/types/pathway-domain-types';

type Props = {
  pathway: PathwayDetail;
};

export default function PathwayDetailsCard({ pathway }: Props) {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">{pathway.title}</h1>

              <Badge>{pathway.type}</Badge>
            </div>

            <p className="text-muted-foreground">{pathway.summary}</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Description</h2>

            <p className="leading-7 text-muted-foreground">
              {pathway.description}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Key Skills</h2>

            <div className="flex flex-wrap gap-2">
              {pathway.keySkills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Opportunities</h2>

            <div className="flex flex-wrap gap-2">
              {pathway.opportunities.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Journey Phases</h2>

            <div className="space-y-4">
              {pathway.journeyPhases.map((phase, index) => (
                <Card key={index}>
                  <CardContent className="space-y-2 p-4">
                    <h3 className="font-semibold">{phase.name}</h3>

                    <p className="text-sm text-muted-foreground">
                      {phase.duration}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {pathway.verificationNote && (
            <div className="rounded-lg border bg-muted p-4">
              <p className="text-sm">{pathway.verificationNote}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
