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

export const roadmapSetupDefaultValues: RoadmapSetupAssessmentFormValues = {
  constraints: [],
  currentStage: 'self_learning',
  roadmapStyle: 'balanced',
  timeline: 'medium',
  weeklyTime: 'medium',
};

// Roadmap step IDs
export type RoadmapStepId =
  | 'welcome'
  | 'current-stage'
  | 'weekly-time'
  | 'timeline'
  | 'constraints'
  | 'roadmap-style'
  | 'finish';

// Roadmap step type (reuse existing OnboardingStepType)
export type RoadmapSetupStep = {
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
    label: 'In school',
    description:
      'You are still in school and need a realistic starting direction.',
    emoji: '🏫',
  },
  {
    value: 'university',
    label: 'University student',
    description:
      'You are studying now and want a clearer path, stronger skills, or both.',
    emoji: '🎓',
  },
  {
    value: 'graduate',
    label: 'Recent graduate',
    description:
      'You finished formal study and want to move into the next real step.',
    emoji: '📜',
  },
  {
    value: 'self_learning',
    label: 'Self-learner',
    description:
      'You are learning on your own and need structure, focus, and proof of progress.',
    emoji: '💻',
  },
  {
    value: 'working',
    label: 'Working now',
    description:
      'You are already working and want to grow, switch, or reposition carefully.',
    emoji: '💼',
  },
];

const weeklyTimeOptions: PathwayAssessmentOption[] = [
  {
    value: 'low',
    label: '2-4 hours',
    description: 'Light pace for small consistent progress each week.',
    emoji: '🐢',
  },
  {
    value: 'medium',
    label: '5-7 hours',
    description: 'A realistic steady pace for most people.',
    emoji: '⚖️',
  },
  {
    value: 'high',
    label: '8-12 hours',
    description: 'Focused effort with faster visible progress.',
    emoji: '🚀',
  },
  {
    value: 'intense',
    label: '13+ hours',
    description: 'An accelerated pace that needs strong weekly consistency.',
    emoji: '🔥',
  },
];

const timelineOptions: PathwayAssessmentOption[] = [
  {
    value: 'short',
    label: '4-6 weeks',
    description: 'Optimize for a quick start and immediate traction.',
    emoji: '⚡',
  },
  {
    value: 'medium',
    label: '2-3 months',
    description: 'A balanced planning window with strong visible progress.',
    emoji: '📈',
  },
  {
    value: 'long',
    label: '4-6 months',
    description:
      'A longer action window for stronger foundations and better sequencing.',
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
    value: 'inconsistent_schedule',
    label: 'Schedule changes often',
    description: 'Need a roadmap that can survive busy or unpredictable weeks.',
    emoji: '🗓️',
  },
];

const roadmapStyleOptions: PathwayAssessmentOption[] = [
  {
    value: 'fast_track',
    label: 'Move faster',
    description:
      'Bias toward practical momentum, earlier output, and faster entry steps.',
    emoji: '🚀',
  },
  {
    value: 'balanced',
    label: 'Balanced growth',
    description:
      'Mix fundamentals and practical work in a steady, sustainable way.',
    emoji: '⚖️',
  },
  {
    value: 'deep',
    label: 'Strong foundations',
    description:
      'Go deeper on core understanding before pushing hard on speed.',
    emoji: '🧠',
  },
];

export const ROADMAP_SETUP_STEPS: RoadmapSetupStep[] = [
  {
    id: 'welcome',
    type: 'intro',
    title: 'Let AICA shape the right roadmap for this pathway',
    description:
      'Answer a few short planning questions. AICA will use them to shape a roadmap that fits your stage, time, constraints, and pace instead of giving everyone the same plan.',
    helperText:
      'Be realistic. The better your inputs, the more useful your roadmap will be.',
  },
  {
    id: 'current-stage',
    type: 'single-select',
    title: 'Where are you starting from right now?',
    description:
      'This helps AICA decide whether to begin with exploration, study preparation, portfolio work, or market-entry steps.',
    fieldName: 'currentStage',
    options: currentStageOptions,
  },
  {
    id: 'weekly-time',
    type: 'single-select',
    title: 'How much focused time can you realistically give each week?',
    description:
      'Choose your real weekly capacity, not your best-case motivation.',
    fieldName: 'weeklyTime',
    options: weeklyTimeOptions,
  },
  {
    id: 'timeline',
    type: 'single-select',
    title: 'What planning window should this roadmap optimize for?',
    description:
      'This is the first action window, not the full career duration.',
    fieldName: 'timeline',
    options: timelineOptions,
  },
  {
    id: 'constraints',
    type: 'multi-select',
    title: 'What should the roadmap work around?',
    description:
      'Pick only the constraints that are actually likely to affect your next steps.',
    fieldName: 'constraints',
    minSelect: 0,
    maxSelect: 3,
    options: constraintOptions,
  },
  {
    id: 'roadmap-style',
    type: 'single-select',
    title: 'How should the roadmap feel?',
    description:
      'This changes the balance between speed, depth, and sustainability.',
    fieldName: 'roadmapStyle',
    options: roadmapStyleOptions,
  },
  {
    id: 'finish',
    type: 'cta',
    title: 'Your roadmap setup is ready',
    description:
      'AICA now has the planning context it needs to generate a more realistic roadmap for your selected pathway.',
    helperText: 'Submit to save your setup and continue.',
  },
] as const;
