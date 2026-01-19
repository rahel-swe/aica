import { type LucideIcon } from 'lucide-react';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { IconType } from 'react-icons/lib';
import { NavLink } from 'react-router-dom';

export function NavMain({
  items,
  isRouteAcitve,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon | IconType;
  }[];
  isRouteAcitve: (itemUrl: string) => boolean;
}) {
  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            isActive={isRouteAcitve(item.url)}
            tooltip={item.title}
            asChild
          >
            <NavLink to={item.url}>
              <item.icon />
              <span>{item.title}</span>
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
