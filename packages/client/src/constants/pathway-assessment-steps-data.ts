import { type LucideIcon } from 'lucide-react';
import {
  Puzzle,
  Palette,
  Users,
  BarChart3,
  MessageCircle,
  Wrench, // hands_on
  Zap, // fast_learning (label: Quick adaptation)
  Target, // organized
  // ── Subjects
  Calculator, // math
  FlaskConical, // science
  Pencil, // writing
  Paintbrush, // arts
  Globe, // social
  // ── Passions
  Monitor, // tech
  Music, // music
  Activity, // sports
  BookOpen, // reading
  Microscope, // science (passion)
  Handshake, // social (passion)
  Leaf, // nature
  Hammer, // building
  Lightbulb, // ideas
  MousePointerClick, // practice
  BookMarked, // courses
  Search, // research
  Play, // watching
  Share2, // teaching
  // ── Work Style
  TrendingUp, // analyze
  Heart, // help
  Layers, // build
  Sparkles, // create
  Compass, // routine
  // ── Work Environment
  Building2, // office
  Home, // remote
  Trees, // outdoor
  TestTube2, // lab (using TestTube2 since FlaskConical reused above)
  Shuffle, // mixed
  // ── Collaboration Style (new)
  User, // solo
  UsersRound, // small_team  (falls back to Users if not available)
  Network, // large_team
  UserCheck, // client_facing
  Megaphone, // community
  // ── Impact
  Star, // create (impact)
  Users as UsersImpact, // people (impact) — same icon, different context
  BookOpen as BookOpenImpact, // discover — same icon, different context
  Settings2, // systems
  PenLine, // express
  // ── Goals
  Globe as GlobeStar, // impact goal
  DollarSign, // money
  Scale, // balance
  GraduationCap, // growth
  Rocket, // variety
} from 'lucide-react';

import type {
  PathwayAssessmentFormValues,
  PathwayAssessmentLearningPreference,
  PathwayAssessmentCollaborationStyle,
  PathwayAssessmentStrength,
  PathwayAssessmentSubject,
  PathwayAssessmentPassion,
  PathwayAssessmentWorkEnvironment,
  PathwayAssessmentWorkStyle,
  PathwayAssessmentImpact,
  PathwayAssessmentGoal,
} from '@contracts/shared/types/pathway-assessment-types';

export type PathwayAssessmentStepId =
  | 'welcome'
  | 'strengths'
  | 'passions'
  | 'subjects'
  | 'learning-preference'
  | 'work-style'
  | 'work-environment'
  | 'collaboration-style'
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
  icon: LucideIcon;
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

export const pathwayAssessmentDefaultValues: PathwayAssessmentFormValues = {
  strengths: [],
  passions: [],
  subjects: '' as PathwayAssessmentSubject,
  learningPreference: [],
  workStyle: [],
  workEnvironment: '' as PathwayAssessmentWorkEnvironment,
  collaborationStyle: '' as PathwayAssessmentCollaborationStyle,
  impact: [],
  goals: '' as PathwayAssessmentGoal,
};

// ─────────────────────────────────────────────────────────────────────────────
// STEP 1 — STRENGTHS
// multi-select, 1–3
//
// Title framing: scenario-based — user imagines themselves working,
// not abstractly describing personality.
// Helper: "3" max is explicit to prevent checkbox-everything behavior.
// ─────────────────────────────────────────────────────────────────────────────

