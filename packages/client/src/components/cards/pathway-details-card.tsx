import { AlertCircle, Clock, Layers, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

import type { PathwayDetail } from '@contracts/shared/types/pathway-domain-types';
import NavigationBackButton from '../navigation-back-button';
import { ScrollArea } from '../ui/scroll-area';

type Props = {
  pathway: PathwayDetail;
};

export default function PathwayDetailsCard({ pathway }: Props) {
  const navigate = useNavigate();

  return (
    <div className="h-full min-h-0 flex-1">
      <ScrollArea className="md:h-full">
        <div className="flex flex-col gap-6 pb-4 pt-2">
          <NavigationBackButton title="Back" className="w-min" />
          {/* HEADER ACTION */}

          {/* TITLE SECTION */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold">{pathway.title}</h1>
              <Badge className="capitalize">{pathway.type}</Badge>
            </div>

            <p className="text-muted-foreground">{pathway.summary}</p>
          </div>

          {/* TAXONOMY (NEW) */}
          {pathway.taxonomyNodes?.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Category</h2>

              <div className="flex flex-wrap gap-2">
                {pathway.taxonomyNodes.map((node) => (
                  <Badge key={node.id} variant="secondary">
                    {node.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* DESCRIPTION */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Description</h2>
            <p className="leading-7 text-muted-foreground">
              {pathway.description}
            </p>
          </div>

          {/* SKILLS */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Key Skills</h2>
            <div className="flex flex-wrap gap-2 capitalize">
              {pathway.keySkills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* OPPORTUNITIES */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Opportunities</h2>
            <div className="flex flex-wrap gap-2 capitalize">
              {pathway.opportunities.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </div>

          {/* DURATION PROFILE  */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Duration Profile</h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mt-5">
              <div className="relative">
                <Badge
                  className="absolute inset-s-7 -top-3 px-1 py-0 text-[0.6rem]"
                  variant={'secondary'}
                >
                  Commit Level
                </Badge>
                <div className="flex items-center gap-2 rounded-4xl border p-3">
                  <Clock className="size-4 text-muted-foreground" />
                  <span className="text-sm capitalize">
                    {pathway.durationProfile.commitmentLevel}
                  </span>
                </div>
              </div>

              <div className="relative">
                <Badge
                  className="absolute inset-s-7 -top-3 px-1 py-0 text-[0.6rem]"
                  variant={'secondary'}
                >
                  Timeline Type
                </Badge>
                <div className="flex items-center gap-2 rounded-4xl border p-3">
                  <Layers className="size-4 text-muted-foreground" />
                  <span className="text-sm capitalize">
                    {pathway.durationProfile.timelineType}
                  </span>
                </div>
              </div>

              <div className="relative">
                <Badge
                  className="absolute inset-s-7 -top-3 px-1 py-0 text-[0.6rem]"
                  variant={'secondary'}
                >
                  Degree Requirement
                </Badge>
                <div className="flex items-center gap-2 rounded-4xl border p-3 capitalize">
                  <ShieldCheck className="size-4 text-muted-foreground" />
                  <span className="text-sm">
                    {pathway.durationProfile.degreeRequirement}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* JOURNEY PHASES */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Journey Phases</h2>

            <div className="space-y-4">
              {pathway.journeyPhases.map((phase, index) => (
                <Card key={index} className="">
                  <CardContent className="space-y-2">
                    <Badge>{phase.duration}</Badge>
                    <h3 className="font-semibold">{phase.name}</h3>
                    <p className="text-sm">{phase.focus}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* RELATED PATHWAYS (IMPORTANT NEW SECTION) */}
          {pathway.relatedPathways?.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Related Pathways</h2>

              <div className="grid gap-3 sm:grid-cols-2">
                {pathway.relatedPathways.map((item) => (
                  <Card
                    key={item.id}
                    onClick={() => navigate(`/app/pathways/${item.id}`)}
                    className="cursor-pointer transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <CardContent className="p-4">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="line-clamp-2 text-sm text-muted-foreground">
                        {item.summary}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* VERIFICATION */}
          {pathway.verificationNote && (
            <div className="rounded-3xl border bg-card p-4 flex items-center gap-2">
              <AlertCircle className="opacity-90 size-5 self-start shrink" />
              <p className="text-sm text-muted-foreground flex-1">
                {pathway.verificationNote}
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
