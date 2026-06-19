import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import type { DomainRecommendation } from '@contracts/shared/schemas/recommendation-schema';
import { formatSlug } from '@/lib/slug-formatter';
import { m } from '../../paraglide/messages';

type Props = {
  domains: DomainRecommendation[];
  selectedDomainSlug: string;
  onSelectDomain: (slug: string) => void;
  onContinue: () => void;
};

const DomainStage = ({
  domains,
  selectedDomainSlug,
  onSelectDomain,
  onContinue,
}: Props) => {
  const selected = domains.find((f) => f.domainSlug === selectedDomainSlug);

  return (
    <section className="space-y-12">
      {/* Stage header */}
      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          {m.pathway_recommendations_step({
            current: 1,
            total: 3,
          })}
        </p>

        <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
          {m.pathway_recommendations_domain_stage_title()}
        </h1>

        <p className="max-w-lg text-base text-muted-foreground md:text-lg">
          {m.pathway_recommendations_domain_stage_description()}
        </p>
      </div>

      {/* Picker buttons — pill chips */}
      <div className="flex flex-wrap gap-3">
        {domains.map((domain) => {
          const isSelected = selectedDomainSlug === domain.domainSlug;

          return (
            <Button
              key={domain.domainSlug}
              onClick={() => onSelectDomain(domain.domainSlug)}
              className={cn(
                'gap-2 px-4 py-6 font-medium transition-all duration-150'
              )}
              variant={isSelected ? 'default' : 'outline'}
            >
              {domain.domainName ?? formatSlug(domain.domainSlug)}
              <span className={cn('tabular-nums text-sm font-semibold')}>
                {domain.matchPercent}%
              </span>
            </Button>
          );
        })}
      </div>

      {/* Detail panel — visible only after a domain is selected */}
      {selected && (
        <div className="animate-in fade-in-0 slide-in-from-bottom-2 space-y-8 duration-300">
          <Separator />

          {/* Domain name + match score */}
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {selected.domainName ?? formatSlug(selected.domainSlug)}
            </h2>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold tabular-nums tracking-tighter">
                {selected.matchPercent}
              </span>
              <span className="text-xl text-muted-foreground">
                % {m.pathway_recommendations_match_title()}
              </span>
            </div>
          </div>

          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
            {selected.description}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-10 text-sm text-muted-foreground">
            <div>
              <span className="block text-2xl font-semibold tabular-nums text-foreground">
                {selected.fieldCount}
              </span>
              {m.pathway_recommendations_domain_stage_fields_inside()}
            </div>
            <div>
              <span className="block text-2xl font-semibold tabular-nums text-foreground">
                {selected.pathwayCount}
              </span>
              {m.pathway_recommendations_domain_stage_pathways_available()}
            </div>
          </div>

          {/* Top pathway previews */}
          {selected.topPathwaySlugs.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {m.pathway_recommendations_domain_stage_top_pathways_title()}
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
          className="group gap-2 px-8 py-7"
          disabled={!selectedDomainSlug}
          onClick={onContinue}
        >
          {m.pathway_recommendations_domain_stage_continue()}
          <ArrowRight className="transition-transform group-hover:translate-x-0.7 rtl:group-hover:-translate-x-0.7 rtl:rotate-180" />
        </Button>
      </div>
    </section>
  );
};

export default DomainStage;
