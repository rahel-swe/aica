import {
  ChevronLeft,
  ChevronRight,
  ClipboardPen,
  type LucideIcon,
  Check,
} from 'lucide-react';

import { m } from '../paraglide/messages';

type StepId = 'welcome' | 'finish' | string;

type NavigationAction = {
  label: string;
  icon?: LucideIcon;
};

type NavigationActions = {
  secondary: NavigationAction;
  primary: NavigationAction;
};

export function getRoadmapNavigationActions(stepId: StepId): NavigationActions {
  const isWelcome = stepId === 'welcome';
  const isFinish = stepId === 'finish';

  return {
    secondary: {
      label: isWelcome
        ? m.roadmap_navigation_maybe_later()
        : isFinish
          ? m.roadmap_navigation_review_answers()
          : m.roadmap_navigation_go_back(),

      icon: isWelcome ? undefined : isFinish ? ClipboardPen : ChevronLeft,
    },

    primary: {
      label: isWelcome
        ? m.roadmap_navigation_lets_build_it()
        : isFinish
          ? m.roadmap_navigation_submit_answers()
          : m.roadmap_navigation_keep_going(),

      icon: isFinish ? Check : ChevronRight,
    },
  };
}
