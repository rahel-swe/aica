import { cn } from '@/lib/utils';

export default function SpinnerBars({
  className,
  barDivClassName,
  barClassName,
}: {
  className?: string;
  barDivClassName?: string;
  barClassName?: string;
}) {
  return (
    <div className={cn('min-h-dvh grid place-items-cetner', className)}>
      <style>{`
        .spinner-bars-bar {
          height: 6px;
          animation: spinner-bars 0.8s ease-in-out infinite;
        }
        @keyframes spinner-bars {
          0%, 100% { height: 6px; }
          50% { height: 20px; }
        }
      `}</style>
      <div
        className={cn(
          `flex items-end gap-1 h-5 mx-auto self-center`,
          barDivClassName
        )}
      >
        {[0, 0.2, 0.4].map((delay, i) => (
          <span
            key={i}
            className={cn(
              `w-1.5 rounded-sm bg-current spinner-bars-bar`,
              barClassName
            )}
            style={{ animationDelay: `${delay}s` }}
          />
        ))}
      </div>
    </div>
  );
}
