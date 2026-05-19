import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { advisorPrompts } from './advisor-ui-data';

type AdvisorPromptGridProps = {
  onPromptSelect: (prompt: string) => void;
};

export function AdvisorPromptGrid({ onPromptSelect }: AdvisorPromptGridProps) {
  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.055 } },
      }}
      className="flex flex-wrap justify-center gap-3 xl:grid-cols-3 max-w-4xl mx-auto"
    >
      {advisorPrompts.map(({ id, icon: Icon, intent, prompt, tone }) => (
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
          className="group rounded-2xl border bg-card p-2 px-3 text-left shadow-sm transition-colors hover:bg-muted/60 sm:max-w-xs"
        >
          <div className="flex flex-col items-start justify-between gap-3">
            <div className="flex items-center gap-2.5 text-sm">
              <Icon className={cn('size-4', tone)} />

              <p className="capitalize">{intent}</p>
            </div>
          </div>
        </motion.button>
      ))}
    </motion.section>
  );
}
