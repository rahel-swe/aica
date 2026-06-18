import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NextActionIcon } from './next-action-icon';
import type { DashboardResponse } from '@contracts/shared/types/dashboard-types';

export function NextActionCard({
  dashboard,
}: {
  dashboard: DashboardResponse;
}) {
  const meta = {
    needs_onboarding: 'Finish setup to unlock recommendations.',
    needs_recommendations: 'Your profile is ready.',
    needs_roadmap_setup: 'Pick a pathway.',
    needs_roadmap: 'Generate your roadmap.',
    active: 'Everything is in motion.',
  }[dashboard.status];

  return (
    <Card className="rounded-3xl">
      <CardHeader className="space-y-4">
        <CardTitle>
          {dashboard.profile.name
            ? `Welcome back, ${dashboard.profile.name}`
            : 'Welcome back'}
        </CardTitle>

        <CardDescription>{meta}</CardDescription>

        <div className="rounded-2xl border p-4">
          <div className="flex items-start gap-3">
            <Sparkles />
            <div>
              <p>{dashboard.nextAction.title}</p>
              <p className="text-sm text-muted-foreground">
                {dashboard.nextAction.description}
              </p>
            </div>
          </div>
        </div>

        <Button asChild>
          <Link to={dashboard.nextAction.href}>
            {dashboard.nextAction.ctaLabel}
            <NextActionIcon
              type={dashboard.nextAction.type}
              className="ml-2 h-4 w-4"
            />
          </Link>
        </Button>
      </CardHeader>
    </Card>
  );
}
