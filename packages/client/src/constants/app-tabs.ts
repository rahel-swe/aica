import {
  BrainCircuit,
  Compass,
  LayoutDashboard,
  Route,
  Settings,
} from 'lucide-react';

export const tabItems = [
  {
    label: 'Dashboard',
    to: '/app/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Explore',
    to: '/app/explore',
    icon: Compass,
  },
  {
    label: 'Advisor',
    to: '/app/advisor',
    icon: BrainCircuit,
  },
  {
    label: 'Roadmap',
    to: '/app/roadmap',
    icon: Route,
  },
  {
    label: 'Settings',
    to: '/app/settings',
    icon: Settings,
  },
];
