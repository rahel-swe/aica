import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowUp } from 'lucide-react';
import { useState, type SubmitEvent } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import type { AdvisorPrompt } from './advisor-ui-data';
import PromptDropDownMenu from './prompt-dropdown-menu';
import { cn } from '@/lib/utils';

type AdvisorInputBoxProps = {
  isPending: boolean;
  onSubmit: (message: string) => void;
  className?: string;
};

export function AdvisorInputBox({
  isPending,
  onSubmit,
  className,
}: AdvisorInputBoxProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = message.trim();

    if (trimmed.length < 3) return;

    onSubmit(trimmed);

    setMessage('');
  };

  const handlePromptSelect = (prompt: AdvisorPrompt) => {
    setMessage(prompt.prompt);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'rounded-2xl flex items-center gap-2 justify-center w-[90%] sm:max-w-2xl mx-auto sticky bottom-4 md:bottom-4 h-min p-2',
        className
      )}
    >
      <PromptDropDownMenu onPromptSelect={handlePromptSelect} />

      <ScrollArea className="flex-1 max-h-45 h-full w-full rounded-2xl overflow-hidden  ring ring-ring/70">
        <Textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Ask about your context anything!"
          className="min-h-10 text-sm placeholder:text-sm focus-visible:ring-0 focus-visible:border-border/0 placeholder:line-clamp-1"
          maxLength={3000}
        />
      </ScrollArea>

      <Button
        type="submit"
        size={'icon-lg'}
        disabled={isPending || message.trim().length < 3}
        className="size-11 self-end"
      >
        <ArrowUp className="size-5.5" strokeWidth={2.7} />
      </Button>
    </form>
  );
}
