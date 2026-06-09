import type { PathwayAssessmentStepType } from '@/constants/pathway-assessment-steps-data';

import {
  ChevronLeft,
  ChevronRight,
  Pencil,
  Send,
  type LucideIcon,
} from 'lucide-react';

type NavigationAction = {
  label: string;
  icon?: LucideIcon;
};

type NavigationActions = {
  secondary?: NavigationAction;
  primary: NavigationAction;
};

export function getPathwayAssessmentNavigationActions(
  stepType: PathwayAssessmentStepType,
  isSubmitting: boolean
): NavigationActions {
  const isIntro = stepType === 'intro';
  const isCTA = stepType === 'cta';

  return {
    secondary: isIntro
      ? undefined
      : {
          label: isCTA ? 'Edit answers' : 'Go back',

          icon: isCTA ? Pencil : ChevronLeft,
        },

    primary: {
      label: isSubmitting
        ? 'Saving...'
        : isIntro
          ? 'Let’s begin'
          : isCTA
            ? 'See my matches'
            : 'Keep going',

      icon: isSubmitting ? undefined : isCTA ? Send : ChevronRight,
    },
  };
}
