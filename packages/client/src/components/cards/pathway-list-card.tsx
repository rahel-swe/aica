import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

import {
  ArrowRight,
  Clock3,
  Layers3,
  ShieldAlert,
  Bookmark,
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useSavedStore } from '@/stores/saved-resource-store';

import type { PathwayListView } from '@contracts/shared/types/pathway-domain-types';

type Props = {
  pathway: PathwayListView;
};

export default function PathwayListCard({ pathway }: Props) {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { savedIds, toggleSave } = useSavedStore();

  const isSaved = savedIds.includes(pathway.id);

  const handleClick = () => {
    navigate(`/app/pathways/${pathway.slug}`);
  };

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={handleClick}
      className="group flex-1"
    >
      <CardContent className="space-y-5">
        {/* HEADER */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-xl font-bold leading-tight transition-colors group-hover:text-primary">
              {pathway.title}
            </h2>

            <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
              {pathway.summary}
            </p>
          </div>

          <Badge className="shrink-0 capitalize">{pathway.type}</Badge>
        </div>

        {pathway.taxonomyNodes?.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              TAXONOMY
            </p>
            <div className="flex flex-wrap gap-2">
              {pathway.taxonomyNodes.slice(0, 3).map((node) => (
                <Badge key={node.slug} variant="outline" className="text-xs">
                  {node.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
        {/* SKILLS */}
        {pathway.keySkills.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Key skills
            </p>
            <ul className="flex flex-col gap-2 list-decimal ps-6">
              {pathway.keySkills.slice(0, 3).map((skill) => (
                <li key={skill} className="text-xs ">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* FOOTER */}
        <div className="flex items-center justify-between border-t pt-4">
          {/* LEFT INFO */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock3 className="size-4" />
              <span>{pathway.durationProfile.commitmentLevel}</span>
            </div>

            <div className="flex items-center gap-2">
              <Layers3 className="size-4" />
              <span className="capitalize">
                {pathway.durationProfile.commitmentLevel}
              </span>
            </div>

            {pathway.durationProfile.estimatedYearsMax && (
              <span className="text-xs text-muted-foreground">
                ~{pathway.durationProfile.estimatedYearsMax} yrs
              </span>
            )}
          </div>

          {/* RIGHT INFO */}
          <div className="flex items-center gap-3">
            {/* SAVE BUTTON */}
            <button
              onClick={async (e) => {
                e.stopPropagation();
                await toggleSave(pathway.id);
                queryClient.invalidateQueries({ queryKey: ['saved-pathways'] });
              }}
              aria-label={isSaved ? 'Unsave pathway' : 'Save pathway'}
            >
              <Bookmark
                className={`size-5 ${
                  isSaved
                    ? 'fill-primary text-primary'
                    : 'text-muted-foreground'
                }`}
              />
            </button>

            {/* LICENSE WARNING */}
            {pathway.durationProfile.requiresLicense && (
              <div className="flex items-center gap-1 text-amber-600">
                <ShieldAlert className="size-4" />
                <span className="text-xs">License</span>
              </div>
            )}

            {/* ARROW */}
            <ArrowRight
              className="
                size-5 text-muted-foreground
                transition-transform duration-300
                group-hover:translate-x-1 group-hover:text-primary
              "
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
