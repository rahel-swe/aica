import type {
  OnboardingFormValues,
  OnboardingFreeTime,
  OnboardingGoal,
  OnboardingImpact,
  OnboardingPassion,
  OnboardingStrength,
  OnboardingSubject,
  OnboardingWorkEnvironment,
  OnboardingWorkStyle,
} from '@contracts/shared/types/onboarding-types';

export type OnboardingStepId =
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

export type OnboardingStepType =
  | 'intro'
  | 'multi-select'
  | 'single-select'
  | 'cta';

export type OnboardingOption = {
  value: string;
  label: string;
  description: string;
  emoji: string;
};

export type OnboardingStep = {
  id: OnboardingStepId;
  type: OnboardingStepType;
  title: string;
  description: string;
  helperText?: string;
  cta?: string;
  fieldName?: keyof OnboardingFormValues;
  minSelect?: number;
  maxSelect?: number;
  options?: OnboardingOption[];
};

export const ONBOARDING_STORAGE_KEY = 'aica-onboarding-draft';

export const onboardingDefaultValues = {
  strengths: [],
  subjects: '',
  passions: [],
  freeTime: '',
  workEnvironment: '',
  workStyle: '',
  impact: '',
  goals: '',
};

const strengthOptions: OnboardingOption[] = [
  {
    value: 'problem_solving' satisfies OnboardingStrength,
    label: 'Problem solving',
    description:
      'You like breaking down hard problems and finding practical answers.',
    emoji: '🔍',
  },
  {
    value: 'creativity' satisfies OnboardingStrength,
    label: 'Creative thinking',
    description: 'You enjoy original ideas, design, and expressive work.',
    emoji: '🎨',
  },
  {
    value: 'people' satisfies OnboardingStrength,
    label: 'People connection',
    description: 'You naturally support, guide, or connect with others.',
    emoji: '👥',
  },
  {
    value: 'analytical' satisfies OnboardingStrength,
    label: 'Analytical mind',
    description: 'You notice patterns, structure, and logical detail quickly.',
    emoji: '📊',
  },
  {
    value: 'communication' satisfies OnboardingStrength,
    label: 'Communication',
    description:
      'You explain ideas clearly and make information easier to understand.',
    emoji: '💬',
  },
  {
    value: 'hands_on' satisfies OnboardingStrength,
    label: 'Hands-on building',
    description: 'You prefer making, fixing, and learning through action.',
    emoji: '🔧',
  },
  {
    value: 'fast_learning' satisfies OnboardingStrength,
    label: 'Fast learning',
    description: 'You adapt quickly when you are exposed to something new.',
    emoji: '📚',
  },
  {
    value: 'organized' satisfies OnboardingStrength,
    label: 'Focus and structure',
    description: 'You work well with planning, routine, and follow-through.',
    emoji: '🎯',
  },
];

const subjectOptions: OnboardingOption[] = [
  {
    value: 'math' satisfies OnboardingSubject,
    label: 'Math and numbers',
    description:
      'Best when the work involves logic, formulas, or numerical thinking.',
    emoji: '➗',
  },
  {
    value: 'science' satisfies OnboardingSubject,
    label: 'Science and experiments',
    description: 'Best when exploring systems, evidence, and how things work.',
    emoji: '🧪',
  },
  {
    value: 'writing' satisfies OnboardingSubject,
    label: 'Writing and language',
    description:
      'Best when explaining ideas through language and communication.',
    emoji: '✍️',
  },
  {
    value: 'arts' satisfies OnboardingSubject,
    label: 'Arts and creativity',
    description: 'Best when creating visual, musical, or expressive work.',
    emoji: '🖌️',
  },
  {
    value: 'social' satisfies OnboardingSubject,
    label: 'History and social studies',
    description: 'Best when understanding people, society, and context.',
    emoji: '🌍',
  },
];

