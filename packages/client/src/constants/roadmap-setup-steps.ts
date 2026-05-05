import type {
  PathwayAssessmentOption,
  PathwayAssessmentStepType,
} from './pathway-assessment-steps';

import type { RoadmapSetupAssessmentFormValues } from '@contracts/shared/types/roadmap-setup-assessment-types';

// export type RoadmapCurrentStage =
//   | 'high_school'
//   | 'university'
//   | 'graduate'
//   | 'self_learning'
//   | 'working';

// export type RoadmapWeeklyTime = 'low' | 'medium' | 'high' | 'intense';

// export type RoadmapTimeline = 'short' | 'medium' | 'long';

// export type RoadmapConstraint =
//   | 'low_budget'
//   | 'weak_internet'
//   | 'no_laptop'
//   | 'beginner'
//   | 'fast_track';

// export type RoadmapStyle = 'fast_track' | 'balanced' | 'deep';

export const roadmapSetupDefaultValues = {
  pickedPathwayId: '',
  currentStage: '',
  weeklyTime: '',
  timeline: '',
  constraints: [],
  roadmapStyle: '',
};

// Roadmap step IDs
export type RoadmapStepId =
  | 'current-stage'
  | 'weekly-time'
  | 'timeline'
  | 'constraints'
  | 'roadmap-style';

// Roadmap step type (reuse existing OnboardingStepType)
export type RoadmapStep = {
  id: RoadmapStepId;
  type: PathwayAssessmentStepType;
  title: string;
  description?: string;
  helperText?: string;
  fieldName?: keyof RoadmapSetupAssessmentFormValues;
  minSelect?: number;
  maxSelect?: number;
  options?: PathwayAssessmentOption[];
};

const currentStageOptions: PathwayAssessmentOption[] = [
  {
    value: 'high_school',
    label: 'High school',
    description: 'You are still studying and exploring your direction.',
    emoji: '🏫',
  },
  {
    value: 'university',
    label: 'University student',
    description: 'You are studying but want clearer direction or skills.',
    emoji: '🎓',
  },
  {
    value: 'graduate',
    label: 'Graduate',
    description: 'You finished studies and want to move into a career.',
    emoji: '📜',
  },
  {
    value: 'self_learning',
    label: 'Self-learner',
    description: 'You are learning independently without formal education.',
    emoji: '💻',
  },
  {
    value: 'working',
    label: 'Working professional',
    description: 'You are working and want to shift or grow your path.',
    emoji: '💼',
  },
];

const weeklyTimeOptions: PathwayAssessmentOption[] = [
  {
    value: 'low',
    label: '1–3 hours',
    description: 'Light commitment, slow and steady progress.',
    emoji: '🐢',
  },
  {
    value: 'medium',
    label: '3–6 hours',
    description: 'Balanced pace with consistent improvement.',
    emoji: '⚖️',
  },
  {
    value: 'high',
    label: '6–10 hours',
    description: 'Focused effort with faster results.',
    emoji: '🚀',
  },
  {
    value: 'intense',
    label: '10+ hours',
    description: 'Aggressive pace, high commitment.',
    emoji: '🔥',
  },
];

const timelineOptions: PathwayAssessmentOption[] = [
  {
    value: 'short',
    label: '1–2 months',
    description: 'Quick start, focus on immediate results.',
    emoji: '⚡',
  },
  {
    value: 'medium',
    label: '3–6 months',
    description: 'Build solid skills with visible progress.',
    emoji: '📈',
  },
  {
    value: 'long',
    label: '6–12 months',
    description: 'Deep learning with strong foundation.',
    emoji: '🏗️',
  },
];

const constraintOptions: PathwayAssessmentOption[] = [
  {
    value: 'low_budget',
    label: 'Low budget',
    description: 'Prefer free or low-cost learning resources.',
    emoji: '💸',
  },
  {
    value: 'weak_internet',
    label: 'Limited internet',
    description: 'Need offline-friendly or lightweight content.',
    emoji: '📡',
  },
  {
    value: 'no_laptop',
    label: 'No laptop access',
    description: 'Must work with mobile or limited devices.',
    emoji: '📱',
  },
  {
    value: 'beginner',
    label: 'Start from basics',
    description: 'Need beginner-friendly steps and explanations.',
    emoji: '🌱',
  },
  {
    value: 'fast_track',
    label: 'Need fast results',
    description: 'Prioritize speed over depth.',
    emoji: '⚡',
  },
];

const roadmapStyleOptions: PathwayAssessmentOption[] = [
  {
    value: 'fast_track',
    label: 'Fast track',
    description: 'Skip theory, focus on practical results quickly.',
    emoji: '🚀',
  },
  {
    value: 'balanced',
    label: 'Balanced',
    description: 'Mix of theory and practice for steady growth.',
    emoji: '⚖️',
  },
  {
    value: 'deep',
    label: 'Deep learning',
    description: 'Strong fundamentals with long-term mastery.',
    emoji: '🧠',
  },
];

export const ROADMAP_SETUP_STEPS: RoadmapStep[] = [
  {
    id: 'current-stage',
    type: 'single-select',
    title: 'Where are you starting from?',
    fieldName: 'currentStage',
    options: currentStageOptions,
  },
  {
    id: 'weekly-time',
    type: 'single-select',
    title: 'Weekly time you can commit',
    fieldName: 'weeklyTime',
    options: weeklyTimeOptions,
  },
  {
    id: 'timeline',
    type: 'single-select',
    title: 'Target timeline',
    fieldName: 'timeline',
    options: timelineOptions,
  },
  {
    id: 'constraints',
    type: 'multi-select',
    title: 'Any constraints?',
    fieldName: 'constraints',
    minSelect: 0,
    maxSelect: 2,
    options: constraintOptions,
  },
  {
    id: 'roadmap-style',
    type: 'single-select',
    title: 'Roadmap style',
    fieldName: 'roadmapStyle',
    options: roadmapStyleOptions,
  },
] as const;
