import { Button } from '@/components/ui/button';
import { useIsAdvisorOpen } from '@/hooks/use-is-advisor-open';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { useAdvisorStore } from '@/stores/advisor-store';
import { ArrowUp, Square } from 'lucide-react';
import { useCallback, useRef, useState, type KeyboardEvent } from 'react';
import { AdvisorModeSelector } from './advisor-mode-selector';
import { m } from '../../paraglide/messages';

const MAX_CHARS = 2000;

type AdvisorInputProps = {
  onSubmit: (message: string) => void;
  onAbort?: () => void;
  isStreaming?: boolean;
  className?: string;
};

export function AdvisorInput({
  onSubmit,
  onAbort,
  isStreaming = false,
  className,
}: AdvisorInputProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isAdvisorOpen = useIsAdvisorOpen();
  const isMobile = useIsMobile(768);

  const responseMode = useAdvisorStore((s) => s.responseMode);
  const setResponseMode = useAdvisorStore((s) => s.setResponseMode);

  const resize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > MAX_CHARS) return;
    setValue(e.target.value);
    resize();
  };

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed || isStreaming) return;
    onSubmit(trimmed);
    setValue('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const charCount = value.length;
  const nearLimit = charCount > MAX_CHARS * 0.85;
  const canSubmit = value.trim().length > 0 && !isStreaming;

  return (
    <div
      className={cn(
        'px-4 pb-4 sm:pb-3 fixed md:absolute -bottom-34 w-full z-12 md:-translate-x-1/2 md:left-1/2 transition-all duration-400',
        className,
        isAdvisorOpen && isMobile && '-bottom-5',
        !isMobile && 'bottom-0'
      )}
    >
      <div className="relative flex flex-col gap-1 rounded-3xl bg-card  focus-within:ring-ring transition-shadow md:w-[80%] mx-auto mb-4 sm:mb-0">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={m.advisor_chat_placeholder()}
          rows={1}
          disabled={isStreaming}
          className="resize-none bg-transparent px-4 pt-3.5 pb-2 text-sm leading-relaxed placeholder:text-muted-foreground focus:outline-none min-h-[52px] max-h-[200px] w-full no-scrollbar"
        />

        <div className="flex items-center justify-end px-3 pb-2.5 gap-1.5">
          {nearLimit && (
            <span className="text-[11px] tabular-nums text-amber-600 dark:text-amber-400 me-auto ms-2">
              {charCount}/{MAX_CHARS}
            </span>
          )}
          <AdvisorModeSelector
            value={responseMode}
            onChange={setResponseMode}
            disabled={isStreaming}
          />
          {isStreaming && onAbort ? (
            <Button
              variant="outline"
              type="button"
              onClick={onAbort}
              className="text-muted-foreground hover:text-foreground rounded-full p-4"
            >
              <Square className="size-3.5 fill-current" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={cn(
                'transition-all p-4',
                canSubmit
                  ? 'bg-foreground text-background hover:bg-foreground/85'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              )}
            >
              <ArrowUp className="size-4" />
            </Button>
          )}
        </div>
      </div>

      <p className="text-center text-[11px] sm:mt-1 text-muted-foreground hidden sm:block">
        {m.advisor_shift_enter_hint()}
      </p>
    </div>
  );
}
