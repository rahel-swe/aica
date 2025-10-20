import React from 'react';

import { NavMain } from '@/components/NavMain';
import { NavSecondary } from '@/components/NavSecondary';
import SidebarLogo from '@/components/SidebarLogo';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import data from '@/data/const-data';
import { DropdownMenuSeparator } from './ui/dropdown-menu';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="border-r-0"
      {...props}
      collapsible="icon"
      variant="inset"
    >
      <SidebarHeader>
        <SidebarLogo />
        <DropdownMenuSeparator />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
