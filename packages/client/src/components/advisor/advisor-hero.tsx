import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { BrainCircuit, ShieldCheck } from 'lucide-react';

export function AdvisorHero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="overflow-hidden rounded-[2rem] border border-blue-200/80 bg-gradient-to-br from-blue-100 via-emerald-50 to-yellow-100 p-5 shadow-sm sm:p-7"
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge className="h-7 border-blue-300 bg-blue-200 px-3 text-blue-950">
              <BrainCircuit className="size-3.5" />
              Advisor
            </Badge>
            <Badge className="h-7 border-emerald-300 bg-emerald-200 px-3 text-emerald-950">
              <ShieldCheck className="size-3.5" />
              AICA context only
            </Badge>
          </div>
          <h1 className="text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
            Guided help for your pathway and roadmap
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">
            Use Advisor to understand fit, compare realistic options, adjust the
            roadmap around constraints, and decide the next step. It is not an
            open chatbot.
          </p>
        </div>
        <div className="rounded-3xl border border-white/70 bg-white/65 p-4 text-sm leading-6 text-slate-700 shadow-sm">
          Starts from your saved AICA context, then turns it into practical
          guidance you can act on.
        </div>
      </div>
    </motion.section>
  );
}
