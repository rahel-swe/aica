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
      className={cn('rounded-2xl border p-4', className)}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-normal">
            {label}
          </p>
          <p className="mt-2 text-2xl font-semibold">{value}</p>
        </div>
        {icon ? <div className="rounded-full p-2">{icon}</div> : null}
      </div>
      {detail ? (
        <p className="mt-3 text-sm leading-6 text-slate-600">{detail}</p>
      ) : null}
    </motion.div>
  );
}
