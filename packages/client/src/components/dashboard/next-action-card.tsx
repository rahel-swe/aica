import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

import type { DashboardResponse } from '@contracts/shared/types/dashboard-types';

import { m } from '../../paraglide/messages';

import {
  DASHBOARD_NEXT_ACTION_DATA,
  DASHBOARD_STATUS_META,
} from '@/constants/dashboard-data';
import { NextActionIcon } from './next-action-icon';

export function NextActionCard({
  dashboard,
}: {
  dashboard: DashboardResponse;
}) {
  const nextAction = DASHBOARD_NEXT_ACTION_DATA[dashboard.nextActionType];
  const meta = DASHBOARD_STATUS_META[dashboard.status];

  return (
    <Card className="rounded-3xl">
      <CardHeader className="space-y-4">
        <CardTitle className="rtl:font-sans md:text-xl">
          {m.dashboard_welcome_heading({
            name: dashboard?.profile?.name ?? '',
          })}
        </CardTitle>

        <CardDescription>{meta}</CardDescription>

        <div className="rounded-2xl border p-4">
          <div className="flex items-start gap-3">
            <Sparkles />

            <div>
              <p>{nextAction.title}</p>

              <p className="text-sm text-muted-foreground">
                {nextAction.description}
              </p>
            </div>
          </div>
        </div>

        <Button asChild className="py-6 w-min mx-auto px-8">
          <Link to={nextAction.href}>
            {nextAction.ctaLabel}

            <NextActionIcon
              type={dashboard.nextActionType}
              className="ml-2 h-4 w-4"
            />
          </Link>
        </Button>
      </CardHeader>
    </Card>
  );
}
