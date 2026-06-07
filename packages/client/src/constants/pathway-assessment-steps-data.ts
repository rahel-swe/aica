/**
 * pathway-assessment-data.ts
 *
 * Changes from original:
 *  1. emoji: string  →  icon: LucideIcon  (type + field rename)
 *  2. Added lucide-react imports (37 unique icons)
 *  3. Targeted copy rewrites — 2 labels, 7 descriptions (see REWRITE comments)
 *     Everything else left intact — the structure and format were already solid.
 */

import { type LucideIcon } from 'lucide-react';
import {
  // ── Strengths
  Puzzle, // problem_solving
  Palette, // creativity  (reused: express impact)
  Users, // people      (reused: socialize free-time, people impact)
  BarChart3, // analytical
  MessageCircle, // communication
  Wrench, // hands_on
  Zap, // fast_learning
  Target, // organized
  // ── Subjects
  Calculator, // math
  FlaskConical, // science     (reused: lab environment)
  Pencil, // writing
  Paintbrush, // arts
  Globe, // social/history
  // ── Passions
  Monitor, // tech
  Music, // music
  Activity, // sports
  BookOpen, // reading
  Microscope, // science     (reused: discover impact)
  Handshake, // social
  Leaf, // nature
  Hammer, // building    (reused: build free-time)
  Lightbulb, // ideas       (reused: create impact)
  // ── Free Time
  Sun, // outdoor
  Gamepad2, // consume
  Brain, // learn
  // ── Environment
  Building2, // office
  Home, // remote
  Trees, // outdoor env
  Shuffle, // mixed
  // ── Work Style
  TrendingUp, // analyze
  Heart, // help
  Layers, // build/fix
  Sparkles, // create
  Compass, // routine
  // ── Goals
  Star, // impact
  DollarSign, // money
  Scale, // balance
  GraduationCap, // growth
  Rocket, // variety
  // ── Impact
  Network, // systems
} from 'lucide-react';

import type {
  PathwayAssessmentFormValues,
  PathwayAssessmentFreeTime,
  PathwayAssessmentGoal,
  PathwayAssessmentImpact,
  PathwayAssessmentPassion,
  PathwayAssessmentStrength,
  PathwayAssessmentSubject,
  PathwayAssessmentWorkEnvironment,
  PathwayAssessmentWorkStyle,
} from '@contracts/shared/types/pathway-assessment-types';

// ─────────────────────────────────────────────────────────────────────────────

export type PathwayAssessmentStepId =
  | 'welcome'
  | 'strengths'
  | 'subjects'
  | 'passions'
  | 'free-time'
  | 'work-environment'
  | 'work-style'
  | 'impact'
  | 'goals'
  | 'finish';

export type PathwayAssessmentStepType =
  | 'intro'
  | 'multi-select'
  | 'single-select'
  | 'cta';

export type PathwayAssessmentOption = {
  value: string;
  label: string;
  description: string;
  icon: LucideIcon; // ← was: emoji: string
};

export type PathwayAssessmentStep = {
  id: PathwayAssessmentStepId;
  type: PathwayAssessmentStepType;
  title: string;
  description?: string;
  helperText?: string;
  cta?: string;
  fieldName?: keyof PathwayAssessmentFormValues;
  minSelect?: number;
  maxSelect?: number;
  options?: PathwayAssessmentOption[];
};

// ─────────────────────────────────────────────────────────────────────────────

export const PATHWAY_ASSESSMENT_STORAGE_KEY = 'aica-onboarding-draft';

export const pathwayAssessmentDefaultValues = {
  strengths: [],
  subjects: '',
  passions: [],
  freeTime: '',
  workEnvironment: '',
  workStyle: '',
  impact: '',
  goals: '',
};

// ─── Strengths ────────────────────────────────────────────────────────────────

