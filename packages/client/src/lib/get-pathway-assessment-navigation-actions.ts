import type { PathwayAssessmentStepType } from '@/constants/pathway-assessment-steps-data';

import { m } from '../paraglide/messages';

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
          label: isCTA
            ? m.pathway_assessment_navigation_edit_answers()
            : m.pathway_assessment_navigation_go_back(),
          icon: isCTA ? Pencil : ChevronLeft,
        },

    primary: {
      label: isSubmitting
        ? m.pathway_assessment_navigation_saving()
        : isIntro
          ? m.pathway_assessment_navigation_lets_begin()
          : isCTA
            ? m.pathway_assessment_navigation_see_my_matches()
            : m.pathway_assessment_navigation_keep_going(),
      icon: isSubmitting ? undefined : isCTA ? Send : ChevronRight,
    },
  };
}
