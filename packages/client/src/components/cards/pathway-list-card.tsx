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
import { useSavedStore } from '@/stores/saved-resource-store';

import type { PathwayListView } from '@contracts/shared/types/pathway-domain-types';

type Props = {
  pathway: PathwayListView;
};

export default function PathwayListCard({ pathway }: Props) {
  const navigate = useNavigate();

  const savedIds = useSavedStore((s) => s.savedIds);
  const toggleSave = useSavedStore((s) => s.toggleSave);

  const isSaved = savedIds.includes(pathway.slug);

  const handleClick = () => {
    navigate(`/app/pathways/${pathway.slug}`);
  };

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleClick();
      }}
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

        {/* TAXONOMY */}
        {pathway.taxonomyNodes?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {pathway.taxonomyNodes.slice(0, 3).map((node) => (
              <Badge key={node.id} variant="outline" className="text-xs">
                {node.name}
              </Badge>
            ))}
          </div>
        )}

        {/* SKILLS */}
        {pathway.keySkills?.length > 0 && (
          <div className="flex flex-wrap gap-2 capitalize">
            {pathway.keySkills.slice(0, 4).map((skill) => (
              <Badge key={skill} variant="secondary" className="rounded-full">
                {skill}
              </Badge>
            ))}
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
              onClick={(e) => {
                e.stopPropagation();
                toggleSave(pathway.id);
              }}
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
