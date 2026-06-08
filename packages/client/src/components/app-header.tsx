import { authClient } from '@/lib/auth-client';
import { Bell, Search, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useIsTabActive } from '@/hooks/use-active-tab';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import AppLogo from './app-logo';
import { Button } from './ui/button';
import UserAvatar from './user-avatar';
import { useIsAdvisorOpen } from '@/hooks/use-is-advisor-open';

export default function AppHeader({ className }: { className?: string }) {
  const { data, isPending } = authClient.useSession();
  const isAdvisorOpen = useIsAdvisorOpen();

  const isTabActive = useIsTabActive();
  const isMobile = useIsMobile(768);

  if (isPending || (!isTabActive && isMobile)) return null;

  return (
    <div
      className={cn(
        'fixed left-1/2 -translate-x-1/2 top-1 px-1 max-w-sm md:sticky md:translate-x-0 md:left-auto md:top-2 md:max-w-xl z-50 w-full md:mx-auto transition-transform duration-700',
        className,
        isMobile && isAdvisorOpen && '-translate-y-12'
      )}
    >
      <header className="border-x md:border bg-background/20 backdrop-blur-lg supports-backdrop-filter:bg-background/20  rounded-full w-full">
        <div className="mx-auto flex h-16 items-center justify-between gap-3 px-3 sm:px-5">
          <Link
            to="/app/dashboard"
            className="flex shrink-0 items-center gap-2"
          >
            <AppLogo logoClassName="" nameClassName="" />
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {!isMobile && (
              <Link to="/app/explore">
                <Button variant={'outline'} size={'icon-lg'}>
                  <Search className="size-5" />
                </Button>
              </Link>
            )}
            <Button variant={'outline'} size={'icon-lg'}>
              <Bell className="size-5" />
            </Button>

            <Link to="/app/settings">
              <Button variant={'outline'} size={'icon-lg'}>
                <Settings className="size-5" />
              </Button>
            </Link>

            {/* Profile */}
            <Link
              to="/app/settings"
              className="hidden items-center gap-3 rounded-full bg-background/40 p-1.5 transition-all hover:bg-accent md:flex"
            >
              <UserAvatar username={data!.user.name} />

              <div className="max-w-40 overflow-hidden">
                <h6 className="truncate text-sm font-semibold">
                  {data?.user.name}
                </h6>

                <p className="truncate text-xs text-muted-foreground">
                  {data?.user.email}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
