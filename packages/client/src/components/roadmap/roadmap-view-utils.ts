import type {
  PathwayRoadmap,
  RoadmapPhase,
  RoadmapStep,
  RoadmapStepDifficulty,
  RoadmapStepStatus,
} from '@contracts/shared/types/roadmap-types';
import { Circle, Star, Triangle, type LucideIcon } from 'lucide-react';

export type RoadmapTone =
  | 'foundation'
  | 'practice'
  | 'positioning'
  | 'review'
  | 'regulated';

export const sortPhases = (phases: RoadmapPhase[]) =>
  [...phases].sort((a, b) => a.order - b.order);

export const sortSteps = (steps: RoadmapStep[]) =>
  [...steps].sort((a, b) => a.order - b.order);

export const getRoadmapStats = (roadmap: PathwayRoadmap) => {
  const phases = sortPhases(roadmap.phases);
  const steps = roadmap.steps;
  const completedSteps = steps.filter((step) => step.status === 'completed');
  const inProgressSteps = steps.filter((step) => step.status === 'in_progress');
  const progress =
    steps.length > 0
      ? Math.round((completedSteps.length / steps.length) * 100)
      : 0;

  return {
    phases,
    steps,
    totalPhases: phases.length,
    totalSteps: steps.length,
    completedSteps: completedSteps.length,
    inProgressSteps: inProgressSteps.length,
    progress,
    currentFocus:
      inProgressSteps[0]?.title ??
      steps.find((step) => step.status === 'pending')?.title,
  };
};

export const formatRoadmapStyle = (style?: PathwayRoadmap['roadmapStyle']) => {
  if (style === 'fast_track') return 'Fast track';
  if (style === 'deep') return 'Deep study';
  return 'Balanced';
};

export const formatDate = (date?: string) => {
  if (!date) return 'Not scheduled';

  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
};

export const getPhaseTone = (
  phase: RoadmapPhase,
  index: number
): RoadmapTone => {
  const value = `${phase.phase} ${phase.title}`.toLowerCase();

  if (
    value.includes('license') ||
    value.includes('clinical') ||
    value.includes('verification') ||
    value.includes('regulated')
  ) {
    return 'regulated';
  }

  if (
    value.includes('portfolio') ||
    value.includes('practice') ||
    value.includes('project') ||
    value.includes('applied')
  ) {
    return 'practice';
  }

  if (
    value.includes('position') ||
    value.includes('entry') ||
    value.includes('transition') ||
    value.includes('application')
  ) {
    return 'positioning';
  }

  if (value.includes('review') || value.includes('checkpoint')) {
    return 'review';
  }

  if (index === 1) return 'practice';
  if (index >= 2) return 'positioning';
  return 'foundation';
};

export const phaseToneClasses: Record<
  RoadmapTone,
  {
    rail: string;
    dot: string;
    badge: string;
    surface: string;
    text: string;
  }
> = {
  foundation: {
    rail: 'bg-sky-200',
    dot: 'bg-sky-200 ring-sky-100',
    badge: 'border-sky-200 bg-sky-100 text-sky-900',
    surface: 'bg-sky-50',
    text: 'text-sky-900',
  },
  practice: {
    rail: 'bg-emerald-200',
    dot: 'bg-emerald-200 ring-emerald-100',
    badge: 'border-emerald-200 bg-emerald-100 text-emerald-900',
    surface: 'bg-emerald-50',
    text: 'text-emerald-900',
  },
  positioning: {
    rail: 'bg-amber-200',
    dot: 'bg-amber-200 ring-amber-100',
    badge: 'border-amber-200 bg-amber-100 text-amber-900',
    surface: 'bg-amber-50',
    text: 'text-amber-900',
  },
  review: {
    rail: 'bg-blue-200',
    dot: 'bg-blue-200 ring-blue-100',
    badge: 'border-blue-200 bg-blue-100 text-blue-900',
    surface: 'bg-blue-50',
    text: 'text-blue-900',
  },
  regulated: {
    rail: 'bg-orange-200',
    dot: 'bg-orange-200 ring-orange-100',
    badge: 'border-orange-200 bg-orange-100 text-orange-900',
    surface: 'bg-orange-50',
    text: 'text-orange-900',
  },
};

export const stepStatusMeta: Record<
  RoadmapStepStatus,
  { label: string; icon: LucideIcon; iconClassName: string }
> = {
  completed: {
    label: 'Completed',
    icon: Star,
    iconClassName: 'text-yellow-200',
  },
  in_progress: {
    label: 'In progress',
    icon: Circle,
    iconClassName: 'text-sky-300',
  },
  pending: {
    label: 'Planned',
    icon: Triangle,
    iconClassName: 'text-violet-400',
  },
};

export const difficultyMeta: Record<
  RoadmapStepDifficulty,
  { label: string; className: string }
> = {
  easy: {
    label: 'Easy',
    className: 'border-green-200 bg-green-50 text-green-800',
  },
  medium: {
    label: 'Medium',
    className: 'border-yellow-200 bg-yellow-50 text-yellow-900',
  },
  hard: {
    label: 'Hard',
    className: 'border-rose-200 bg-rose-50 text-rose-900',
  },
};
