import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

type AdvisorContextCardProps = {
  label: string;
  value: string;
  detail?: string;
  icon: ReactNode;
  className?: string;
};

export function AdvisorContextCard({
  label,
  value,
  detail,
  icon,
  className,
}: AdvisorContextCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className={cn(
        'rounded-3xl border p-4 shadow-sm',
        'border-slate-200/80 bg-white/75',
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-normal text-slate-500">
            {label}
          </p>
          <p className="mt-2 line-clamp-2 text-base font-semibold text-slate-950">
            {value}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-200 p-2 text-slate-800">
          {icon}
        </div>
      </div>
      {detail ? (
        <p className="mt-3 text-sm leading-6 text-slate-600">{detail}</p>
      ) : null}
    </motion.div>
  );
}
