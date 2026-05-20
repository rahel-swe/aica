import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ClipboardPen,
  type LucideIcon,
} from 'lucide-react';

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
        ? 'Maybe later'
        : isFinish
          ? 'Review answers'
          : 'Go back',

      icon: isWelcome ? undefined : isFinish ? ClipboardPen : ChevronLeft,
    },

    primary: {
      label: isWelcome
        ? 'Let’s build it'
        : isFinish
          ? 'Create my roadmap'
          : 'Keep going',

      icon: isFinish ? Sparkles : ChevronRight,
    },
  };
}