const strengthOptions: PathwayAssessmentOption[] = [
  {
    value: 'problem_solving' satisfies PathwayAssessmentStrength,
    label: 'Problem solving',
    description:
      'You like breaking down hard problems and finding practical answers.',
    icon: Puzzle,
  },
  {
    value: 'creativity' satisfies PathwayAssessmentStrength,
    label: 'Creative thinking',
    description: 'You enjoy original ideas, design, and expressive work.',
    icon: Palette,
  },
  {
    value: 'people' satisfies PathwayAssessmentStrength,
    label: 'People connection',
    description: 'You naturally support, guide, or connect with others.',
    icon: Users,
  },
  {
    value: 'analytical' satisfies PathwayAssessmentStrength,
    label: 'Analytical mind',
    description: 'You notice patterns, structure, and logical detail quickly.',
    icon: BarChart3,
  },
  {
    value: 'communication' satisfies PathwayAssessmentStrength,
    label: 'Communication',
    description:
      'You explain ideas clearly and make information easier to understand.',
    icon: MessageCircle,
  },
  {
    value: 'hands_on' satisfies PathwayAssessmentStrength,
    label: 'Hands-on building',
    description: 'You prefer making, fixing, and learning through action.',
    icon: Wrench,
  },
  {
    value: 'fast_learning' satisfies PathwayAssessmentStrength,
    // REWRITE: "Fast learning" → more precise, less résumé-speak
    label: 'Quick adaptation',
    // REWRITE: original was passive ("when you are exposed to") and redundant
    description:
      'You get up to speed fast and hit your stride in unfamiliar territory.',
    icon: Zap,
  },
  {
    value: 'organized' satisfies PathwayAssessmentStrength,
    label: 'Focus and structure',
    // REWRITE: original ("planning, routine, and follow-through") was a list, not a behavior
    description:
      'You plan before you act and stay consistent until the job is done.',
    icon: Target,
  },
];

// ─── Subjects ────────────────────────────────────────────────────────────────

export const subjectOptions: PathwayAssessmentOption[] = [
  {
    value: 'math' satisfies PathwayAssessmentSubject,
    label: 'Math and numbers',
    description:
      'Best when the work involves logic, formulas, or numerical thinking.',
    icon: Calculator,
  },
  {
    value: 'science' satisfies PathwayAssessmentSubject,
    label: 'Science and experiments',
    description: 'Best when exploring systems, evidence, and how things work.',
    icon: FlaskConical,
  },
  {
    value: 'writing' satisfies PathwayAssessmentSubject,
    label: 'Writing and language',
    description:
      'Best when explaining ideas through language and communication.',
    icon: Pencil,
  },
  {
    value: 'arts' satisfies PathwayAssessmentSubject,
    label: 'Arts and creativity',
    description: 'Best when creating visual, musical, or expressive work.',
    icon: Paintbrush,
  },
  {
    value: 'social' satisfies PathwayAssessmentSubject,
    label: 'History and social studies',
    description: 'Best when understanding people, society, and context.',
    icon: Globe,
  },
];

// ─── Passions ────────────────────────────────────────────────────────────────

const passionOptions: PathwayAssessmentOption[] = [
  {
    value: 'tech' satisfies PathwayAssessmentPassion,
    label: 'Gaming and tech',
    description: 'You enjoy digital tools, systems, devices, or software.',
    icon: Monitor,
  },
  {
    value: 'music' satisfies PathwayAssessmentPassion,
    label: 'Music and arts',
    description: 'You enjoy creative expression and artistic output.',
    icon: Music,
  },
  {
    value: 'sports' satisfies PathwayAssessmentPassion,
    label: 'Sports and action',
    description: 'You enjoy movement, challenge, and active environments.',
    icon: Activity,
  },
  {
    value: 'reading' satisfies PathwayAssessmentPassion,
    label: 'Reading and stories',
    description: 'You enjoy ideas, reflection, and deeper content.',
    icon: BookOpen,
  },
  {
    value: 'science' satisfies PathwayAssessmentPassion,
    label: 'Science and discovery',
    description:
      'You like curiosity, experimentation, and evidence-based learning.',
    icon: Microscope,
  },
  {
    value: 'social' satisfies PathwayAssessmentPassion,
    label: 'Social and community',
    description:
      'You care about people, relationships, and community activity.',
    icon: Handshake,
  },
  {
    value: 'nature' satisfies PathwayAssessmentPassion,
    label: 'Nature and animals',
    description:
      'You are drawn to environmental, outdoor, or life-related fields.',
    icon: Leaf,
  },
  {
    value: 'building' satisfies PathwayAssessmentPassion,
    label: 'Building and creating',
    description: 'You enjoy producing something useful and visible.',
    icon: Hammer,
  },
  {
    value: 'ideas' satisfies PathwayAssessmentPassion,
    label: 'Ideas and innovation',
    description:
      'You enjoy new concepts, experimentation, and future-oriented thinking.',
    icon: Lightbulb,
  },
];

