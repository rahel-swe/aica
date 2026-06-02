import type {
  AdvisorMode,
  AdvisorSource,
} from '@contracts/shared/types/advisor-types';
import {
  BadgeQuestionMark,
  Compass,
  GitCompare,
  ListChecks,
  RefreshCcw,
  Route,
  type LucideIcon,
} from 'lucide-react';

// ─── Prompt cards ─────────────────────────────────────────────────────────────
export type AdvisorPrompt = {
  id: string;
  mode: AdvisorMode;
  source: AdvisorSource;
  title: string;
  prompt: string;
  description: string;
  tone: string;
  icon: LucideIcon;
};

export const advisorPrompts: AdvisorPrompt[] = [
  {
    id: 'next-step',
    mode: 'guide_step',
    source: 'roadmap',
    icon: Route,
    title: 'What should I do next?',
    prompt: 'Based on my roadmap, what is the single best next step?',
    description: 'Turn my roadmap into one clear action.',
    tone: 'green',
  },

  {
    id: 'why-fit',
    mode: 'explain',
    source: 'recommendation',
    icon: BadgeQuestionMark,
    title: 'Why is this a good fit?',
    prompt:
      'Explain why this pathway matches my profile, strengths, and interests.',
    description: 'Understand the reasoning behind the recommendation.',
    tone: 'blue',
  },

  {
    id: 'compare',
    mode: 'decide',
    source: 'recommendation',
    icon: GitCompare,
    title: 'Help me choose',
    prompt:
      'Compare my top pathway options and tell me the practical trade-offs.',
    description: 'Compare effort, opportunity, risk, and long-term fit.',
    tone: 'blue',
  },

  {
    id: 'fastest-path',
    mode: 'guide_step',
    source: 'roadmap',
    icon: Compass,
    title: 'What is the fastest path?',
    prompt:
      'Show me the fastest realistic path to reach this goal from where I am now.',
    description: 'Prioritize speed while staying realistic.',
    tone: 'yellow',
  },

  {
    id: 'adjust-plan',
    mode: 'adjust',
    source: 'roadmap',
    icon: RefreshCcw,
    title: 'Adapt this plan',
    prompt:
      'Adjust this roadmap based on my available time, budget, and constraints.',
    description: 'Make the roadmap work for my situation.',
    tone: 'orange',
  },

  {
    id: 'risks',
    mode: 'verify',
    source: 'pathway',
    icon: ListChecks,
    title: 'What could go wrong?',
    prompt:
      'What challenges, risks, or common mistakes should I expect in this pathway?',
    description: 'Spot obstacles before they become blockers.',
    tone: 'rose',
  },
];

export const advisorBoundaries = [
  {
    title: 'Pathway fit',
    description: 'Why a recommendation matches your profile.',
    icon: BadgeQuestionMark,
  },
  {
    title: 'Roadmap use',
    description: 'What to do next and how to pace the plan.',
    icon: Route,
  },
  {
    title: 'Realistic comparison',
    description: 'Compare strong options without random advice.',
    icon: GitCompare,
  },
  {
    title: 'Plan adjustment',
    description: 'Adapt the roadmap to constraints and review points.',
    icon: RefreshCcw,
  },
  {
    title: 'Decision support',
    description: 'Decide whether to continue, pause, or compare.',
    icon: Compass,
  },
  {
    title: 'Next action',
    description: 'Convert guidance into one doable step.',
    icon: ListChecks,
  },
];

// ─── Tone classes ─────────────────────────────────────────────────────────────

export const toneClasses: Record<
  AdvisorPrompt['tone'],
  { card: string; badge: string; icon: string }
> = {
  blue: {
    card: 'border-blue-300/70 bg-blue-100/70 hover:bg-blue-200/60',
    badge: 'border-blue-300 bg-blue-200 text-blue-950',
    icon: 'bg-blue-300 text-blue-950',
  },
  green: {
    card: 'border-emerald-300/70 bg-emerald-100/70 hover:bg-emerald-200/60',
    badge: 'border-emerald-300 bg-emerald-200 text-emerald-950',
    icon: 'bg-emerald-300 text-emerald-950',
  },
  yellow: {
    card: 'border-yellow-300/70 bg-yellow-100/80 hover:bg-yellow-200/70',
    badge: 'border-yellow-300 bg-yellow-200 text-yellow-950',
    icon: 'bg-yellow-300 text-yellow-950',
  },
  orange: {
    card: 'border-orange-300/70 bg-orange-100/75 hover:bg-orange-200/65',
    badge: 'border-orange-300 bg-orange-200 text-orange-950',
    icon: 'bg-orange-300 text-orange-950',
  },
  rose: {
    card: 'border-rose-300/70 bg-rose-100/75 hover:bg-rose-200/65',
    badge: 'border-rose-300 bg-rose-200 text-rose-950',
    icon: 'bg-rose-300 text-rose-950',
  },
};
