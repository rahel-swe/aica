import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, ShieldCheck, Layers } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

import type { PathwayDetail } from '@contracts/shared/types/pathway-domain-types';

type Props = {
  pathway: PathwayDetail;
};

export default function PathwayDetailsCard({ pathway }: Props) {
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);

  return (
    <div className="space-y-6">
      <Card className="rounded-2xl">
        <CardContent className="space-y-10 p-6">
          {/* HEADER ACTION */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="group inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              Back
            </button>
          </div>

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
            <div className="flex flex-wrap gap-2">
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
            <div className="flex flex-wrap gap-2">
              {pathway.opportunities.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </div>

          {/* DURATION PROFILE (NEW STRUCTURED UI) */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Duration Profile</h2>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="flex items-center gap-2 rounded-lg border p-3">
                <Clock className="size-4 text-muted-foreground" />
                <span className="text-sm">
                  {pathway.durationProfile.commitmentLevel}
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-lg border p-3">
                <Layers className="size-4 text-muted-foreground" />
                <span className="text-sm">
                  {pathway.durationProfile.timelineType}
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-lg border p-3">
                <ShieldCheck className="size-4 text-muted-foreground" />
                <span className="text-sm">
                  {pathway.durationProfile.degreeRequirement}
                </span>
              </div>
            </div>
          </div>

          {/* JOURNEY PHASES */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Journey Phases</h2>

            <div className="space-y-4">
              {pathway.journeyPhases.map((phase, index) => (
                <Card key={index} className="rounded-xl">
                  <CardContent className="space-y-1 p-4">
                    <h3 className="font-semibold">{phase.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {phase.duration}
                    </p>
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
                    className="cursor-pointer rounded-xl transition hover:-translate-y-1 hover:shadow-md"
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
            <div className="rounded-xl border bg-muted p-4">
              <p className="text-sm text-muted-foreground">
                {pathway.verificationNote}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
