import React from 'react';

import { NavMain } from '@/components/NavMain';
import { NavSecondary } from '@/components/NavSecondary';
import SidebarHeaderLogo from '@/components/SidebarLogo';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { navData } from '@/data/const-data';
import { useLocation } from 'react-router-dom';
import { Separator } from './ui/separator';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();

  const isRouteActive = (itemUrl: string) =>
    itemUrl === location.pathname.split('/', 3)[2] ? true : false;

  return (
    <Sidebar {...props} collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <SidebarHeaderLogo />
        <Separator />

        <NavMain isRouteAcitve={isRouteActive} items={navData.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavSecondary
          isRouteAcitve={isRouteActive}
          items={navData.navSecondary}
          className="mt-auto"
        />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