// ─── Free Time ───────────────────────────────────────────────────────────────

const freeTimeOptions: PathwayAssessmentOption[] = [
  {
    value: 'build' satisfies PathwayAssessmentFreeTime,
    label: 'Build or make something',
    description: 'You recharge by creating, fixing, or assembling things.',
    icon: Hammer,
  },
  {
    value: 'outdoor' satisfies PathwayAssessmentFreeTime,
    label: 'Be outdoors',
    description:
      'You prefer movement, fresh environments, and active experience.',
    icon: Sun,
  },
  {
    value: 'socialize' satisfies PathwayAssessmentFreeTime,
    label: 'Spend time with people',
    description: 'You gain energy from interaction and shared experiences.',
    icon: Users,
  },
  {
    value: 'consume' satisfies PathwayAssessmentFreeTime,
    label: 'Read, watch, or play',
    description:
      'You enjoy absorbing stories, content, and digital experiences.',
    icon: Gamepad2,
  },
  {
    value: 'learn' satisfies PathwayAssessmentFreeTime,
    label: 'Learn something new',
    description: 'You naturally spend time exploring new skills or ideas.',
    icon: Brain,
  },
];

// ─── Environment ─────────────────────────────────────────────────────────────

const environmentOptions: PathwayAssessmentOption[] = [
  {
    value: 'office' satisfies PathwayAssessmentWorkEnvironment,
    label: 'Office with a team',
    description: 'You prefer structured collaboration and shared momentum.',
    icon: Building2,
  },
  {
    value: 'remote' satisfies PathwayAssessmentWorkEnvironment,
    label: 'Remote and flexible',
    description: 'You prefer autonomy and location flexibility.',
    icon: Home,
  },
  {
    value: 'outdoor' satisfies PathwayAssessmentWorkEnvironment,
    label: 'Outdoor or on-site',
    description: 'You prefer active, physical, or field-based environments.',
    icon: Trees,
  },
  {
    value: 'lab' satisfies PathwayAssessmentWorkEnvironment,
    label: 'Lab or studio',
    description:
      'You prefer focused environments for technical or creative practice.',
    icon: FlaskConical,
  },
  {
    value: 'mixed' satisfies PathwayAssessmentWorkEnvironment,
    // REWRITE: "A mix of settings" was vague
    label: 'Varied environments',
    // REWRITE: original used negative construction ("do not want to stay") — reframed positively
    description:
      'No single setting defines you — you do your best work when the context shifts.',
    icon: Shuffle,
  },
];

// ─── Work Style ──────────────────────────────────────────────────────────────

const workStyleOptions: PathwayAssessmentOption[] = [
  {
    value: 'analyze' satisfies PathwayAssessmentWorkStyle,
    label: 'Analyzing information',
    description:
      'You enjoy logic, patterns, and decision-making based on information.',
    icon: TrendingUp,
  },
  {
    value: 'help' satisfies PathwayAssessmentWorkStyle,
    label: 'Helping people',
    description: 'You enjoy support, care, service, and direct human impact.',
    icon: Heart,
  },
  {
    value: 'build' satisfies PathwayAssessmentWorkStyle,
    label: 'Building or fixing',
    description: 'You enjoy practical execution and hands-on improvement.',
    icon: Layers,
  },
  {
    value: 'create' satisfies PathwayAssessmentWorkStyle,
    label: 'Creating ideas or solutions',
    description:
      'You enjoy originality, invention, and solving open-ended problems.',
    icon: Sparkles,
  },
  {
    value: 'routine' satisfies PathwayAssessmentWorkStyle,
    label: 'Clear structure and routine',
    // REWRITE: original was passive and slightly implied a limitation
    description:
      "You're most effective when the path is defined and the process stays consistent.",
    icon: Compass,
  },
];

// ─── Impact ──────────────────────────────────────────────────────────────────

