import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { AdvisorIntent } from '@contracts/shared/types/advisor-types';
import { advisorPrompts, toneClasses } from './advisor-ui-data';

type AdvisorPromptGridProps = {
  activeIntent: AdvisorIntent;
  onPromptSelect: (prompt: string, intent: AdvisorIntent) => void;
};

export function AdvisorPromptGrid({
  activeIntent,
  onPromptSelect,
}: AdvisorPromptGridProps) {
  const visiblePrompts = advisorPrompts.filter(
    (prompt) => prompt.intent === activeIntent || activeIntent === 'roadmap'
  );

  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.06 } },
      }}
      className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
    >
      {visiblePrompts.map((prompt) => {
        const tone = toneClasses[prompt.tone];

        return (
          <motion.button
            key={prompt.id}
            type="button"
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0 },
            }}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onClick={() => onPromptSelect(prompt.prompt, prompt.intent)}
            className={`rounded-3xl border p-4 text-left shadow-sm transition ${tone.card}`}
          >
            <div className="flex items-start justify-between gap-3">
              <Badge className={tone.badge}>{prompt.intent}</Badge>
              <span className={`rounded-full p-2 ${tone.icon}`}>
                <ArrowUpRight className="size-4" />
              </span>
            </div>
            <h3 className="mt-4 text-base font-semibold text-slate-950">
              {prompt.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {prompt.description}
            </p>
          </motion.button>
        );
      })}
    </motion.section>
  );
}
