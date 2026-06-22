import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

export function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Card className="rounded-2xl py-4">
      <CardContent className="flex justify-between text-start rounded-4xl py-0">
        <Icon className="size-6" />
        <div className="text-end">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-xl font-semibold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
