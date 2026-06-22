import type { DashboardNextActionType } from '@contracts/shared/types/dashboard-types';

import { m } from '../paraglide/messages';

export const DASHBOARD_NEXT_ACTION_DATA: Record<
  DashboardNextActionType,
  {
    title: string;
    description: string;
    ctaLabel: string;
    href: string;
  }
> = {
  complete_onboarding: {
    title: m.dashboard_next_action_complete_onboarding_title(),
    description: m.dashboard_next_action_complete_onboarding_description(),
    ctaLabel: m.dashboard_next_action_complete_onboarding_cta(),
    href: '/pathway-assessment',
  },

  review_recommendations: {
    title: m.dashboard_next_action_review_recommendations_title(),
    description: m.dashboard_next_action_review_recommendations_description(),
    ctaLabel: m.dashboard_next_action_review_recommendations_cta(),
    href: '/pathway-recommendations',
  },

  complete_roadmap_setup: {
    title: m.dashboard_next_action_complete_roadmap_setup_title(),
    description: m.dashboard_next_action_complete_roadmap_setup_description(),
    ctaLabel: m.dashboard_next_action_complete_roadmap_setup_cta(),
    href: '/roadmap-setup-assessment',
  },

  generate_roadmap: {
    title: m.dashboard_next_action_generate_roadmap_title(),
    description: m.dashboard_next_action_generate_roadmap_description(),
    ctaLabel: m.dashboard_next_action_generate_roadmap_cta(),
    href: '/app/roadmap',
  },

  continue_roadmap: {
    title: m.dashboard_next_action_continue_roadmap_title(),
    description: m.dashboard_next_action_continue_roadmap_description(),
    ctaLabel: m.dashboard_next_action_continue_roadmap_cta(),
    href: '/app/roadmap',
  },
};

export const DASHBOARD_STATUS_META = {
  needs_onboarding: m.dashboard_status_needs_onboarding(),
  needs_recommendations: m.dashboard_status_needs_recommendations(),
  needs_roadmap_setup: m.dashboard_status_needs_roadmap_setup(),
  needs_roadmap: m.dashboard_status_needs_roadmap(),
  active: m.dashboard_status_active(),
} as const;
