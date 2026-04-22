import StepNavigation from '@/components/onboarding/step-navigation';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export default function StepLayout({
  title,
  subtitle,
  className,
  children,
  disabled,
}: {
  title: string;
  subtitle?: string;
  className?: string;
  children: ReactNode;
  disabled: boolean;
}) {
  return (
    <div className={cn('flex flex-col gap-12 text-center max-w-sm', className)}>
      <h2 className="text-4xl">{title}</h2>
      {subtitle && <p>{subtitle}</p>}

      {children}
      <StepNavigation disableNextButton={disabled} />
    </div>
  );
}
