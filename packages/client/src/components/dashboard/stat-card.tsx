import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

export function StatCard({
  label,
  value,
  helper,
  icon: Icon,
}: {
  label: string;
  value: string;
  helper?: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Card>
      <CardContent>
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-xl font-semibold">{value}</p>
            <p className="text-sm text-muted-foreground">{helper}</p>
          </div>

          <Icon className="h-5 w-5" />
        </div>
      </CardContent>
    </Card>
  );
}
