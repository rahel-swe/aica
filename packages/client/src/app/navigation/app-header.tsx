import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Bell, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const titles: Record<string, string> = {
  '/app/dashboard': 'Dashboard',
  '/app/onboarding': 'Onboarding',
  '/app/explore': 'Explore pathways',
  '/app/recommendations': 'Recommendations',
  '/app/advisor': 'AI advisor',
  '/app/roadmap': 'Roadmap',
  '/app/profile': 'Profile',
  '/app/settings': 'Settings',
};

export default function AppHeader() {
  const { pathname } = useLocation();
  const title = titles[pathname] ?? 'AICA';

  return (
    <header className="sticky top-0 z-30 border-b backdrop-blur-md bg-input/65">
      <div className="flex items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="min-w-0 flex-1">
          <p className="text-sm text-muted-foreground">AICA workspace</p>
          <h2 className="truncate text-lg font-semibold">{title}</h2>
        </div>
        <div className="hidden w-full max-w-sm md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Search pathways, goals, or skills"
            />
          </div>
        </div>
        <Bell className="" />
        <Link to="/app/profile" className="rounded-full">
          <Avatar className="size-12">
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
}
