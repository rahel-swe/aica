import type { AdvisorIntent } from '@contracts/shared/types/advisor-types';
import { advisorIntents } from './advisor-ui-data';
import { cn } from '@/lib/utils';

type AdvisorIntentTabsProps = {
  value: AdvisorIntent;
  onChange: (value: AdvisorIntent) => void;
};

export function AdvisorIntentTabs({ value, onChange }: AdvisorIntentTabsProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white/75 p-2 shadow-sm">
      <div className="grid gap-2 sm:grid-cols-5">
        {advisorIntents.map((intent) => {
          const active = intent.value === value;

          return (
            <button
              key={intent.value}
              type="button"
              onClick={() => onChange(intent.value)}
              className={cn(
                'rounded-2xl px-3 py-3 text-left transition',
                active
                  ? 'bg-blue-300 text-blue-950 shadow-sm'
                  : 'bg-transparent text-slate-600 hover:bg-slate-100'
              )}
            >
              <span className="block text-sm font-semibold">
                {intent.label}
              </span>
              <span className="mt-1 hidden text-xs leading-5 sm:block">
                {intent.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
