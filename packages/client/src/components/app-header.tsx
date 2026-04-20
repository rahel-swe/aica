import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Bell, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import AppHeaderTabs from './app-header-tabs';

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
  return (
    <header className="sticky top-0">
      <div className="flex items-center gap-4 px-4 h-20 sm:px-6 lg:px-8 lg:justify-between">
        <p className="text-2xl font-bold tracking-wide text-primary hidden md:block">
          AICA
        </p>

        {/* <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /> */}
        {/* <Input
            className="pl-9"
            placeholder="Search pathways, goals, or skills"
          /> */}

        <AppHeaderTabs />

        <div className="flex items-center justify-between md:gap-x-4 w-full md:w-min">
          <div className="flex items-center md:ms-auto gap-x-4">
            <Search className="size-6.5" />
            <Bell className="size-6.5" />
          </div>

          <Link
            to="/app/profile"
            className="rounded-full flex items-center gap-x-2 pe-3 bg-input"
          >
            <Avatar className="size-12">
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div>
              <h6 className="text-sm">Khatibullah Rahel</h6>
              <p className="text-xs">hhatibullahrahel@gmail.com</p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
