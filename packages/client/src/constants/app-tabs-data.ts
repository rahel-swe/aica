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

import { m } from '../paraglide/messages';

export const navLinks = [
  {
    to: '#features',
    label: m.nav_features(),
  },
  {
    to: '#how-it-works',
    label: m.nav_how_it_works(),
  },
  {
    to: '#for-you',
    label: m.nav_for_you(),
  },
  {
    to: '#about',
    label: m.nav_about(),
  },
];

export const MAIN_TABS = [
  {
    label: m.nav_home(),
    to: '/app/dashboard',
    icon: Home,
  },
  {
    label: m.nav_roadmap(),
    to: '/app/roadmap',
    icon: Route,
  },
  {
    label: m.nav_explore(),
    to: '/app/explore',
    icon: Search,
  },
];

export const DESKTOP_TABS = [
  {
    label: m.nav_home(),
    to: '/app/dashboard',
    icon: Home,
  },
  {
    label: m.nav_advisor(),
    to: '/app/advisor',
    icon: MessageCircleMore,
  },
  {
    label: m.nav_roadmap(),
    to: '/app/roadmap',
    icon: Route,
  },
  { label: m.nav_settings(), to: '/app/settings', icon: Settings },
  // { label: 'Admin', to: '/app/admin', icon: UserCog },
];

export const SECONDARY_TABS = [
  { label: m.nav_about(), to: '/About', icon: CircleHelp },
  { label: m.nav_notifications(), to: '/app/notifications', icon: Bell },
  { label: m.nav_settings(), to: '/app/settings', icon: Settings },
  { label: m.nav_admin(), to: '/app/admin', icon: UserCog },
];
