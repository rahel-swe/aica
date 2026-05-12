import type { FormEvent } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();

  if (isMobile) return null;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-4xl bg-muted p-0.5 flex items-center sm:flex-row sm:items-center sm:justify-between max-w-xl mx-auto"
    >
      <Textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Ask about your context"
        // Ask about your pathway, roadmap, comparison, or next steps
        className="min-h-10 border-0 bg-transparent focus-visible:ring-0"
      />
      <Button
        type="submit"
        size={'icon-lg'}
        disabled={isPending || value.trim().length < 3}
        className="size-13"
      >
        <ArrowUp className="size-6" />
      </Button>
    </form>
  );
}
