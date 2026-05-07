import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

export default function SpinnerBars({
  className,
  barClassName,
}: {
  className?: string;
  barClassName?: string;
}) {
  return (
    <div
      className={cn(
        'flex items-end gap-1.5 h-10 mx-auto self-center',
        className
      )}
    >
      {[0, 0.2, 0.4].map((delay, i) => (
        <motion.span
          key={i}
          className={cn('w-3 rounded-sm bg-current', barClassName)}
          animate={{
            height: ['10px', '40px', '10px'],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay,
          }}
        />
      ))}
    </div>
  );
}
