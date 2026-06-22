import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import type { AdvisorResponseMode } from '@contracts/shared/types/advisor-types';
import { MessageCircleCheck, Target, Zap } from 'lucide-react';
import { m } from '../../paraglide/messages';

const colors = ['text-yellow-300', 'text-indigo-300', 'text-purple-400'];

const MODES: {
  value: AdvisorResponseMode;
  label: string;
  tooltip: string;
  Icon: React.ElementType;
}[] = [
  {
    value: 'focused',
    label: m.advisor_mode_focused_label(),
    tooltip: m.advisor_mode_focused_tooltip(),
    Icon: Target,
  },
  {
    value: 'guided',
    label: m.advisor_mode_guided_label(),
    tooltip: m.advisor_mode_guided_tooltip(),
    Icon: MessageCircleCheck,
  },
  {
    value: 'deep',
    label: m.advisor_mode_deep_label(),
    tooltip: m.advisor_mode_deep_tooltip(),
    Icon: Zap,
  },
];

type AdvisorModeSelectorProps = {
  value: AdvisorResponseMode;
  onChange: (mode: AdvisorResponseMode) => void;
  disabled?: boolean;
};

export function AdvisorModeSelector({
  value,
  onChange,
  disabled = false,
}: AdvisorModeSelectorProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-0.5 rounded-xl bg-muted/60 border border-border/70',
        disabled && 'opacity-50 pointer-events-none'
      )}
    >
      {MODES.map(({ value: mode, label, tooltip, Icon }, idx) => (
        <Popover key={mode}>
          <PopoverTrigger asChild>
            <button
              type="button"
              onClick={() => onChange(mode)}
              className={cn(
                'flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium transition-all',
                value === mode
                  ? 'bg-background/60 text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className={cn('size-3', value === mode && colors[idx])} />
              <span className="sm:inline">{value === mode && label}</span>
            </button>
          </PopoverTrigger>

          <PopoverContent
            side="top"
            className="text-xs max-w-[200px] text-start"
          >
            {tooltip}
          </PopoverContent>
        </Popover>
      ))}
    </div>
  );
}
