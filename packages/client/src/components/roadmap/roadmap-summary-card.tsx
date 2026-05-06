import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

type RoadmapSummaryCardProps = {
  label: string;
  value: string | number;
  detail?: string;
  icon?: ReactNode;
  className?: string;
};

export function RoadmapSummaryCard({
  label,
  value,
  detail,
  icon,
  className,
}: RoadmapSummaryCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className={cn(
        'rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-sm shadow-slate-200/60',
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-normal text-slate-500">
            {label}
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-950">{value}</p>
        </div>
        {icon ? (
          <div className="rounded-full bg-slate-100 p-2 text-slate-700">
            {icon}
          </div>
        ) : null}
      </div>
      {detail ? (
        <p className="mt-3 text-sm leading-6 text-slate-600">{detail}</p>
      ) : null}
    </motion.div>
  );
}
