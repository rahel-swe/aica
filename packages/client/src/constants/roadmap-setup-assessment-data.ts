/**
 * roadmap-setup-assessment-data.ts
 *
 * Changes from original:
 *  1. emoji: string → icon: LucideIcon  (PathwayAssessmentOption type already updated)
 *  2. Added 20 unique lucide-react icon imports
 *
 *  3. timelineOptions — fully redesigned (range: 4-8 weeks → 12 months):
 *       ⚠️  'sprint' is a NEW value — update your contract type:
 *           RoadmapSetupAssessmentFormValues.timeline  →  'sprint' | 'short' | 'medium' | 'long'
 *       'short' | 'medium' | 'long' values are unchanged but now represent longer durations
 *
 *  4. timeline step helperText — rewritten to explain the career-type duality:
 *       tech paths (frontend/backend/design) → this can be the complete roadmap
 *       complex careers (civil eng/medicine)  → this is the first major action window
 *
 *  5. Targeted copy rewrites (2 descriptions):
 *       weeklyTime.medium  — was generic ("most people")
 *       roadmapStyle.fast_track — was jargon-y ("bias toward practical momentum")
 *
 *  6. All other copy left intact — currentStage and constraints were already 9/10
 */

import {
  // ── Current stage
  School, // high_school
  GraduationCap, // university
  Award, // graduate
  Laptop, // self_learning
  Briefcase, // working
  // ── Weekly time  (pace → intensity metaphor)
  Coffee, // low     — relaxed
  Clock, // medium  — steady
  Zap, // high    — sharp
  Flame, // intense — full burn
  // ── Timeline  (scope metaphor: gust → full map)
  Wind, // sprint  — fast, immediate
  CalendarDays, // short   — one structured quarter
  TrendingUp, // medium  — visible upward arc
  Map, // long    — full territory
  // ── Constraints
  Wallet, // low_budget
  WifiOff, // weak_internet
  Smartphone, // no_laptop
  Leaf, // beginner
  CalendarOff, // inconsistent_schedule
  // ── Roadmap style
  Rocket, // fast_track
  Scale, // balanced
  Brain, // deep
} from 'lucide-react';

import type {
  PathwayAssessmentOption,
  PathwayAssessmentStepType,
} from './pathway-assessment-steps-data';

import type { RoadmapSetupAssessmentFormValues } from '@contracts/shared/types/roadmap-setup-assessment-types';

// ─────────────────────────────────────────────────────────────────────────────

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
  helperText?: string;
  fieldName?: keyof RoadmapSetupAssessmentFormValues;
  minSelect?: number;
  maxSelect?: number;
  options?: PathwayAssessmentOption[];
};

// ─── Current Stage ────────────────────────────────────────────────────────────
// Copy verdict: 9/10 — left intact. All descriptions are specific and grounded.
// "Reposition carefully" in the working stage description is especially strong.

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

// ─── Weekly Time ──────────────────────────────────────────────────────────────
// Copy verdict: 8/10 — one rewrite on 'medium' (was too generic).

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
    // REWRITE: "A realistic steady pace for most people" — generic, no stated benefit
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

// ─── Timeline ─────────────────────────────────────────────────────────────────
// Fully redesigned. Range extended from (4-6w → 4-6m) to (4-8w → 12m).
//
// PRODUCT CONTEXT:
//   Self-contained tech paths (frontend, backend, UI/UX, data science)
//   → 6-12 months can be a COMPLETE roadmap
//
//   Multi-year traditional careers (civil engineering, medicine, architecture)
//   → 6-12 months is a FIRST ACTION WINDOW — not the full timeline
//
//   Both user types see the same 4 options. AICA frames the output differently
//   based on the career matched in the pathway assessment.
//
// ⚠️  CONTRACT UPDATE REQUIRED:
//   'sprint' is a new value. Update your Zod schema / TypeScript union:
//
//     timeline: z.enum(['sprint', 'short', 'medium', 'long'])
//
//   The existing 'short' | 'medium' | 'long' values are unchanged in name —
//   only their displayed duration labels have shifted upward.

const timelineOptions: PathwayAssessmentOption[] = [
  {
    value: 'sprint', // ← NEW — add to contract
    label: '4–8 weeks',
    description:
      'A quick-start window — fast clarity, first wins, and immediate momentum.',
    icon: Wind,
  },
  {
    value: 'short', // display shifted: was '4-6 weeks' → now '2-3 months'
    label: '2–3 months',
    description:
      'One structured quarter — meaningful progress you can measure and build on.',
    icon: CalendarDays,
  },
  {
    value: 'medium', // display shifted: was '2-3 months' → now '6 months'
    label: '6 months',
    description:
      'Half-year plan — a complete roadmap for most tech and creative paths.',
    icon: TrendingUp,
  },
  {
    value: 'long', // display shifted: was '4-6 months' → now '12 months'
    label: '12 months',
    description:
      'Full-year commitment — complete for self-contained paths, first major phase for complex careers.',
    icon: Map,
  },
];

// ─── Constraints ─────────────────────────────────────────────────────────────
// Copy verdict: 9/10 — left intact. Honest, practical, non-judgmental.
// "Roadmap that can survive busy or unpredictable weeks" is very good product copy.

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

// ─── Roadmap Style ────────────────────────────────────────────────────────────
// Copy verdict: 8/10 — one rewrite on 'fast_track' (read like internal spec).

const roadmapStyleOptions: PathwayAssessmentOption[] = [
  {
    value: 'fast_track',
    label: 'Fast practical progress',
    // REWRITE: "Bias toward practical momentum, earlier output, and faster entry steps"
    //          → product-internal language, not user-facing copy
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

// ─── Steps ───────────────────────────────────────────────────────────────────

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
    // REWRITE: was vague. Now explicitly tells users what each duration means
    // depending on their career type — the core product insight the user described.
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
    helperText: 'Submit to save your setup and continue.',
  },
] as const;
