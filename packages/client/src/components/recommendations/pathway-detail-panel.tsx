import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Clock, GraduationCap, Layers } from 'lucide-react';
import type { PathwayDetailView } from '@contracts/shared/types/pathway-domain-types';
import {
  formatCommitmentLevel,
  formatDegreeRequirement,
  formatDuration,
  formatRouteType,
} from '@/lib/slug-formatter';

type Props = {
  detail: PathwayDetailView;
  matchPercent?: number;
  reasons?: string[];
  /**
   * compact = true in DirectionStage (preview of top pathway).
   * compact = false in PathwayStage (full breakdown with journey + opportunities).
   */
  compact?: boolean;
};

const PathwayDetailPanel = ({
  detail,
  matchPercent,
  reasons,
  compact = false,
}: Props) => {
  const { durationProfile } = detail;

  return (
    <div className="space-y-8">
      {/* Match score + reasons */}
      {matchPercent !== undefined && (
        <div className="space-y-3">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold tabular-nums tracking-tighter">
              {matchPercent}
            </span>
            <span className="text-xl text-muted-foreground">% match</span>
          </div>

          {reasons && reasons.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {reasons.map((reason) => (
                <Badge key={reason} variant="secondary" className="font-normal">
                  {reason}
                </Badge>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Title + summary */}
      <div className="space-y-2">
        <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
          {detail.title}
        </h3>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          {detail.summary}
        </p>
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Clock className="size-3.5 shrink-0" />
          {formatDuration(durationProfile)} ·{' '}
          {formatCommitmentLevel(durationProfile.commitmentLevel)}
        </span>
        <span className="flex items-center gap-1.5">
          <Layers className="size-3.5 shrink-0" />
          {formatRouteType(durationProfile.routeType)}
        </span>
        <span className="flex items-center gap-1.5">
          <GraduationCap className="size-3.5 shrink-0" />
          {formatDegreeRequirement(durationProfile.degreeRequirement)}
        </span>
        {durationProfile.requiresLicense && (
          <Badge variant="outline" className="text-xs font-normal">
            License required
          </Badge>
        )}
      </div>

      {/* Description — full mode only */}
      {!compact && (
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {detail.description}
        </p>
      )}

      <Separator />

      {/* Key skills */}
      {detail.keySkills.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Key skills
          </p>
          <div className="flex flex-wrap gap-2">
            {detail.keySkills.map((skill) => (
              <Badge key={skill} variant="outline" className="font-normal">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Journey phases — full mode only */}
      {!compact && detail.journeyPhases.length > 0 && (
        <div className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Journey — {detail.roadmapWindowLabel}
          </p>
          <div className="space-y-0">
            {detail.journeyPhases.map((phase, i) => (
              <div key={phase.name} className="flex gap-4">
                {/* Timeline spine */}
                <div className="flex flex-col items-center">
                  <div className="flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-foreground text-[10px] font-bold">
                    {i + 1}
                  </div>
                  {i < detail.journeyPhases.length - 1 && (
                    <div
                      className="w-px flex-1 bg-border"
                      style={{ minHeight: '1.5rem' }}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="space-y-0.5 pb-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium">{phase.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {phase.duration}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{phase.focus}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Opportunities — full mode only */}
      {!compact && detail.opportunities.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Where this leads
          </p>
          <ul className="space-y-1.5">
            {detail.opportunities.map((op) => (
              <li
                key={op}
                className="flex items-start gap-2.5 text-sm text-muted-foreground"
              >
                <span className="mt-[7px] size-1 shrink-0 rounded-full bg-muted-foreground" />
                {op}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Verification note — full mode only */}
      {!compact && detail.verificationNote && (
        <p className="border-l-2 border-border pl-3 text-xs italic text-muted-foreground">
          {detail.verificationNote}
        </p>
      )}
    </div>
  );
};

export default PathwayDetailPanel;
