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
  const steps = phases.flatMap((phase) => phase.steps);
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

export const sampleRoadmap: PathwayRoadmap = {
  _id: 'sample-roadmap',
  pathwayId: 'frontend-engineer',
  version: 1,
  status: 'active',
  title: 'Frontend Engineer Roadmap',
  summary:
    'A practical path from web foundations to a small portfolio that can support junior frontend applications.',
  goal: 'Build enough skill and evidence to apply for supervised junior frontend work.',
  currentLevel: 'self-learning',
  timeBudgetPerWeek: '5-7 hours per week',
  roadmapStyle: 'balanced',
  aiSummary:
    'Start with stable web fundamentals, then build one polished interface connected to real data. Keep the scope focused so progress feels visible without becoming overwhelming.',
  guidanceNote:
    'Use this preview as a sample only. Your generated roadmap will reflect your selected pathway, current stage, timeline, and weekly time budget.',
  phases: [
    {
      id: 'sample-foundation',
      phase: 'foundation',
      title: 'Build the web foundation',
      objective:
        'Create a reliable base in HTML, CSS, JavaScript, and interface thinking.',
      order: 1,
      steps: [
        {
          id: 'sample-step-1',
          title: 'Rebuild three real interface sections',
          why: 'Small reproductions teach layout, spacing, typography, and responsive behavior faster than abstract notes.',
          estimatedTime: '2 weeks',
          difficulty: 'easy',
          prerequisites: ['Basic HTML and CSS'],
          resources: [{ title: 'MDN Web Docs', type: 'article' }],
          evidenceOfCompletion:
            'Three responsive sections with clean spacing and readable code.',
          status: 'completed',
          order: 1,
        },
        {
          id: 'sample-step-2',
          title: 'Create a JavaScript interaction journal',
          why: 'Writing down small interactions builds confidence with events, state, and DOM updates.',
          estimatedTime: '2-3 weeks',
          difficulty: 'medium',
          prerequisites: ['Basic JavaScript syntax'],
          resources: [
            { title: 'JavaScript.info fundamentals', type: 'article' },
          ],
          evidenceOfCompletion:
            'Five small interactions with short notes explaining how each one works.',
          status: 'in_progress',
          order: 2,
        },
      ],
    },
    {
      id: 'sample-practice',
      phase: 'practice',
      title: 'Build a realistic product screen',
      objective:
        'Move from exercises into a focused project that shows real frontend judgment.',
      order: 2,
      steps: [
        {
          id: 'sample-step-3',
          title: 'Build a dashboard from API data',
          why: 'API-connected work shows that you can handle loading, error, empty, and success states.',
          estimatedTime: '4 weeks',
          difficulty: 'medium',
          prerequisites: ['React components', 'Fetch or Axios basics'],
          resources: [{ title: 'TanStack Query docs', type: 'article' }],
          evidenceOfCompletion:
            'A deployed screen with loading, empty, error, and populated states.',
          status: 'pending',
          order: 1,
        },
      ],
    },
    {
      id: 'sample-positioning',
      phase: 'positioning',
      title: 'Prepare for entry opportunities',
      objective:
        'Turn practice into evidence that another person can evaluate quickly.',
      order: 3,
      steps: [
        {
          id: 'sample-step-4',
          title: 'Write one short project case study',
          why: 'A case study helps reviewers understand your decisions, not only the final screenshot.',
          estimatedTime: '1 week',
          difficulty: 'easy',
          prerequisites: ['Completed project'],
          resources: [{ title: 'Portfolio case study outline', type: 'other' }],
          evidenceOfCompletion:
            'A concise write-up covering problem, constraints, decisions, and outcome.',
          status: 'pending',
          order: 1,
        },
      ],
    },
  ],
  userEdits: [],
  lastGeneratedAt: new Date().toISOString(),
  nextReviewAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
