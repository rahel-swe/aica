import type {
  PathwayAssessmentOption,
  PathwayAssessmentStepType,
} from './pathway-assessment-steps-data';

import type { RoadmapSetupAssessmentFormValues } from '@contracts/shared/types/roadmap-setup-assessment-types';

export const roadmapSetupDefaultValues: RoadmapSetupAssessmentFormValues = {
  constraints: [],
  currentStage: 'self_learning',
  roadmapStyle: 'balanced',
  timeline: 'medium',
  weeklyTime: 'medium',
};

export type RoadmapStepId =
  | 'welcome'
  | 'current-stage'
  | 'weekly-time'
  | 'timeline'
  | 'constraints'
  | 'roadmap-style'
  | 'finish';

export type RoadmapSetupStep = {
  id: RoadmapStepId;
  type: PathwayAssessmentStepType;
  title: string;
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
    label: '2-4 hours / week',
    description: 'Light pace for small consistent progress each week.',
    emoji: '🐢',
  },
  {
    value: 'medium',
    label: '5-8 hours / week',
    description: 'A realistic steady pace for most people.',
    emoji: '⚖️',
  },
  {
    value: 'high',
    label: '9-12 hours / week',
    description: 'Focused effort with faster visible progress.',
    emoji: '🚀',
  },
  {
    value: 'intense',
    label: '13+ hours / week',
    description: 'An accelerated pace that needs strong weekly consistency.',
    emoji: '🔥',
  },
];

const timelineOptions: PathwayAssessmentOption[] = [
  {
    value: 'short',
    label: '4-6 weeks',
    description: 'A short first action window for quick clarity and traction.',
    emoji: '⚡',
  },
  {
    value: 'medium',
    label: '2-3 months',
    description:
      'A balanced first action window for visible progress without overload.',
    emoji: '📈',
  },
  {
    value: 'long',
    label: '4-6 months',
    description:
      'The longest first action window, useful for foundations and sequencing.',
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
    label: 'Fast practical progress',
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
    title: "Let's set up your first action plan",
    helperText:
      'This will shape your next realistic roadmap window, not your full career timeline.',
  },
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
    title: 'How much focused time can you realistically give each week?',
    fieldName: 'weeklyTime',
    options: weeklyTimeOptions,
  },
  {
    id: 'timeline',
    type: 'single-select',
    title: 'How far should this first roadmap plan ahead?',
    helperText:
      'AICA plans the next action window here. Long careers still have a separate full pathway timeline.',
    fieldName: 'timeline',
    options: timelineOptions,
  },
  {
    id: 'constraints',
    type: 'multi-select',
    title: 'What could make progress harder?',
    fieldName: 'constraints',
    minSelect: 0,
    maxSelect: 3,
    options: constraintOptions,
  },
  {
    id: 'roadmap-style',
    type: 'single-select',
    title: 'What kind of plan fits you best?',
    fieldName: 'roadmapStyle',
    options: roadmapStyleOptions,
  },
  {
    id: 'finish',
    type: 'cta',
    title: 'Your roadmap setup is ready',
    helperText: 'Submit to save your setup and continue.',
  },
] as const;
