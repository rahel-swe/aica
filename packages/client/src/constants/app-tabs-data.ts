import {
  Bell,
  CircleHelp,
  Home,
  Route,
  Search,
  Settings,
  UserCog,
  MessageCircleMore,
} from 'lucide-react';

export const navLinks = [
  {
    to: '#features',
    label: 'Features',
  },
  {
    to: '#how-it-works',
    label: 'How It Works',
  },
  {
    to: '#for-you',
    label: 'For You',
  },
  {
    to: '#about',
    label: 'About',
  },
];

export const MAIN_TABS = [
  {
    label: 'Home',
    to: '/app/dashboard',
    icon: Home,
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
    icon: MessageCircleMore,
  },
  {
    label: 'Roadmap',
    to: '/app/roadmap',
    icon: Route,
  },
  { label: 'Settings', to: '/app/settings', icon: Settings },
  // { label: 'Admin', to: '/app/admin', icon: UserCog },
];

export const SECONDARY_TABS = [
  { label: 'About', to: '/About', icon: CircleHelp },
  { label: 'Notifications', to: '/app/notifications', icon: Bell },
  { label: 'Settings', to: '/app/settings', icon: Settings },
  { label: 'Admin', to: '/app/admin', icon: UserCog },
];
