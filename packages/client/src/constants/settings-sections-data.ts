import {
  Bell,
  CircleHelp,
  Globe,
  Lock,
  Monitor,
  User,
  UserCircle,
} from 'lucide-react';

export const settingsSections = [
  {
    id: 'profile',
    title: 'Profile',
    description: 'Manage your name, avatar, and personal information.',
    icon: UserCircle,
  },
  {
    id: 'account',
    title: 'Account',
    description: 'Update account details and connected email address.',
    icon: User,
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Choose which updates and reminders you want to receive.',
    icon: Bell,
  },
  {
    id: 'security',
    title: 'Security',
    description: 'Manage password, sessions, and login protection.',
    icon: Lock,
  },
  {
    id: 'appearance',
    title: 'Appearance',
    description: 'Customize theme and display preferences.',
    icon: Monitor,
  },
  {
    id: 'language',
    title: 'Language',
    description: 'Choose your preferred language and region.',
    icon: Globe,
  },
  {
    id: 'about',
    title: 'About',
    description: 'App info, data deletion, and account actions.',
    icon: CircleHelp,
  },
] as const;

export type SettingsSectionId = (typeof settingsSections)[number]['id'];
