import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import type { DomainRecommendation } from '@contracts/shared/schemas/recommendation-schema';
import { formatSlug } from '@/lib/slug-formatter';

type Props = {
  families: DomainRecommendation[];
  selectedFamilySlug: string;
  onSelectFamily: (slug: string) => void;
  onContinue: () => void;
};

const DomainStage = ({
  families,
  selectedFamilySlug,
  onSelectFamily,
  onContinue,
}: Props) => {
  const selected = families.find((f) => f.domainSlug === selectedFamilySlug);

  return (
    <section className="space-y-12">
      {/* Stage header */}
      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Step 1 of 3
        </p>
        <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
          Find your world.
        </h1>
        <p className="max-w-lg text-base text-muted-foreground md:text-lg">
          These domains matched your profile. Pick the one that pulls you.
        </p>
      </div>

      {/* Picker buttons — pill chips */}
      <div className="flex flex-wrap gap-3">
        {families.map((family) => {
          const isSelected = selectedFamilySlug === family.domainSlug;
          return (
            <button
              key={family.domainSlug}
              onClick={() => onSelectFamily(family.domainSlug)}
              className={cn(
                'flex items-center gap-3 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                isSelected
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border bg-background text-foreground hover:border-foreground/40'
              )}
            >
              {formatSlug(family.domainSlug)}
              <span
                className={cn(
                  'tabular-nums text-xs font-semibold',
                  isSelected ? 'text-background/60' : 'text-muted-foreground'
                )}
              >
                {family.matchPercent}%
              </span>
            </button>
          );
        })}
      </div>

      {/* Detail panel — visible only after a family is selected */}
      {selected && (
        <div className="animate-in fade-in-0 slide-in-from-bottom-2 space-y-8 duration-300">
          <Separator />

          {/* Domain name + match score */}
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {formatSlug(selected.domainSlug)}
            </h2>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold tabular-nums tracking-tighter">
                {selected.matchPercent}
              </span>
              <span className="text-xl text-muted-foreground">% match</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-10 text-sm text-muted-foreground">
            <div>
              <span className="block text-2xl font-semibold tabular-nums text-foreground">
                {selected.fieldCount}
              </span>
              fields inside
            </div>
            <div>
              <span className="block text-2xl font-semibold tabular-nums text-foreground">
                {selected.pathwayCount}
              </span>
              pathways available
            </div>
          </div>

          {/* Top pathway previews */}
          {selected.topPathwaySlugs.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Top pathways in this domain
              </p>
              <div className="flex flex-wrap gap-2">
                {selected.topPathwaySlugs.map((slug) => (
                  <Badge key={slug} variant="secondary" className="font-normal">
                    {formatSlug(slug)}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action */}
      <div className="pt-2">
        <Button
          size="lg"
          className="group gap-2 px-8"
          disabled={!selectedFamilySlug}
          onClick={onContinue}
        >
          Explore fields
          <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
        </Button>
      </div>
    </section>
  );
};

export default DomainStage;
