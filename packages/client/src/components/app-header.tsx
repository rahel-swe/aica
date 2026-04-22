import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { authClient } from '@/lib/auth-client';
import { Bell, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import AppHeaderTabs from './app-header-tabs';
import ModeToggle from './toggle-mode';

export default function AppHeader() {
  const { data, isPending } = authClient.useSession();

  if (isPending) return <p>Header loading..</p>;

  return (
    <header className="sticky top-0 p-1 sm:p-2">
      <div className="flex items-center gap-4 h-16 lg:justify-between bg-background/70 backdrop-blur-md rounded-full border-x">
        <p className="text-2xl font-bold tracking-wide text-primary hidden md:block px-4">
          AICA
        </p>

        <AppHeaderTabs />

        <div className="flex items-center justify-between md:gap-x-4 w-full md:w-min px-4">
          <ModeToggle />
          <div className="flex items-center md:ms-auto gap-x-4">
            <Search className="size-6.5" />
            <Bell className="size-6.5" />
          </div>

          <Link
            to="/app/profile"
            className="rounded-full flex items-center gap-x-2 pe-3 bg-input"
          >
            <Avatar className="size-12">
              <AvatarFallback>{data?.user.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <h6 className="text-sm">{data?.user.name}</h6>
              <p className="text-xs">{data?.user.email}</p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
