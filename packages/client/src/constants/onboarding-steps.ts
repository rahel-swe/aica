export type OnboardingStepsIds =
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

export type OnboardingStepsTypes =
  | 'intro'
  | 'multi-select'
  | 'single-select'
  | 'cta';

export type OnboardingStep = {
  id: OnboardingStepsIds;
  type: OnboardingStepsTypes;
  title: string;
  cta?: string;
  options?: string[];
};

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 'welcome',
    type: 'intro',
    title: 'Let’s find your best path',
    cta: 'Start',
  },
  {
    id: 'strengths',
    type: 'multi-select',
    title: 'What feels natural to you?',
    options: [
      'problem_solving',
      'creativity',
      'people',
      'analytical',
      'communication',
      'hands_on',
      'fast_learning',
      'organized',
    ],
  },
  {
    id: 'subjects',
    type: 'single-select',
    title: 'Which subject are you best at explaining?',
    options: ['math', 'science', 'writing', 'arts', 'social'],
  },
  {
    id: 'passions',
    type: 'multi-select',
    title: 'What do you enjoy the most?',
    options: [
      'tech',
      'music',
      'sports',
      'reading',
      'science',
      'social',
      'nature',
      'building',
      'ideas',
    ],
  },
  {
    id: 'free-time',
    type: 'single-select',
    title: 'On a free day, you usually:',
    options: ['build', 'outdoor', 'socialize', 'consume', 'learn'],
  },
  {
    id: 'work-environment',
    type: 'single-select',
    title: 'Where would you enjoy working?',
    options: ['office', 'remote', 'outdoor', 'lab', 'mixed'],
  },
  {
    id: 'work-style',
    type: 'single-select',
    title: 'What kind of work do you enjoy?',
    options: ['analyze', 'help', 'build', 'create', 'routine'],
  },
  {
    id: 'impact',
    type: 'single-select',
    title: 'What feels meaningful to you?',
    options: ['create', 'people', 'discover', 'systems', 'express'],
  },
  {
    id: 'goals',
    type: 'single-select',
    title: 'What matters most in your future?',
    options: ['impact', 'money', 'balance', 'growth', 'variety'],
  },
  {
    id: 'finish',
    type: 'cta',
    title: 'You’re all set',
    cta: 'See My Matches',
  },
] as const;
