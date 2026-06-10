interface FloatingBadgeProps {
  style?: React.CSSProperties;
  delay?: string;
  children: React.ReactNode;
}

const FloatingBadge = ({
  style,
  delay = '0ms',
  children,
}: FloatingBadgeProps) => {
  return (
    <div
      className="absolute px-3.5 py-2.5 rounded-2xl bg-card border border-border text-xs font-semibold whitespace-nowrap abfl"
      style={{
        boxShadow: '0 4px 24px -6px oklch(0 0 0 / 0.14)',
        animationDelay: delay,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default FloatingBadge;
