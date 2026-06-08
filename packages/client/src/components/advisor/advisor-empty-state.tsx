import { authClient } from '@/lib/auth-client';
import { roadmapStepFlagColors as accentColors } from '../roadmap/roadmap-view-utils';
import { cn } from '@/lib/utils';

// cache colors per title so they don't change on rerender
const titleColorCache = new Map<string, string>();

function getRandomColor() {
  return accentColors[Math.floor(Math.random() * accentColors.length)];
}

function getWelcomeTitle(name: string) {
  const parts = name.trim().split(' ');
  const displayName = parts[1] || parts[0];

  const hour = new Date().getHours();

  const morning = [
    `${displayName} Returns`,
    `${displayName} Rises`,
    'A Fresh Direction',
    'Dreams & Direction',
    'Curiosity & Courage',
    'The Future Calls',
    'Ready for Discovery?',
    'A New Chapter Begins',
    'Morning Momentum',
  ];

  const afternoon = [
    `${displayName} Advances`,
    `${displayName} Continues`,
    'Focus & Momentum',
    'Purpose & Progress',
    'The Next Move',
    'Momentum Returns',
    'Future in Motion',
    'Pathways Await',
    'Forward, Always Forward',
  ];

  const evening = [
    `${displayName} Explores`,
    `${displayName} Discovers`,
    'Still Becoming',
    'The Journey Continues...',
    'Your Story Evolves',
    "What's Next?",
    'Opportunity Awaits',
    'A New Perspective',
    'Progress, Not Perfection',
  ];

  const night = [
    `${displayName} Keeps Building`,
    `${displayName} Dreams Bigger`,
    'Tomorrow Starts Here',
    'One More Step',
    'Vision & Velocity',
    'The Story Continues...',
    'Future in Motion',
    'End Strong',
    'Big Things Take Time',
  ];

  const pool =
    hour < 12 ? morning : hour < 17 ? afternoon : hour < 21 ? evening : night;

  const daySeed = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );

  return pool[daySeed % pool.length];
}

// split last word + color it
function renderColoredTitle(title: string) {
  const words = title.split(' ');
  const lastWord = words.pop()!;
  const base = words.join(' ');

  // stable per-title color
  if (!titleColorCache.has(title)) {
    titleColorCache.set(title, getRandomColor());
  }

  const color = titleColorCache.get(title)!;

  return (
    <>
      {base} <span className={cn('font-semibold', color)}>{lastWord}</span>
    </>
  );
}

export function AdvisorEmptyState() {
  const { isPending, data } = authClient.useSession();

  if (isPending) return null;
  if (!data) return null;

  const title = getWelcomeTitle(data.user.name);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h2 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
        {renderColoredTitle(title)}
      </h2>
    </div>
  );
}
