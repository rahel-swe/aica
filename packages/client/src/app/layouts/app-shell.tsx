import { Outlet } from 'react-router-dom';
import AppHeader from '@/app/navigation/app-header';
import AppSidebar from '@/app/navigation/app-sidebar';
import AppTabs from '@/app/navigation/app-tabs';

export default function AppShell() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen w-full max-w-400 gap-0">
        <AppSidebar />
        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <AppHeader />
          <div className="flex-1 px-4 pb-24 pt-6 sm:px-6 lg:px-8 lg:pb-8">
            <Outlet />
          </div>
        </div>
      </div>
      <AppTabs />
    </div>
  );
}
