import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { authClient } from '@/lib/auth-client';
import { Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

import ModeToggle from './toggle-mode';
import { Button } from './ui/button';
import { useTheme } from '@/providers/theme-provider';
import { appImgSources } from '@/constants/app-image-sources';

export default function AppHeader() {
  const { data, isPending } = authClient.useSession();
  const { theme } = useTheme();
  const currentTheme = theme === 'dark' ? 'dark' : 'light';

  return (
    <div className="sticky top-1 px-1 md:top-2 md:mx-auto md:max-w-lg z-50 w-full">
      <header className=" border-x md:border bg-background/20 backdrop-blur-lg supports-backdrop-filter:bg-background/20  rounded-full w-full">
        <div className="mx-auto flex h-16 items-center justify-between gap-3 px-3 sm:px-5">
          <Link
            to="/app/dashboard"
            className="flex shrink-0 items-center gap-2"
          >
            <div className="flex items-center gap-1">
              <img
                src={appImgSources[currentTheme].logo}
                alt="Logo"
                width={40}
                height={40}
                loading="eager"
                decoding="async"
                className="h-10 w-10 object-contain"
              />

              <img
                src={appImgSources[currentTheme].name}
                alt="App Name"
                width={56}
                height={20}
                loading="eager"
                decoding="async"
                className="h-5 w-14 self-end mb-1 object-contain"
              />
            </div>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Button variant={'outline'} size={'icon-lg'}>
              <Bell className="size-5" />
            </Button>

            <ModeToggle />

            {/* Profile */}
            <Link
              to="/app/profile"
              className="hidden items-center gap-3 rounded-full bg-background/40 p-1.5 transition-all hover:bg-accent md:flex"
            >
              <Avatar className="size-11">
                <AvatarFallback className="bg-primary/10 text-sm font-semibold">
                  {isPending
                    ? '..'
                    : data?.user.name?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              {!isPending && (
                <div className="max-w-40 overflow-hidden">
                  <h6 className="truncate text-sm font-semibold">
                    {data?.user.name}
                  </h6>

                  <p className="truncate text-xs text-muted-foreground">
                    {data?.user.email}
                  </p>
                </div>
              )}
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
