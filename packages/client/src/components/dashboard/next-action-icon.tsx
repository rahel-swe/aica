import { ArrowRight, BrainCircuit, Rocket, Target, Users } from 'lucide-react';

import type { DashboardNextActionType } from '@contracts/shared/types/dashboard-types';

export function NextActionIcon({
  type,
  className,
}: {
  type: DashboardNextActionType;
  className?: string;
}) {
  switch (type) {
    case 'complete_onboarding':
      return <Users className={className} />;

    case 'review_recommendations':
      return <BrainCircuit className={className} />;

    case 'complete_roadmap_setup':
      return <Target className={className} />;

    case 'generate_roadmap':
      return <Rocket className={className} />;

    default:
      return <ArrowRight className={className} />;
  }
}
