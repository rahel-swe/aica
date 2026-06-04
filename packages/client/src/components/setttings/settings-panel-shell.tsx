import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

type SettingsPanelShellProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  header?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
};

const SettingsPanelShell = ({
  icon: Icon,
  title,
  description,
  header,
  children,
  footer,
  className,
}: SettingsPanelShellProps) => {
  return (
    <Card className={cn('bg-background ring-0 shadow-none', className)}>
      {header ? <div className="pt-1">{header}</div> : null}

      <CardContent className="space-y-5 p-5">
        <div className="flex items-start gap-3">
          <Icon className="mt-1 size-6.5 shrink-0" />
          <div>
            <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          </div>
        </div>

        <Separator />

        <div className="grid gap-4">{children}</div>

        {footer ? <div className="pt-1">{footer}</div> : null}
      </CardContent>
    </Card>
  );
};

export default SettingsPanelShell;
