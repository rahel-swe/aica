import type { FormEvent } from 'react';
import type { AdvisorIntent } from '@contracts/shared/types/advisor-types';
import { SendHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

type AdvisorInputBoxProps = {
  value: string;
  intent: AdvisorIntent;
  isPending: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export function AdvisorInputBox({
  value,
  intent,
  isPending,
  onChange,
  onSubmit,
}: AdvisorInputBoxProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-slate-200 bg-white/80 p-3 shadow-sm"
    >
      <div className="rounded-3xl bg-slate-100/80 p-3">
        <Textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Ask about this pathway, roadmap, comparison, or next steps"
          className="min-h-24 border-0 bg-transparent text-slate-950 placeholder:text-slate-500 focus-visible:ring-0"
        />
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-slate-500">
            Scoped to AICA context. Current mode: {intent}.
          </p>
          <Button
            type="submit"
            disabled={isPending || value.trim().length < 3}
            className="bg-slate-950 text-white hover:bg-slate-800"
          >
            <SendHorizontal className="size-4" />
            Ask Advisor
          </Button>
        </div>
      </div>
    </form>
  );
}