const impactOptions: PathwayAssessmentOption[] = [
  {
    value: 'create' satisfies PathwayAssessmentImpact,
    label: 'Create useful things',
    description: 'You want your work to produce visible value for people.',
    icon: Lightbulb,
  },
  {
    value: 'people' satisfies PathwayAssessmentImpact,
    label: 'Work directly with people',
    description: 'You want daily human interaction and direct support roles.',
    icon: Users,
  },
  {
    value: 'discover' satisfies PathwayAssessmentImpact,
    label: 'Discover new knowledge',
    description: 'You want research, exploration, and learning to matter.',
    icon: Microscope,
  },
  {
    value: 'systems' satisfies PathwayAssessmentImpact,
    label: 'Build important systems',
    description: 'You want to keep critical things running and running well.',
    icon: Network,
  },
  {
    value: 'express' satisfies PathwayAssessmentImpact,
    label: 'Express creativity through work',
    description:
      'You want imagination and expression to be central to your path.',
    icon: Palette,
  },
];

// ─── Goals ───────────────────────────────────────────────────────────────────

const goalOptions: PathwayAssessmentOption[] = [
  {
    value: 'impact' satisfies PathwayAssessmentGoal,
    label: 'Make a difference',
    description: 'Meaning and contribution matter most to you.',
    icon: Star,
  },
  {
    value: 'money' satisfies PathwayAssessmentGoal,
    label: 'Financial stability',
    description: 'You want a path with strong income and long-term security.',
    icon: DollarSign,
  },
  {
    value: 'balance' satisfies PathwayAssessmentGoal,
    label: 'Work-life balance',
    // REWRITE: original listed values abstractly — rewritten as a memorable statement
    description:
      'You want work that fits your life — not a life that revolves around your work.',
    icon: Scale,
  },
  {
    value: 'growth' satisfies PathwayAssessmentGoal,
    label: 'Continuous growth',
    // REWRITE: original was a noun list — rewritten as an identity statement
    description:
      "You're not satisfied staying at the same level — growth is a requirement, not a bonus.",
    icon: GraduationCap,
  },
  {
    value: 'variety' satisfies PathwayAssessmentGoal,
    label: 'Challenge and variety',
    // REWRITE: original was vague ("keeps changing") — rewritten with a specific trade-off
    description:
      'Repetition slows you down — you need work that evolves and keeps you sharp.',
    icon: Rocket,
  },
];

// ─── Steps ───────────────────────────────────────────────────────────────────

export const PATHWAY_ASSESSMENT_STEPS: PathwayAssessmentStep[] = [
  {
    id: 'welcome',
    type: 'intro',
    title: 'Find a study or career path that fits you',
    description:
      'Answer a few short questions about your strengths, interests, and goals. AICA will turn them into clear pathway matches, simple explanations, and a practical next-step roadmap.',
    helperText:
      'There are no right or wrong answers. Choose what feels most true to you right now.',
    cta: 'Begin assessment',
  },
  {
    id: 'strengths',
    type: 'multi-select',
    title: 'What feels natural to you?',
    fieldName: 'strengths',
    minSelect: 1,
    maxSelect: 4,
    options: strengthOptions,
  },
  {
    id: 'subjects',
    type: 'single-select',
    title: 'Which subject are you best at explaining?',
    fieldName: 'subjects',
    options: subjectOptions,
  },
  {
    id: 'passions',
    type: 'multi-select',
    title: 'What do you enjoy the most?',
    fieldName: 'passions',
    minSelect: 1,
    maxSelect: 4,
    options: passionOptions,
  },
  {
    id: 'free-time',
    type: 'single-select',
    title: 'On a free day, you usually:',
    fieldName: 'freeTime',
    options: freeTimeOptions,
  },
  {
    id: 'work-environment',
    type: 'single-select',
    title: 'Where would you enjoy working?',
    fieldName: 'workEnvironment',
    options: environmentOptions,
  },
  {
    id: 'work-style',
    type: 'single-select',
    title: 'What kind of work do you enjoy?',
    fieldName: 'workStyle',
    options: workStyleOptions,
  },
  {
    id: 'impact',
    type: 'single-select',
    title: 'What feels meaningful to you?',
    fieldName: 'impact',
    options: impactOptions,
  },
  {
    id: 'goals',
    type: 'single-select',
    title: 'What matters most in your future?',
    fieldName: 'goals',
    options: goalOptions,
  },
  {
    id: 'finish',
    type: 'cta',
    title: 'Your profile is ready',
    description:
      'AICA can now turn your answers into ranked pathways, explainable matches, and roadmap-ready guidance.',
    helperText: 'Submit your profile to continue to recommendations.',
    cta: 'See my matches',
  },
] as const;
