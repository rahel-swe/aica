import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AppSidebar from '@/navigations/app-sidebar';
import AppTabs from '@/navigations/app-tabs';
import AppHeader from '@/navigations/app-header';

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => setCollapsed(!collapsed);

  return (
    <>
      <div className="flex min-h-screen">
        <AppSidebar collapsed={collapsed} toggleCollapsed={toggleCollapsed} />

        <div className="flex flex-1 flex-col">
          {/* Header */}
          <AppHeader />
          <Outlet />
        </div>
      </div>

      <AppTabs />
    </>
  );
}
