import {
  Bell,
  CircleHelp,
  Globe,
  Lock,
  Monitor,
  User,
  UserCircle,
} from 'lucide-react';
import { type SettingsSectionId } from '@contracts/shared/types/settings-types';
import { m } from '../paraglide/messages';

export const settingsSections: Array<{
  id: SettingsSectionId;
  title: string;
  icon: typeof UserCircle;
}> = [
  {
    id: 'profile',
    title: m.settings_section_profile(),
    icon: UserCircle,
  },
  {
    id: 'account',
    title: m.settings_section_account(),
    icon: User,
  },
  {
    id: 'security',
    title: 'Security',
    icon: Lock,
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: Bell,
  },
  {
    id: 'language',
    title: 'Language',
    icon: Globe,
  },
  {
    id: 'appearance',
    title: 'Appearance',
    icon: Monitor,
  },
  {
    id: 'about',
    title: 'About',
    icon: CircleHelp,
  },
];
