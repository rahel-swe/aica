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
  emoji: string;
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

const strengthOptions: PathwayAssessmentOption[] = [
  {
    value: 'problem_solving' satisfies PathwayAssessmentStrength,
    label: 'Problem solving',
    description:
      'You like breaking down hard problems and finding practical answers.',
    emoji: '🔍',
  },
  {
    value: 'creativity' satisfies PathwayAssessmentStrength,
    label: 'Creative thinking',
    description: 'You enjoy original ideas, design, and expressive work.',
    emoji: '🎨',
  },
  {
    value: 'people' satisfies PathwayAssessmentStrength,
    label: 'People connection',
    description: 'You naturally support, guide, or connect with others.',
    emoji: '👥',
  },
  {
    value: 'analytical' satisfies PathwayAssessmentStrength,
    label: 'Analytical mind',
    description: 'You notice patterns, structure, and logical detail quickly.',
    emoji: '📊',
  },
  {
    value: 'communication' satisfies PathwayAssessmentStrength,
    label: 'Communication',
    description:
      'You explain ideas clearly and make information easier to understand.',
    emoji: '💬',
  },
  {
    value: 'hands_on' satisfies PathwayAssessmentStrength,
    label: 'Hands-on building',
    description: 'You prefer making, fixing, and learning through action.',
    emoji: '🔧',
  },
  {
    value: 'fast_learning' satisfies PathwayAssessmentStrength,
    label: 'Fast learning',
    description: 'You adapt quickly when you are exposed to something new.',
    emoji: '📚',
  },
  {
    value: 'organized' satisfies PathwayAssessmentStrength,
    label: 'Focus and structure',
    description: 'You work well with planning, routine, and follow-through.',
    emoji: '🎯',
  },
];

export const subjectOptions: PathwayAssessmentOption[] = [
  {
    value: 'math' satisfies PathwayAssessmentSubject,
    label: 'Math and numbers',
    description:
      'Best when the work involves logic, formulas, or numerical thinking.',
    emoji: '➗',
  },
  {
    value: 'science' satisfies PathwayAssessmentSubject,
    label: 'Science and experiments',
    description: 'Best when exploring systems, evidence, and how things work.',
    emoji: '🧪',
  },
  {
    value: 'writing' satisfies PathwayAssessmentSubject,
    label: 'Writing and language',
    description:
      'Best when explaining ideas through language and communication.',
    emoji: '✍️',
  },
  {
    value: 'arts' satisfies PathwayAssessmentSubject,
    label: 'Arts and creativity',
    description: 'Best when creating visual, musical, or expressive work.',
    emoji: '🖌️',
  },
  {
    value: 'social' satisfies PathwayAssessmentSubject,
    label: 'History and social studies',
    description: 'Best when understanding people, society, and context.',
    emoji: '🌍',
  },
];

const passionOptions: PathwayAssessmentOption[] = [
  {
    value: 'tech' satisfies PathwayAssessmentPassion,
    label: 'Gaming and tech',
    description: 'You enjoy digital tools, systems, devices, or software.',
    emoji: '💻',
  },
  {
    value: 'music' satisfies PathwayAssessmentPassion,
    label: 'Music and arts',
    description: 'You enjoy creative expression and artistic output.',
    emoji: '🎵',
  },
  {
    value: 'sports' satisfies PathwayAssessmentPassion,
    label: 'Sports and action',
    description: 'You enjoy movement, challenge, and active environments.',
    emoji: '⚽',
  },
  {
    value: 'reading' satisfies PathwayAssessmentPassion,
    label: 'Reading and stories',
    description: 'You enjoy ideas, reflection, and deeper content.',
    emoji: '📖',
  },
  {
    value: 'science' satisfies PathwayAssessmentPassion,
    label: 'Science and discovery',
    description:
      'You like curiosity, experimentation, and evidence-based learning.',
    emoji: '🔬',
  },
  {
    value: 'social' satisfies PathwayAssessmentPassion,
    label: 'Social and community',
    description:
      'You care about people, relationships, and community activity.',
    emoji: '🤝',
  },
  {
    value: 'nature' satisfies PathwayAssessmentPassion,
    label: 'Nature and animals',
    description:
      'You are drawn to environmental, outdoor, or life-related fields.',
    emoji: '🌿',
  },
  {
    value: 'building' satisfies PathwayAssessmentPassion,
    label: 'Building and creating',
    description: 'You enjoy producing something useful and visible.',
    emoji: '🛠️',
  },
  {
    value: 'ideas' satisfies PathwayAssessmentPassion,
    label: 'Ideas and innovation',
    description:
      'You enjoy new concepts, experimentation, and future-oriented thinking.',
    emoji: '💡',
  },
];

