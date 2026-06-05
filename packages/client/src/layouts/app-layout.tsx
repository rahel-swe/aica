import AppDesktopTabs from '@/components/app-desktop-tabs';
import AppHeader from '@/components/app-header';
import MobileMainTabs from '@/components/mobile-main-tabs';
import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div className="flex h-dvh gap-4">
      <AppDesktopTabs />

      <div className="flex min-h-0 flex-1 flex-col gap-4">
        <AppHeader className="shrink-0" />

        <div className="min-h-0 flex-1">
          <Outlet />
        </div>
        <MobileMainTabs />
      </div>
    </div>
  );
}