const passionOptions: OnboardingOption[] = [
  {
    value: 'tech' satisfies OnboardingPassion,
    label: 'Gaming and tech',
    description: 'You enjoy digital tools, systems, devices, or software.',
    emoji: '💻',
  },
  {
    value: 'music' satisfies OnboardingPassion,
    label: 'Music and arts',
    description: 'You enjoy creative expression and artistic output.',
    emoji: '🎵',
  },
  {
    value: 'sports' satisfies OnboardingPassion,
    label: 'Sports and action',
    description: 'You enjoy movement, challenge, and active environments.',
    emoji: '⚽',
  },
  {
    value: 'reading' satisfies OnboardingPassion,
    label: 'Reading and stories',
    description: 'You enjoy ideas, reflection, and deeper content.',
    emoji: '📖',
  },
  {
    value: 'science' satisfies OnboardingPassion,
    label: 'Science and discovery',
    description:
      'You like curiosity, experimentation, and evidence-based learning.',
    emoji: '🔬',
  },
  {
    value: 'social' satisfies OnboardingPassion,
    label: 'Social and community',
    description:
      'You care about people, relationships, and community activity.',
    emoji: '🤝',
  },
  {
    value: 'nature' satisfies OnboardingPassion,
    label: 'Nature and animals',
    description:
      'You are drawn to environmental, outdoor, or life-related fields.',
    emoji: '🌿',
  },
  {
    value: 'building' satisfies OnboardingPassion,
    label: 'Building and creating',
    description: 'You enjoy producing something useful and visible.',
    emoji: '🛠️',
  },
  {
    value: 'ideas' satisfies OnboardingPassion,
    label: 'Ideas and innovation',
    description:
      'You enjoy new concepts, experimentation, and future-oriented thinking.',
    emoji: '💡',
  },
];

const freeTimeOptions: OnboardingOption[] = [
  {
    value: 'build' satisfies OnboardingFreeTime,
    label: 'Build or make something',
    description: 'You recharge by creating, fixing, or assembling things.',
    emoji: '🔨',
  },
  {
    value: 'outdoor' satisfies OnboardingFreeTime,
    label: 'Be outdoors',
    description:
      'You prefer movement, fresh environments, and active experience.',
    emoji: '🌤️',
  },
  {
    value: 'socialize' satisfies OnboardingFreeTime,
    label: 'Spend time with people',
    description: 'You gain energy from interaction and shared experiences.',
    emoji: '🫱🏽‍🫲🏼',
  },
  {
    value: 'consume' satisfies OnboardingFreeTime,
    label: 'Read, watch, or play',
    description:
      'You enjoy absorbing stories, content, and digital experiences.',
    emoji: '🎮',
  },
  {
    value: 'learn' satisfies OnboardingFreeTime,
    label: 'Learn something new',
    description: 'You naturally spend time exploring new skills or ideas.',
    emoji: '🧠',
  },
];

const environmentOptions: OnboardingOption[] = [
  {
    value: 'office' satisfies OnboardingWorkEnvironment,
    label: 'Office with a team',
    description: 'You prefer structured collaboration and shared momentum.',
    emoji: '🏢',
  },
  {
    value: 'remote' satisfies OnboardingWorkEnvironment,
    label: 'Remote and flexible',
    description: 'You prefer autonomy and location flexibility.',
    emoji: '🏠',
  },
  {
    value: 'outdoor' satisfies OnboardingWorkEnvironment,
    label: 'Outdoor or on-site',
    description: 'You prefer active, physical, or field-based environments.',
    emoji: '🌳',
  },
  {
    value: 'lab' satisfies OnboardingWorkEnvironment,
    label: 'Lab or studio',
    description:
      'You prefer focused environments for technical or creative practice.',
    emoji: '🧫',
  },
  {
    value: 'mixed' satisfies OnboardingWorkEnvironment,
    label: 'A mix of settings',
    description:
      'You want variety and do not want to stay in one environment all the time.',
    emoji: '🔄',
  },
];

const workStyleOptions: OnboardingOption[] = [
  {
    value: 'analyze' satisfies OnboardingWorkStyle,
    label: 'Analyzing information',
    description:
      'You enjoy logic, patterns, and decision-making based on information.',
    emoji: '📈',
  },
  {
    value: 'help' satisfies OnboardingWorkStyle,
    label: 'Helping people',
    description: 'You enjoy support, care, service, and direct human impact.',
    emoji: '🫶',
  },
  {
    value: 'build' satisfies OnboardingWorkStyle,
    label: 'Building or fixing',
    description: 'You enjoy practical execution and hands-on improvement.',
    emoji: '🧱',
  },
  {
    value: 'create' satisfies OnboardingWorkStyle,
    label: 'Creating ideas or solutions',
    description:
      'You enjoy originality, invention, and solving open-ended problems.',
    emoji: '✨',
  },
  {
    value: 'routine' satisfies OnboardingWorkStyle,
    label: 'Clear structure and routine',
    description: 'You work well when expectations and steps are clear.',
    emoji: '🧭',
  },
];

