import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { MoreHorizontal } from 'lucide-react';
import { advisorPrompts, type AdvisorPrompt } from './advisor-ui-data';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

type AdvisorPromptGridProps = {
  onPromptSelect: (prompt: AdvisorPrompt) => void;
};

export function AdvisorPromptGrid({ onPromptSelect }: AdvisorPromptGridProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const checkOverflow = () => {
      setHasOverflow(el.scrollWidth > el.clientWidth + 1);
    };

    checkOverflow();

    const ro = new ResizeObserver(checkOverflow);
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  return (
    <div className="relative max-w-xs sm:max-w-2xl mx-auto w-full">
      <ScrollArea className="w-full">
        <motion.div
          ref={scrollerRef}
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.055 } },
          }}
          className="flex w-max items-center gap-3 ps-6 pe-2 py-2"
        >
          {advisorPrompts.map((prompt) => {
            const { id, icon: Icon, mode, tone } = prompt;

            return (
              <motion.button
                key={id}
                type="button"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                onClick={() => onPromptSelect(prompt)}
                className="shrink-0 group rounded-xl border bg-card py-2 px-3 transition-colors hover:bg-muted/60 h-min"
              >
                <div className="flex items-center gap-2 text-sm">
                  <Icon className={cn('size-4', tone)} />
                  <p className="capitalize text-muted-foreground">
                    {mode === 'guide_step' ? 'Guide' : mode.replace('_', ' ')}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {hasOverflow && (
        <div className="absolute right-1 top-1/2 -translate-y-1/2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 rounded-full"
              >
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              {advisorPrompts.map((prompt) => {
                const { id, icon: Icon, mode, tone } = prompt;

                return (
                  <DropdownMenuItem
                    key={id}
                    onClick={() => onPromptSelect(prompt)}
                    className="flex items-center gap-2"
                  >
                    <Icon className={cn('size-4', tone)} />
                    <span className="capitalize">
                      {mode === 'guide_step' ? 'Guide' : mode.replace('_', ' ')}
                    </span>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}
