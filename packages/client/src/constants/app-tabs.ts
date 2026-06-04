import {
  Bell,
  CircleHelp,
  Home,
  MessageCircle,
  Route,
  Search,
  Settings,
  UserCog,
} from 'lucide-react';

export const MAIN_TABS = [
  {
    label: 'Home',
    to: '/app/dashboard',
    icon: Home,
  },
  {
    label: 'Advisor',
    to: '/app/advisor',
    icon: MessageCircle,
  },
  {
    label: 'Roadmap',
    to: '/app/roadmap',
    icon: Route,
  },
  {
    label: 'Explore',
    to: '/app/explore',
    icon: Search,
  },
];

export const DESKTOP_TABS = [
  {
    label: 'Home',
    to: '/app/dashboard',
    icon: Home,
  },
  {
    label: 'Advisor',
    to: '/app/advisor',
    icon: MessageCircle,
  },
  {
    label: 'Roadmap',
    to: '/app/roadmap',
    icon: Route,
  },
  { label: 'Admin', to: '/app/admin', icon: UserCog },
  { label: 'Help Support', to: '/help-support', icon: CircleHelp },
];

export const SECONDARY_TABS = [
  { label: 'About', to: '/About', icon: CircleHelp },
  { label: 'Notifications', to: '/app/notifications', icon: Bell },
  { label: 'Settings', to: '/app/settings', icon: Settings },
  { label: 'Admin', to: '/app/admin', icon: UserCog },
];
