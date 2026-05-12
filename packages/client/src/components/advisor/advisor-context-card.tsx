import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

type AdvisorContextCardProps = {
  label: string;
  value: string;
  detail?: string;
  icon: ReactNode;
  // Accent class applied only to the icon container — keeps card background theme-neutral
  iconClassName?: string;
};

export function AdvisorContextCard({
  label,
  value,
  detail,
  icon,
  iconClassName,
}: AdvisorContextCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="rounded-2xl border bg-card p-4 shadow-sm"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
          <p className="mt-2 line-clamp-2 text-sm font-semibold text-foreground">
            {value}
          </p>
        </div>
        <div
          className={cn(
            'shrink-0 rounded-xl p-2 text-foreground',
            iconClassName ?? 'bg-muted'
          )}
        >
          {icon}
        </div>
      </div>
      {detail ? (
        <p className="mt-3 text-xs leading-5 text-muted-foreground">{detail}</p>
      ) : null}
    </motion.div>
  );
}