const impactOptions: OnboardingOption[] = [
  {
    value: 'create' satisfies OnboardingImpact,
    label: 'Create useful things',
    description: 'You want your work to produce visible value for people.',
    emoji: '💡',
  },
  {
    value: 'people' satisfies OnboardingImpact,
    label: 'Work directly with people',
    description: 'You want daily human interaction and direct support roles.',
    emoji: '👥',
  },
  {
    value: 'discover' satisfies OnboardingImpact,
    label: 'Discover new knowledge',
    description: 'You want research, exploration, and learning to matter.',
    emoji: '🔬',
  },
  {
    value: 'systems' satisfies OnboardingImpact,
    label: 'Build important systems',
    description:
      'You want to improve infrastructure, operations, or reliability.',
    emoji: '🏗️',
  },
  {
    value: 'express' satisfies OnboardingImpact,
    label: 'Express creativity through work',
    description:
      'You want imagination and expression to be central to your path.',
    emoji: '🎭',
  },
];

const goalOptions: OnboardingOption[] = [
  {
    value: 'impact' satisfies OnboardingGoal,
    label: 'Make a difference',
    description: 'Meaning and contribution matter most to you.',
    emoji: '🌟',
  },
  {
    value: 'money' satisfies OnboardingGoal,
    label: 'Financial stability',
    description: 'You want a path with strong income and long-term security.',
    emoji: '💰',
  },
  {
    value: 'balance' satisfies OnboardingGoal,
    label: 'Work-life balance',
    description: 'You value sustainability, flexibility, and personal time.',
    emoji: '⚖️',
  },
  {
    value: 'growth' satisfies OnboardingGoal,
    label: 'Continuous growth',
    description: 'You want learning, development, and long-term progression.',
    emoji: '📚',
  },
  {
    value: 'variety' satisfies OnboardingGoal,
    label: 'Challenge and variety',
    description: 'You want dynamic work that keeps changing over time.',
    emoji: '🚀',
  },
];

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 'welcome',
    type: 'intro',
    title: 'Let’s find a direction that fits you',
    description:
      'You do not need to know the exact career already. AICA will build a clear profile first, then turn that into aligned pathways and roadmap-ready guidance.',
    helperText:
      'No right or wrong answers. Just choose what feels true for you.',
    cta: 'Start assessment',
  },
  {
    id: 'strengths',
    type: 'multi-select',
    title: 'What feels natural to you?',
    description:
      'Choose up to four strengths that describe how you naturally think, work, or support others.',
    helperText:
      'These answers help AICA understand your strongest working patterns.',
    fieldName: 'strengths',
    minSelect: 1,
    maxSelect: 4,
    options: strengthOptions,
  },
  {
    id: 'subjects',
    type: 'single-select',
    title: 'Which subject are you best at explaining?',
    description:
      'This gives the system a simple signal about where your confidence and clarity already exist.',
    fieldName: 'subjects',
    options: subjectOptions,
  },
  {
    id: 'passions',
    type: 'multi-select',
    title: 'What do you enjoy the most?',
    description:
      'Pick up to four areas that hold your attention and feel naturally interesting to you.',
    helperText:
      'Interest is important because strong-fit paths are easier to sustain over time.',
    fieldName: 'passions',
    minSelect: 1,
    maxSelect: 4,
    options: passionOptions,
  },
  {
    id: 'free-time',
    type: 'single-select',
    title: 'On a free day, you usually:',
    description:
      'Your free-time choices often reveal what kind of work and learning style feels energizing.',
    fieldName: 'freeTime',
    options: freeTimeOptions,
  },
  {
    id: 'work-environment',
    type: 'single-select',
    title: 'Where would you enjoy working?',
    description:
      'Choose the environment that feels most realistic and comfortable for your best work.',
    fieldName: 'workEnvironment',
    options: environmentOptions,
  },
  {
    id: 'work-style',
    type: 'single-select',
    title: 'What kind of work do you enjoy?',
    description:
      'This helps AICA distinguish between analytical, people-focused, practical, and creative pathways.',
    fieldName: 'workStyle',
    options: workStyleOptions,
  },
  {
    id: 'impact',
    type: 'single-select',
    title: 'What feels meaningful to you?',
    description:
      'Choose the kind of impact that would make your work feel worth doing.',
    fieldName: 'impact',
    options: impactOptions,
  },
  {
    id: 'goals',
    type: 'single-select',
    title: 'What matters most in your future?',
    description:
      'This final preference helps rank pathways by the kind of life and growth you want long term.',
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
