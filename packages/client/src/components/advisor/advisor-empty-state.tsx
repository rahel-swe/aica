import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import { Bird, CloudSun, Coffee, MoonStar, Sun } from 'lucide-react';

type DayPeriod = 'sunrise' | 'morning' | 'afternoon' | 'sunset' | 'night';

function getDayPeriod(): DayPeriod {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 8) return 'sunrise';
  if (hour >= 8 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 20) return 'sunset';

  return 'night';
}

function getGreeting(name: string) {
  const lastName = name.trim().split(' ')[1] || name;
  const period = getDayPeriod();

  switch (period) {
    case 'sunrise':
      return {
        title: `Rise & Shine, ${lastName}`,
        Icon: Bird,
        color: 'text-sky-400',
      };

    case 'morning':
      return {
        title: `Fuel Up, ${lastName}`,
        Icon: Coffee,
        color: 'text-orange-300',
      };

    case 'afternoon':
      return {
        title: `Good Afternoon, ${lastName}`,
        Icon: CloudSun,
        color: 'text-amber-300',
      };

    case 'sunset':
      return {
        title: `Winding Down, ${lastName}`,
        Icon: Sun,
        color: 'text-rose-400',
      };

    case 'night':
    default:
      return {
        title: `Good Evening, ${lastName}`,
        Icon: MoonStar,
        color: 'text-indigo-400',
      };
  }
}

export function AdvisorEmptyState() {
  const { isPending, data } = authClient.useSession();

  if (isPending || !data) return null;

  const { title, Icon, color } = getGreeting(data.user.name);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <Icon className={cn('size-16 md:size-20', color)} />

      <h2 className="text-4xl sm:text-5xl font-heading">{title}</h2>
    </div>
  );
}
