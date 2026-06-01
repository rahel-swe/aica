import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowUp } from 'lucide-react';
import { useState, type SubmitEvent } from 'react';
import { AdvisorPromptGrid } from './advisor-prompt-grid';
import type { AdvisorPrompt } from './advisor-ui-data';

type AdvisorInputBoxProps = {
  isPending: boolean;
  onSubmit: (message: string) => void;
};

export function AdvisorInputBox({ isPending, onSubmit }: AdvisorInputBoxProps) {
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
      className="rounded-3xl bg-muted flex flex-col items-center sm:items-center sm:justify-between max-w-sm sm:max-w-2xl mx-auto sticky bottom-22 md:bottom-4 h-min"
    >
      <Textarea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Ask about your context anything!"
        // Ask about your pathway, roadmap, comparison, or next steps
        className="min-h-10 border-0 text-sm placeholder:text-sm placeholder: bg-transparent focus-visible:ring-0 max-h-40 no-scrollbar"
      />
      <div className="flex self-end gap-2 px-2 overflow-hidden">
        <AdvisorPromptGrid onPromptSelect={handlePromptSelect} />

        <Button
          type="submit"
          size={'icon-lg'}
          disabled={isPending || message.trim().length < 3}
          className="size-11.5"
        >
          <ArrowUp className="size-6" strokeWidth={2.7} />
        </Button>
      </div>
    </form>
  );
}
