import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowUp } from 'lucide-react';
import type { ChangeEvent } from 'react';

type AdvisorInputBoxProps = {
  value: string;
  isPending: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export function AdvisorInputBox({
  value,
  isPending,
  onChange,
  onSubmit,
}: AdvisorInputBoxProps) {
  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.target.reset();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-muted flex items-center sm:flex-row sm:items-center sm:justify-between max-w-sm sm:max-w-xl mx-auto"
    >
      <Textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Ask about your context anything!"
        // Ask about your pathway, roadmap, comparison, or next steps
        className="min-h-10 border-0 text-sm placeholder:text-sm placeholder: bg-transparent focus-visible:ring-0 max-h-40 no-scrollbar"
      />
      <Button
        type="submit"
        size={'icon-lg'}
        disabled={isPending || value.trim().length < 3}
        className="size-11.5 self-end me-0.5 my-0.5"
      >
        <ArrowUp className="size-6" strokeWidth={2.7} />
      </Button>
    </form>
  );
}