const strengthOptions: PathwayAssessmentOption[] = [
  {
    value: 'problem_solving' satisfies PathwayAssessmentStrength,
    label: 'Problem solving',
    description:
      'You find satisfaction in breaking something complex down until it makes sense.',
    icon: Puzzle,
  },
  {
    value: 'creativity' satisfies PathwayAssessmentStrength,
    label: 'Creative thinking',
    description:
      'Your default mode is imagination — you see what could exist, not just what does.',
    icon: Palette,
  },
  {
    value: 'people' satisfies PathwayAssessmentStrength,
    label: 'People connection',
    description:
      'You read rooms well and know how to make others feel understood.',
    icon: Users,
  },
  {
    value: 'analytical' satisfies PathwayAssessmentStrength,
    label: 'Analytical mind',
    description:
      'You spot patterns others miss and trust data and logic over gut feeling.',
    icon: BarChart3,
  },
  {
    value: 'communication' satisfies PathwayAssessmentStrength,
    label: 'Communication',
    description:
      'You turn complex ideas into something clear, memorable, and easy to act on.',
    icon: MessageCircle,
  },
  {
    value: 'hands_on' satisfies PathwayAssessmentStrength,
    label: 'Hands-on building',
    description:
      'You need to see, touch, or make something — thinking without doing feels incomplete.',
    icon: Wrench,
  },
  {
    value: 'fast_learning' satisfies PathwayAssessmentStrength,
    label: 'Quick adaptation',
    description:
      'You get up to speed fast and hit your stride in unfamiliar territory.',
    icon: Zap,
  },
  {
    value: 'organized' satisfies PathwayAssessmentStrength,
    label: 'Focus and structure',
    description:
      'You plan before you act and stay consistent until the job is done.',
    icon: Target,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// STEP 2 — PASSIONS
// multi-select, 1–3
//
// Title: "genuinely" is deliberate — pushes back against aspirational answers.
// Max 3 reduced from 4 to force real prioritization.
// ─────────────────────────────────────────────────────────────────────────────

const passionOptions: PathwayAssessmentOption[] = [
  {
    value: 'tech' satisfies PathwayAssessmentPassion,
    label: 'Tech and digital',
    description:
      'You enjoy software, devices, systems, and the way technology shapes things.',
    icon: Monitor,
  },
  {
    value: 'music' satisfies PathwayAssessmentPassion,
    label: 'Music and arts',
    description:
      'Creative expression through sound, visuals, or performance is where you come alive.',
    icon: Music,
  },
  {
    value: 'sports' satisfies PathwayAssessmentPassion,
    label: 'Sports and movement',
    description:
      'Physical challenge, competition, and active environments energize you.',
    icon: Activity,
  },
  {
    value: 'reading' satisfies PathwayAssessmentPassion,
    label: 'Reading and ideas',
    description:
      'You spend real time with books, articles, or deep content — not just scrolling.',
    icon: BookOpen,
  },
  {
    value: 'science' satisfies PathwayAssessmentPassion,
    label: 'Science and discovery',
    description:
      'You want to understand how things really work — experiments, evidence, curiosity.',
    icon: Microscope,
  },
  {
    value: 'social' satisfies PathwayAssessmentPassion,
    label: 'People and community',
    description:
      'Human connection, social causes, and group dynamics genuinely interest you.',
    icon: Handshake,
  },
  {
    value: 'nature' satisfies PathwayAssessmentPassion,
    label: 'Nature and environment',
    description:
      'You care about the natural world — outdoor environments, wildlife, or sustainability.',
    icon: Leaf,
  },
  {
    value: 'building' satisfies PathwayAssessmentPassion,
    label: 'Building and making',
    description:
      'There is something satisfying about creating or assembling something real and useful.',
    icon: Hammer,
  },
  {
    value: 'ideas' satisfies PathwayAssessmentPassion,
    label: 'Ideas and innovation',
    description:
      'New concepts, future possibilities, and unconventional thinking light you up.',
    icon: Lightbulb,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// STEP 3 — SUBJECTS
// single-select
//
// Title: "best at explaining" is deliberately scenario-based and forces ranking.
// Users answer "what I actually know" not "what I wish I was good at."
// Helper makes the distinction explicit.
// ─────────────────────────────────────────────────────────────────────────────

export const subjectOptions: PathwayAssessmentOption[] = [
  {
    value: 'math' satisfies PathwayAssessmentSubject,
    label: 'Math and numbers',
    description: 'You think in patterns, logic, and structured calculation.',
    icon: Calculator,
  },
  {
    value: 'science' satisfies PathwayAssessmentSubject,
    label: 'Science and experiments',
    description:
      'You are drawn to evidence, systems, and understanding how things work.',
    icon: FlaskConical,
  },
  {
    value: 'writing' satisfies PathwayAssessmentSubject,
    label: 'Writing and language',
    description:
      'You communicate ideas clearly and precisely — on paper or in words.',
    icon: Pencil,
  },
  {
    value: 'arts' satisfies PathwayAssessmentSubject,
    label: 'Arts and creativity',
    description:
      'You express and process ideas through visual, musical, or creative work.',
    icon: Paintbrush,
  },
  {
    value: 'social' satisfies PathwayAssessmentSubject,
    label: 'People and society',
    description:
      'You understand human behavior, culture, history, and how societies work.',
    icon: Globe,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// STEP 4 — LEARNING PREFERENCE  (replaces freeTime)
// multi-select, 1–3
// field name: learningPreference
//

//
// These values feed into:
//   a) Pathway matching (some careers demand specific learning modes)
//   b) Roadmap generation (resource type weighting per step)
//
// Icon choices reflect the ACTION of each learning mode, not the output.
// ─────────────────────────────────────────────────────────────────────────────

const learningPreferenceOptions: PathwayAssessmentOption[] = [
  {
    value: 'practice' satisfies PathwayAssessmentLearningPreference,
    label: 'Hands-on practice',
    description:
      'You figure things out by doing them — trying, failing, and adjusting in real time.',
    icon: MousePointerClick,
  },
  {
    value: 'courses' satisfies PathwayAssessmentLearningPreference,
    label: 'Structured courses',
    description:
      'A clear curriculum, defined progression, and guided exercises work best for you.',
    icon: BookMarked,
  },
  {
    value: 'research' satisfies PathwayAssessmentLearningPreference,
    label: 'Reading and research',
    description:
      'You go deep through documentation, books, and articles before you start building.',
    icon: Search,
  },
  {
    value: 'watching' satisfies PathwayAssessmentLearningPreference,
    label: 'Video and demos',
    description:
      'Watching someone work through a problem or demonstrate a technique clicks fastest.',
    icon: Play,
  },
  {
    value: 'teaching' satisfies PathwayAssessmentLearningPreference,
    label: 'Teaching and explaining',
    description:
      "You don't fully understand something until you've explained it to someone else.",
    icon: Share2,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// STEP 5 — WORK STYLE
// multi-select, 1–2  (was single)
//
// Why 1–2 not 1–3:
//   Work style is a focused signal — composite professional identity.
//   Allowing 2 captures real hybrid roles (analyst-builder, helper-creator)
//   without letting users describe everything.
//
// Title: scenario-based ("on a productive day") grounds the answer in
// real behavior rather than abstract self-description.
// ─────────────────────────────────────────────────────────────────────────────

const workStyleOptions: PathwayAssessmentOption[] = [
  {
    value: 'analyze' satisfies PathwayAssessmentWorkStyle,
    label: 'Analyzing information',
    description:
      'Working through data, evidence, and logic to reach a reliable conclusion.',
    icon: TrendingUp,
  },
  {
    value: 'help' satisfies PathwayAssessmentWorkStyle,
    label: 'Helping people',
    description:
      'Direct support, care, and service — your work has a clear human on the receiving end.',
    icon: Heart,
  },
  {
    value: 'build' satisfies PathwayAssessmentWorkStyle,
    label: 'Building and fixing',
    description:
      'Creating, improving, or repairing something tangible and functional.',
    icon: Layers,
  },
  {
    value: 'create' satisfies PathwayAssessmentWorkStyle,
    label: 'Creating and innovating',
    description:
      'Open-ended problem-solving, invention, and bringing something new into existence.',
    icon: Sparkles,
  },
  {
    value: 'routine' satisfies PathwayAssessmentWorkStyle,
    label: 'Structured execution',
    description:
      'You are most effective when the expectations are clear and the process is consistent.',
    icon: Compass,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// STEP 6 — WORK ENVIRONMENT
// single-select (unchanged)
//
// Title change: "best work" instead of "enjoy working" — performance framing
// is more honest and produces better signal than preference framing.
// ─────────────────────────────────────────────────────────────────────────────

const environmentOptions: PathwayAssessmentOption[] = [
  {
    value: 'office' satisfies PathwayAssessmentWorkEnvironment,
    label: 'Office with a team',
    description:
      'Structured, collaborative, shared momentum — you want people around you.',
    icon: Building2,
  },
  {
    value: 'remote' satisfies PathwayAssessmentWorkEnvironment,
    label: 'Remote and flexible',
    description:
      'Autonomy, location freedom, and the ability to design your own environment.',
    icon: Home,
  },
  {
    value: 'outdoor' satisfies PathwayAssessmentWorkEnvironment,
    label: 'Outdoor or on-site',
    description:
      'Physical, field-based, or active environments — you need to move and do.',
    icon: Trees,
  },
  {
    value: 'lab' satisfies PathwayAssessmentWorkEnvironment,
    label: 'Lab or studio',
    description:
      'A focused, specialized space for technical, scientific, or creative practice.',
    icon: TestTube2,
  },
  {
    value: 'mixed' satisfies PathwayAssessmentWorkEnvironment,
    label: 'Varied environments',
    description:
      'No single setting defines you — you do your best work when the context shifts.',
    icon: Shuffle,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// STEP 7 — COLLABORATION STYLE  (NEW DIMENSION)
// single-select
// field name: collaborationStyle
//
// Why this is new:
//   workEnvironment captures location (office, remote, outdoor).
//   This captures interaction density — a completely different signal.
//   A remote worker can be in calls all day or alone all day.
//   This distinction is critical for matching careers like researcher
//   vs. consultant, or solo developer vs. team lead.
//
// DIMENSION_WEIGHT: 0.05 (conservative start — validate before raising)
// ─────────────────────────────────────────────────────────────────────────────

const collaborationStyleOptions: PathwayAssessmentOption[] = [
  {
    value: 'solo' satisfies PathwayAssessmentCollaborationStyle,
    label: 'Mostly independent',
    description:
      'Deep focus, clear ownership, and minimal interruption — you work best alone.',
    icon: User,
  },
  {
    value: 'small_team' satisfies PathwayAssessmentCollaborationStyle,
    label: 'Small, close team',
    description:
      'A tight group of 3–6 people who know each other well and move together.',
    icon: Users,
  },
  {
    value: 'large_team' satisfies PathwayAssessmentCollaborationStyle,
    label: 'Large collaborative team',
    description:
      'Defined roles, shared goals, and the energy of a bigger organization.',
    icon: Network,
  },
  {
    value: 'client_facing' satisfies PathwayAssessmentCollaborationStyle,
    label: 'Client or customer-facing',
    description:
      'Regular interaction with the people you are directly serving or advising.',
    icon: UserCheck,
  },
  {
    value: 'community' satisfies PathwayAssessmentCollaborationStyle,
    label: 'Community or public-facing',
    description:
      'Your work connects with a broader audience, group, or public in a meaningful way.',
    icon: Megaphone,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// STEP 8 — IMPACT
// multi-select, 1–2  (was single)
//
// Why 1–2:
//   Values are naturally composite in professional life. A doctor values
//   helping people AND discovering knowledge. A UX designer values creating
//   useful things AND working with people. Single-select loses real signal.
//
// Title: "would feel missing" is stronger than "what matters" — it invites
// the user to test the answer against absence, which is more reliable.
// ─────────────────────────────────────────────────────────────────────────────

const impactOptions: PathwayAssessmentOption[] = [
  {
    value: 'create' satisfies PathwayAssessmentImpact,
    label: 'Create useful things',
    description:
      'You want the output of your work to make something easier, better, or possible.',
    icon: Lightbulb,
  },
  {
    value: 'people' satisfies PathwayAssessmentImpact,
    label: 'Work directly with people',
    description:
      'Real human interaction — support, guidance, or service — is central to your work.',
    icon: Users,
  },
  {
    value: 'discover' satisfies PathwayAssessmentImpact,
    label: 'Discover new knowledge',
    description:
      'Research, exploration, and expanding what is known matters deeply to you.',
    icon: Microscope,
  },
  {
    value: 'systems' satisfies PathwayAssessmentImpact,
    label: 'Build important systems',
    description:
      'You want to keep critical infrastructure, processes, or operations running well.',
    icon: Network,
  },
  {
    value: 'express' satisfies PathwayAssessmentImpact,
    label: 'Express and inspire',
    description:
      'Imagination, design, and creative expression belong at the center of your work.',
    icon: Palette,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// STEP 9 — GOALS
// single-select (unchanged — INTENTIONALLY forced single)
//
// Keeping this single is a deliberate product decision.
// Goals being multi-select reduces its differentiation power.
// The forced choice surfaces real priority, not a wish list.
// "What would make your career feel like a success?" is stronger than
// "What matters?" because it asks the user to imagine a concrete outcome.
// ─────────────────────────────────────────────────────────────────────────────

const goalOptions: PathwayAssessmentOption[] = [
  {
    value: 'impact' satisfies PathwayAssessmentGoal,
    label: 'Make a difference',
    description:
      'Meaning and contribution matter most — you need to feel your work counts.',
    icon: Star,
  },
  {
    value: 'money' satisfies PathwayAssessmentGoal,
    label: 'Financial stability',
    description:
      'Strong income and long-term security are non-negotiable for you.',
    icon: DollarSign,
  },
  {
    value: 'balance' satisfies PathwayAssessmentGoal,
    label: 'Work-life balance',
    description:
      'You want work that fits your life — not a life that revolves around your work.',
    icon: Scale,
  },
  {
    value: 'growth' satisfies PathwayAssessmentGoal,
    label: 'Continuous growth',
    description:
      "You're not satisfied staying at the same level — growth is a requirement, not a bonus.",
    icon: GraduationCap,
  },
  {
    value: 'variety' satisfies PathwayAssessmentGoal,
    label: 'Challenge and variety',
    description:
      'Repetition slows you down — you need work that evolves and keeps you sharp.',
    icon: Rocket,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// STEP DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

export const PATHWAY_ASSESSMENT_STEPS: PathwayAssessmentStep[] = [
  {
    id: 'welcome',
    type: 'intro',
    title: 'Find a study or career path that fits you',
    description:
      'Answer 9 short questions about your strengths, interests, and goals. AICA will turn your answers into clear pathway matches, honest explanations, and a personalized next-step roadmap.',
    helperText:
      'There are no right or wrong answers. Choose what feels genuinely true to you right now.',
    cta: 'Begin assessment',
  },

  {
    id: 'strengths',
    type: 'multi-select',
    title: 'When you are working well, what is happening?',
    helperText:
      'Choose up to 3 — what actually feels natural, not what sounds impressive.',
    fieldName: 'strengths',
    minSelect: 1,
    maxSelect: 3,
    options: strengthOptions,
  },

  {
    id: 'passions',
    type: 'multi-select',
    title: 'What genuinely pulls your attention?',
    helperText:
      'Choose up to 3 — what you actually spend time on, not what you think you should care about.',
    fieldName: 'passions',
    minSelect: 1,
    maxSelect: 3,
    options: passionOptions,
  },

  {
    id: 'subjects',
    type: 'single-select',
    title: 'Which subject could you explain most confidently to someone else?',
    helperText:
      'Not your favorite — the one where you actually understand it well enough to teach it.',
    fieldName: 'subjects',
    options: subjectOptions,
  },

  {
    id: 'learning-preference',
    type: 'multi-select',
    title: 'How do you actually learn something new?',
    helperText:
      'Think about the last skill you picked up — not how you think you should learn. Up to 3.',
    fieldName: 'learningPreference',
    minSelect: 1,
    maxSelect: 3,
    options: learningPreferenceOptions,
  },

  {
    id: 'work-style',
    type: 'multi-select',
    title: 'On a productive day at work, what are you doing?',
    helperText:
      'Choose 1 or 2 — the work modes that feel most like you, not just what you are capable of.',
    fieldName: 'workStyle',
    minSelect: 1,
    maxSelect: 2,
    options: workStyleOptions,
  },

  {
    id: 'work-environment',
    type: 'single-select',
    title: 'Where would you do your best work?',
    helperText:
      'Think about the environment where you actually perform well, not where you wish you could work.',
    fieldName: 'workEnvironment',
    options: environmentOptions,
  },

  {
    id: 'collaboration-style',
    type: 'single-select',
    title: 'How do you prefer to work with other people?',
    helperText:
      'This is about interaction density — not location. A remote worker can be in calls all day or alone all day.',
    fieldName: 'collaborationStyle',
    options: collaborationStyleOptions,
  },

  {
    id: 'impact',
    type: 'multi-select',
    title: 'What would feel missing if your work did not include it?',
    helperText:
      'Choose 1 or 2 — the things that would make the work feel hollow without them.',
    fieldName: 'impact',
    minSelect: 1,
    maxSelect: 2,
    options: impactOptions,
  },

  {
    id: 'goals',
    type: 'single-select',
    title: 'What would make your career feel like a success?',
    helperText:
      'Only one — the outcome that, if it were missing, would make everything else feel incomplete.',
    fieldName: 'goals',
    options: goalOptions,
  },

  {
    id: 'finish',
    type: 'cta',
    title: 'Your profile is ready',
    description:
      'AICA can now match your profile to ranked pathways, explain each match clearly, and build a personalized roadmap for where you want to go.',
    helperText: 'Submit your profile to see your recommendations.',
    cta: 'See my matches',
  },
] as const;
