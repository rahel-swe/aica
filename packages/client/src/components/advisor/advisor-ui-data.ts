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
    id: 'fit',
    mode: 'explain',
    source: 'recommendation',
    icon: BadgeQuestionMark,
    title: 'Why does this pathway match me?',
    prompt: 'Explain why this pathway fits me based on my AICA profile.',
    description: 'Connect recommendation reasons to your actual traits.',
    tone: 'text-blue-400',
  },
  {
    id: 'first-focus',
    mode: 'guide_step',
    source: 'roadmap',
    icon: Route,
    title: 'What should I focus on first?',
    prompt: 'What should I focus on first in my roadmap?',
    description: 'Turn the roadmap into a clear first move.',
    tone: 'text-green-400',
  },
  {
    id: 'adjust',
    mode: 'adjust',
    source: 'roadmap',
    icon: RefreshCcw,
    title: 'Adjust this plan for my constraints',
    prompt: 'Adjust this roadmap for my time, budget, and constraints.',
    description: 'Keep the goal but change the pace and sequence.',
    tone: 'text-orange-400',
  },
  {
    id: 'compare',
    mode: 'decide',
    source: 'recommendation',
    icon: GitCompare,
    title: 'Compare my top options',
    prompt: 'Compare my top two pathway options in a practical way.',
    description: 'Look at effort, fit, risk, and next steps.',
    tone: 'text-blue-400',
  },
  {
    id: 'risk',
    mode: 'verify',
    source: 'pathway',
    icon: Compass,
    title: 'What are the risks?',
    prompt: 'What are the main risks or challenges in this pathway?',
    description: 'Add realism without discouraging momentum.',
    tone: 'text-rose-400',
  },
  // {
  //   id: 'weekly',
  //   mode: 'guide_step',
  //   source: 'roadmap',
  //   icon: ListChecks,
  //   title: 'What should I do this week?',
  //   prompt: 'What should I do this week based on my roadmap?',
  //   description: 'Make the next action small and realistic.',
  //   tone: 'text-yellow-300',
  // },
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
