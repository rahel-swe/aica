import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import type { AdvisorResponseMode } from '@contracts/shared/types/advisor-types';
import { MessageCircleCheck, Target, Zap } from 'lucide-react';

// ─── Mode config

const colors = ['text-indigo-300', 'text-yellow-300', 'text-purple-400'];

const MODES: {
  value: AdvisorResponseMode;
  label: string;
  tooltip: string;
  Icon: React.ElementType;
}[] = [
  {
    value: 'guided',
    label: 'Guided',
    tooltip: 'Full guidance — actions, suggestions, and web search',
    Icon: MessageCircleCheck,
  },
  {
    value: 'focused',
    label: 'Focused',
    tooltip: 'Direct answers only — no suggestions, web search when needed',
    Icon: Target,
  },
  {
    value: 'deep',
    label: 'Deep',
    tooltip: 'Action-oriented — concrete next steps, no follow-up questions',
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
        'inline-flex items-center gap-0.5 rounded-xl bg-muted/60 p-0.5',
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
                  ? 'bg-background text-foreground shadow-sm'
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
