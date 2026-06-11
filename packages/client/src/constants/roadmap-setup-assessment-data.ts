import {
  School,
  GraduationCap,
  Award,
  Laptop,
  Briefcase,
  Coffee,
  Clock,
  Zap,
  Flame,
  Wind,
  CalendarDays,
  TrendingUp,
  Map,
  Wallet,
  WifiOff,
  Smartphone,
  Leaf,
  CalendarOff,
  Rocket,
  Scale,
  Brain,
} from 'lucide-react';

import type {
  PathwayAssessmentOption,
  PathwayAssessmentStepType,
} from './pathway-assessment-steps-data';

import type { RoadmapSetupAssessmentFormValues } from '@contracts/shared/types/roadmap-setup-assessment-types';

export const roadmapSetupDefaultValues: RoadmapSetupAssessmentFormValues = {
  constraints: ['beginner'],
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
    icon: School,
  },
  {
    value: 'university',
    label: 'University student',
    description:
      'You are studying now and want a clearer path, stronger skills, or both.',
    icon: GraduationCap,
  },
  {
    value: 'graduate',
    label: 'Recent graduate',
    description:
      'You finished formal study and want to move into the next real step.',
    icon: Award,
  },
  {
    value: 'self_learning',
    label: 'Self-learner',
    description:
      'You are learning on your own and need structure, focus, and proof of progress.',
    icon: Laptop,
  },
  {
    value: 'working',
    label: 'Working now',
    description:
      'You are already working and want to grow, switch, or reposition carefully.',
    icon: Briefcase,
  },
];

const weeklyTimeOptions: PathwayAssessmentOption[] = [
  {
    value: 'low',
    label: '2–4 hours / week',
    description: 'Light pace for small consistent progress each week.',
    icon: Coffee,
  },
  {
    value: 'medium',
    label: '5–8 hours / week',
    description:
      'Steady progress without burning out — fits most lifestyles and commitments.',
    icon: Clock,
  },
  {
    value: 'high',
    label: '9–12 hours / week',
    description: 'Focused effort with faster visible progress.',
    icon: Zap,
  },
  {
    value: 'intense',
    label: '13+ hours / week',
    description: 'An accelerated pace that needs strong weekly consistency.',
    icon: Flame,
  },
];

const timelineOptions: PathwayAssessmentOption[] = [
  {
    value: 'sprint',
    label: '4–8 weeks',
    description:
      'A quick-start window — fast clarity, first wins, and immediate momentum.',
    icon: Wind,
  },
  {
    value: 'short',
    label: '2–3 months',
    description:
      'One structured quarter — meaningful progress you can measure and build on.',
    icon: CalendarDays,
  },
  {
    value: 'medium',
    label: '6 months',
    description:
      'Half-year plan — a complete roadmap for most tech and creative paths.',
    icon: TrendingUp,
  },
  {
    value: 'long',
    label: '12 months',
    description:
      'Full-year commitment — complete for self-contained paths, first major phase for complex careers.',
    icon: Map,
  },
];

const constraintOptions: PathwayAssessmentOption[] = [
  {
    value: 'low_budget',
    label: 'Low budget',
    description: 'Prefer free or low-cost learning resources.',
    icon: Wallet,
  },
  {
    value: 'weak_internet',
    label: 'Limited internet',
    description: 'Need offline-friendly or lightweight content.',
    icon: WifiOff,
  },
  {
    value: 'no_laptop',
    label: 'No laptop access',
    description: 'Must work with mobile or limited devices.',
    icon: Smartphone,
  },
  {
    value: 'beginner',
    label: 'Start from basics',
    description: 'Need beginner-friendly steps and explanations.',
    icon: Leaf,
  },
  {
    value: 'inconsistent_schedule',
    label: 'Schedule changes often',
    description: 'Need a roadmap that can survive busy or unpredictable weeks.',
    icon: CalendarOff,
  },
];

const roadmapStyleOptions: PathwayAssessmentOption[] = [
  {
    value: 'fast_track',
    label: 'Fast practical progress',

    description:
      'Jump into projects early — learn by building, not by waiting to feel ready.',
    icon: Rocket,
  },
  {
    value: 'balanced',
    label: 'Balanced growth',
    description:
      'Mix fundamentals and practical work in a steady, sustainable way.',
    icon: Scale,
  },
  {
    value: 'deep',
    label: 'Strong foundations',
    description:
      'Go deeper on core understanding before pushing hard on speed.',
    icon: Brain,
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
    title: 'How far should this roadmap plan ahead?',

    helperText:
      'For tech paths like frontend or backend development, 6–12 months can be your complete roadmap. For longer careers like civil engineering or medicine, the same window is your first major action phase — not your full timeline.',
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
    description: 'Submit to save your setup and continue.',
  },
] as const;
