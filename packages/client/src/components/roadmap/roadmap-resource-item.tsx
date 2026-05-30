// roadmap-resource-item.tsx
import { resourceMeta } from '@/constants/roadmap-step-card-constants';
import type { RoadmapResource } from '@contracts/shared/types/roadmap-types';
import { ArrowUpRight } from 'lucide-react';

type RoadmapResourceItemProps = {
  resource: RoadmapResource;
};

const RoadmapResourceItem = ({ resource }: RoadmapResourceItemProps) => {
  const meta = resourceMeta[resource.type] ?? resourceMeta.other;
  const Icon = meta.icon;

  const content = (
    <>
      <div
        className={`flex size-10 shrink-0 items-center justify-center rounded-full ring-1 ${meta.accent}`}
      >
        <Icon className="size-4" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            {meta.label}
          </span>

          {resource.url && (
            <ArrowUpRight className="size-3.5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          )}
        </div>

        <p className="mt-0.5 line-clamp-2 text-sm font-medium leading-snug text-foreground">
          {resource.title}
        </p>
      </div>
    </>
  );

  const baseClass =
    'group flex items-start gap-3 px-3 py-2 text-left transition-all duration-200 hover:-translate-y-0.5 border border-border/0 hover:border-border/40 rounded-full';

  if (resource.url) {
    return (
      <a
        href={resource.url}
        target="_blank"
        rel="noreferrer"
        className={baseClass}
        aria-label={`Open ${resource.title} (${meta.label})`}
      >
        {content}
      </a>
    );
  }

  return (
    <div className={`${baseClass} cursor-default opacity-90`}>{content}</div>
  );
};

export default RoadmapResourceItem;
