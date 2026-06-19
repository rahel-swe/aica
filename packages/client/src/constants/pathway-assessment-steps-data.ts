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
  User, // small_team  (falls back to Users if not available)
  Network, // large_team
  UserCheck, // client_facing
  Megaphone, // community
  // ── Impact
  Star, // create (impact)
  Users as UsersImpact, // people (impact) — same icon, different context
  BookOpen, // discover — same icon, different context
  Settings2, // systems
  PenLine, // express
  // ── Goals
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

import { m } from '../paraglide/messages';

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
    label: m.pathway_assessment_strength_problem_solving_label(),
    description: m.pathway_assessment_strength_problem_solving_description(),
    icon: Puzzle,
  },
  {
    value: 'creativity' satisfies PathwayAssessmentStrength,
    label: m.pathway_assessment_strength_creativity_label(),
    description: m.pathway_assessment_strength_creativity_description(),
    icon: Palette,
  },
  {
    value: 'people' satisfies PathwayAssessmentStrength,
    label: m.pathway_assessment_strength_people_label(),
    description: m.pathway_assessment_strength_people_description(),
    icon: Users,
  },
  {
    value: 'analytical' satisfies PathwayAssessmentStrength,
    label: m.pathway_assessment_strength_analytical_label(),
    description: m.pathway_assessment_strength_analytical_description(),
    icon: BarChart3,
  },
  {
    value: 'communication' satisfies PathwayAssessmentStrength,
    label: m.pathway_assessment_strength_communication_label(),
    description: m.pathway_assessment_strength_communication_description(),
    icon: MessageCircle,
  },
  {
    value: 'hands_on' satisfies PathwayAssessmentStrength,
    label: m.pathway_assessment_strength_hands_on_label(),
    description: m.pathway_assessment_strength_hands_on_description(),
    icon: Wrench,
  },
  {
    value: 'fast_learning' satisfies PathwayAssessmentStrength,
    label: m.pathway_assessment_strength_fast_learning_label(),
    description: m.pathway_assessment_strength_fast_learning_description(),
    icon: Zap,
  },
  {
    value: 'organized' satisfies PathwayAssessmentStrength,
    label: m.pathway_assessment_strength_organized_label(),
    description: m.pathway_assessment_strength_organized_description(),
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
    label: m.pathway_assessment_passion_tech_label(),
    description: m.pathway_assessment_passion_tech_description(),
    icon: Monitor,
  },
  {
    value: 'music' satisfies PathwayAssessmentPassion,
    label: m.pathway_assessment_passion_music_label(),
    description: m.pathway_assessment_passion_music_description(),
    icon: Music,
  },
  {
    value: 'sports' satisfies PathwayAssessmentPassion,
    label: m.pathway_assessment_passion_sports_label(),
    description: m.pathway_assessment_passion_sports_description(),
    icon: Activity,
  },
  {
    value: 'reading' satisfies PathwayAssessmentPassion,
    label: m.pathway_assessment_passion_reading_label(),
    description: m.pathway_assessment_passion_reading_description(),
    icon: BookOpen,
  },
  {
    value: 'science' satisfies PathwayAssessmentPassion,
    label: m.pathway_assessment_passion_science_label(),
    description: m.pathway_assessment_passion_science_description(),
    icon: Microscope,
  },
  {
    value: 'social' satisfies PathwayAssessmentPassion,
    label: m.pathway_assessment_passion_social_label(),
    description: m.pathway_assessment_passion_social_description(),
    icon: Handshake,
  },
  {
    value: 'nature' satisfies PathwayAssessmentPassion,
    label: m.pathway_assessment_passion_nature_label(),
    description: m.pathway_assessment_passion_nature_description(),
    icon: Leaf,
  },
  {
    value: 'building' satisfies PathwayAssessmentPassion,
    label: m.pathway_assessment_passion_building_label(),
    description: m.pathway_assessment_passion_building_description(),
    icon: Hammer,
  },
  {
    value: 'ideas' satisfies PathwayAssessmentPassion,
    label: m.pathway_assessment_passion_ideas_label(),
    description: m.pathway_assessment_passion_ideas_description(),
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
    label: m.pathway_assessment_subject_math_label(),
    description: m.pathway_assessment_subject_math_description(),
    icon: Calculator,
  },
  {
    value: 'science' satisfies PathwayAssessmentSubject,
    label: m.pathway_assessment_subject_science_label(),
    description: m.pathway_assessment_subject_science_description(),
    icon: FlaskConical,
  },
  {
    value: 'writing' satisfies PathwayAssessmentSubject,
    label: m.pathway_assessment_subject_writing_label(),
    description: m.pathway_assessment_subject_writing_description(),
    icon: Pencil,
  },
  {
    value: 'arts' satisfies PathwayAssessmentSubject,
    label: m.pathway_assessment_subject_arts_label(),
    description: m.pathway_assessment_subject_arts_description(),
    icon: Paintbrush,
  },
  {
    value: 'social' satisfies PathwayAssessmentSubject,
    label: m.pathway_assessment_subject_social_label(),
    description: m.pathway_assessment_subject_social_description(),
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
    label: m.pathway_assessment_learning_pref_practice_label(),
    description: m.pathway_assessment_learning_pref_practice_description(),
    icon: MousePointerClick,
  },
  {
    value: 'courses' satisfies PathwayAssessmentLearningPreference,
    label: m.pathway_assessment_learning_pref_courses_label(),
    description: m.pathway_assessment_learning_pref_courses_description(),
    icon: BookMarked,
  },
  {
    value: 'research' satisfies PathwayAssessmentLearningPreference,
    label: m.pathway_assessment_learning_pref_research_label(),
    description: m.pathway_assessment_learning_pref_research_description(),
    icon: Search,
  },
  {
    value: 'watching' satisfies PathwayAssessmentLearningPreference,
    label: m.pathway_assessment_learning_pref_watching_label(),
    description: m.pathway_assessment_learning_pref_watching_description(),
    icon: Play,
  },
  {
    value: 'teaching' satisfies PathwayAssessmentLearningPreference,
    label: m.pathway_assessment_learning_pref_teaching_label(),
    description: m.pathway_assessment_learning_pref_teaching_description(),
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
    label: m.pathway_assessment_workstyle_analyze_label(),
    description: m.pathway_assessment_workstyle_analyze_description(),
    icon: TrendingUp,
  },
  {
    value: 'help' satisfies PathwayAssessmentWorkStyle,
    label: m.pathway_assessment_workstyle_help_label(),
    description: m.pathway_assessment_workstyle_help_description(),
    icon: Heart,
  },
  {
    value: 'build' satisfies PathwayAssessmentWorkStyle,
    label: m.pathway_assessment_workstyle_build_label(),
    description: m.pathway_assessment_workstyle_build_description(),
    icon: Layers,
  },
  {
    value: 'create' satisfies PathwayAssessmentWorkStyle,
    label: m.pathway_assessment_workstyle_create_label(),
    description: m.pathway_assessment_workstyle_create_description(),
    icon: Sparkles,
  },
  {
    value: 'routine' satisfies PathwayAssessmentWorkStyle,
    label: m.pathway_assessment_workstyle_routine_label(),
    description: m.pathway_assessment_workstyle_routine_description(),
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
    label: m.pathway_assessment_env_office_label(),
    description: m.pathway_assessment_env_office_description(),
    icon: Building2,
  },
  {
    value: 'remote' satisfies PathwayAssessmentWorkEnvironment,
    label: m.pathway_assessment_env_remote_label(),
    description: m.pathway_assessment_env_remote_description(),
    icon: Home,
  },
  {
    value: 'outdoor' satisfies PathwayAssessmentWorkEnvironment,
    label: m.pathway_assessment_env_outdoor_label(),
    description: m.pathway_assessment_env_outdoor_description(),
    icon: Trees,
  },
  {
    value: 'lab' satisfies PathwayAssessmentWorkEnvironment,
    label: m.pathway_assessment_env_lab_label(),
    description: m.pathway_assessment_env_lab_description(),
    icon: TestTube2,
  },
  {
    value: 'mixed' satisfies PathwayAssessmentWorkEnvironment,
    label: m.pathway_assessment_env_mixed_label(),
    description: m.pathway_assessment_env_mixed_description(),
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
    label: m.pathway_assessment_collab_solo_label(),
    description: m.pathway_assessment_collab_solo_description(),
    icon: User,
  },
  {
    value: 'small_team' satisfies PathwayAssessmentCollaborationStyle,
    label: m.pathway_assessment_collab_small_team_label(),
    description: m.pathway_assessment_collab_small_team_description(),
    icon: Users,
  },
  {
    value: 'large_team' satisfies PathwayAssessmentCollaborationStyle,
    label: m.pathway_assessment_collab_large_team_label(),
    description: m.pathway_assessment_collab_large_team_description(),
    icon: Network,
  },
  {
    value: 'client_facing' satisfies PathwayAssessmentCollaborationStyle,
    label: m.pathway_assessment_collab_client_facing_label(),
    description: m.pathway_assessment_collab_client_facing_description(),
    icon: UserCheck,
  },
  {
    value: 'community' satisfies PathwayAssessmentCollaborationStyle,
    label: m.pathway_assessment_collab_community_label(),
    description: m.pathway_assessment_collab_community_description(),
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
    label: m.pathway_assessment_impact_create_label(),
    description: m.pathway_assessment_impact_create_description(),
    icon: Lightbulb,
  },
  {
    value: 'people' satisfies PathwayAssessmentImpact,
    label: m.pathway_assessment_impact_people_label(),
    description: m.pathway_assessment_impact_people_description(),
    icon: UsersImpact,
  },
  {
    value: 'discover' satisfies PathwayAssessmentImpact,
    label: m.pathway_assessment_impact_discover_label(),
    description: m.pathway_assessment_impact_discover_description(),
    icon: Microscope,
  },
  {
    value: 'systems' satisfies PathwayAssessmentImpact,
    label: m.pathway_assessment_impact_systems_label(),
    description: m.pathway_assessment_impact_systems_description(),
    icon: Network,
  },
  {
    value: 'express' satisfies PathwayAssessmentImpact,
    label: m.pathway_assessment_impact_express_label(),
    description: m.pathway_assessment_impact_express_description(),
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
    label: m.pathway_assessment_goal_impact_label(),
    description: m.pathway_assessment_goal_impact_description(),
    icon: Star,
  },
  {
    value: 'money' satisfies PathwayAssessmentGoal,
    label: m.pathway_assessment_goal_money_label(),
    description: m.pathway_assessment_goal_money_description(),
    icon: DollarSign,
  },
  {
    value: 'balance' satisfies PathwayAssessmentGoal,
    label: m.pathway_assessment_goal_balance_label(),
    description: m.pathway_assessment_goal_balance_description(),
    icon: Scale,
  },
  {
    value: 'growth' satisfies PathwayAssessmentGoal,
    label: m.pathway_assessment_goal_growth_label(),
    description: m.pathway_assessment_goal_growth_description(),
    icon: GraduationCap,
  },
  {
    value: 'variety' satisfies PathwayAssessmentGoal,
    label: m.pathway_assessment_goal_variety_label(),
    description: m.pathway_assessment_goal_variety_description(),
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
    title: m.pathway_assessment_welcome_title(),
    description: m.pathway_assessment_welcome_description(),
    helperText: m.pathway_assessment_welcome_helper(),
    cta: m.pathway_assessment_welcome_cta(),
  },
  {
    id: 'strengths',
    type: 'multi-select',
    title: m.pathway_assessment_strengths_title(),
    helperText: m.pathway_assessment_strengths_helper(),
    fieldName: 'strengths',
    minSelect: 1,
    maxSelect: 3,
    options: strengthOptions,
  },

  {
    id: 'passions',
    type: 'multi-select',
    title: m.pathway_assessment_passions_title(),
    helperText: m.pathway_assessment_passions_helper(),
    fieldName: 'passions',
    minSelect: 1,
    maxSelect: 3,
    options: passionOptions,
  },

  {
    id: 'subjects',
    type: 'single-select',
    title: m.pathway_assessment_subjects_title(),
    helperText: m.pathway_assessment_subjects_helper(),
    fieldName: 'subjects',
    options: subjectOptions,
  },

  {
    id: 'learning-preference',
    type: 'multi-select',
    title: m.pathway_assessment_learning_preference_title(),
    helperText: m.pathway_assessment_learning_preference_helper(),
    fieldName: 'learningPreference',
    minSelect: 1,
    maxSelect: 3,
    options: learningPreferenceOptions,
  },

  {
    id: 'work-style',
    type: 'multi-select',
    title: m.pathway_assessment_work_style_title(),
    helperText: m.pathway_assessment_work_style_helper(),
    fieldName: 'workStyle',
    minSelect: 1,
    maxSelect: 2,
    options: workStyleOptions,
  },
  {
    id: 'work-environment',
    type: 'single-select',
    title: m.pathway_assessment_environment_title(),
    helperText: m.pathway_assessment_environment_helper(),
    fieldName: 'workEnvironment',
    options: environmentOptions,
  },
  {
    id: 'collaboration-style',
    type: 'single-select',
    title: m.pathway_assessment_collaboration_title(),
    helperText: m.pathway_assessment_collaboration_helper(),
    fieldName: 'collaborationStyle',
    options: collaborationStyleOptions,
  },

  {
    id: 'impact',
    type: 'multi-select',
    title: m.pathway_assessment_impact_title(),
    helperText: m.pathway_assessment_impact_helper(),
    fieldName: 'impact',
    minSelect: 1,
    maxSelect: 2,
    options: impactOptions,
  },

  {
    id: 'goals',
    type: 'single-select',
    title: m.pathway_assessment_goals_title(),
    helperText: m.pathway_assessment_goals_helper(),
    fieldName: 'goals',
    options: goalOptions,
  },

  {
    id: 'finish',
    type: 'cta',
    title: m.pathway_assessment_finish_title(),
    description: m.pathway_assessment_finish_description(),
    helperText: m.pathway_assessment_finish_helper(),
    cta: m.pathway_assessment_finish_cta(),
  },
] as const;