const freeTimeOptions: PathwayAssessmentOption[] = [
  {
    value: 'build' satisfies PathwayAssessmentFreeTime,
    label: 'Build or make something',
    description: 'You recharge by creating, fixing, or assembling things.',
    emoji: '🔨',
  },
  {
    value: 'outdoor' satisfies PathwayAssessmentFreeTime,
    label: 'Be outdoors',
    description:
      'You prefer movement, fresh environments, and active experience.',
    emoji: '🌤️',
  },
  {
    value: 'socialize' satisfies PathwayAssessmentFreeTime,
    label: 'Spend time with people',
    description: 'You gain energy from interaction and shared experiences.',
    emoji: '🫱🏽‍🫲🏼',
  },
  {
    value: 'consume' satisfies PathwayAssessmentFreeTime,
    label: 'Read, watch, or play',
    description:
      'You enjoy absorbing stories, content, and digital experiences.',
    emoji: '🎮',
  },
  {
    value: 'learn' satisfies PathwayAssessmentFreeTime,
    label: 'Learn something new',
    description: 'You naturally spend time exploring new skills or ideas.',
    emoji: '🧠',
  },
];

const environmentOptions: PathwayAssessmentOption[] = [
  {
    value: 'office' satisfies PathwayAssessmentWorkEnvironment,
    label: 'Office with a team',
    description: 'You prefer structured collaboration and shared momentum.',
    emoji: '🏢',
  },
  {
    value: 'remote' satisfies PathwayAssessmentWorkEnvironment,
    label: 'Remote and flexible',
    description: 'You prefer autonomy and location flexibility.',
    emoji: '🏠',
  },
  {
    value: 'outdoor' satisfies PathwayAssessmentWorkEnvironment,
    label: 'Outdoor or on-site',
    description: 'You prefer active, physical, or field-based environments.',
    emoji: '🌳',
  },
  {
    value: 'lab' satisfies PathwayAssessmentWorkEnvironment,
    label: 'Lab or studio',
    description:
      'You prefer focused environments for technical or creative practice.',
    emoji: '🧫',
  },
  {
    value: 'mixed' satisfies PathwayAssessmentWorkEnvironment,
    label: 'A mix of settings',
    description:
      'You want variety and do not want to stay in one environment all the time.',
    emoji: '🔄',
  },
];

const workStyleOptions: PathwayAssessmentOption[] = [
  {
    value: 'analyze' satisfies PathwayAssessmentWorkStyle,
    label: 'Analyzing information',
    description:
      'You enjoy logic, patterns, and decision-making based on information.',
    emoji: '📈',
  },
  {
    value: 'help' satisfies PathwayAssessmentWorkStyle,
    label: 'Helping people',
    description: 'You enjoy support, care, service, and direct human impact.',
    emoji: '🫶',
  },
  {
    value: 'build' satisfies PathwayAssessmentWorkStyle,
    label: 'Building or fixing',
    description: 'You enjoy practical execution and hands-on improvement.',
    emoji: '🧱',
  },
  {
    value: 'create' satisfies PathwayAssessmentWorkStyle,
    label: 'Creating ideas or solutions',
    description:
      'You enjoy originality, invention, and solving open-ended problems.',
    emoji: '✨',
  },
  {
    value: 'routine' satisfies PathwayAssessmentWorkStyle,
    label: 'Clear structure and routine',
    description: 'You work well when expectations and steps are clear.',
    emoji: '🧭',
  },
];

const impactOptions: PathwayAssessmentOption[] = [
  {
    value: 'create' satisfies PathwayAssessmentImpact,
    label: 'Create useful things',
    description: 'You want your work to produce visible value for people.',
    emoji: '💡',
  },
  {
    value: 'people' satisfies PathwayAssessmentImpact,
    label: 'Work directly with people',
    description: 'You want daily human interaction and direct support roles.',
    emoji: '👥',
  },
  {
    value: 'discover' satisfies PathwayAssessmentImpact,
    label: 'Discover new knowledge',
    description: 'You want research, exploration, and learning to matter.',
    emoji: '🔬',
  },
  {
    value: 'systems' satisfies PathwayAssessmentImpact,
    label: 'Build important systems',
    description:
      'You want to improve infrastructure, operations, or reliability.',
    emoji: '🏗️',
  },
  {
    value: 'express' satisfies PathwayAssessmentImpact,
    label: 'Express creativity through work',
    description:
      'You want imagination and expression to be central to your path.',
    emoji: '🎭',
  },
];

const goalOptions: PathwayAssessmentOption[] = [
  {
    value: 'impact' satisfies PathwayAssessmentGoal,
    label: 'Make a difference',
    description: 'Meaning and contribution matter most to you.',
    emoji: '🌟',
  },
  {
    value: 'money' satisfies PathwayAssessmentGoal,
    label: 'Financial stability',
    description: 'You want a path with strong income and long-term security.',
    emoji: '💰',
  },
  {
    value: 'balance' satisfies PathwayAssessmentGoal,
    label: 'Work-life balance',
    description: 'You value sustainability, flexibility, and personal time.',
    emoji: '⚖️',
  },
  {
    value: 'growth' satisfies PathwayAssessmentGoal,
    label: 'Continuous growth',
    description: 'You want learning, development, and long-term progression.',
    emoji: '📚',
  },
  {
    value: 'variety' satisfies PathwayAssessmentGoal,
    label: 'Challenge and variety',
    description: 'You want dynamic work that keeps changing over time.',
    emoji: '🚀',
  },
];

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
