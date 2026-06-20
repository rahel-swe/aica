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
    title: m.settings_section_security(),
    icon: Lock,
  },
  {
    id: 'notifications',
    title: m.settings_section_notifications(),
    icon: Bell,
  },
  {
    id: 'language',
    title: m.settings_section_language(),
    icon: Globe,
  },
  {
    id: 'appearance',
    title: m.settings_section_appearance(),
    icon: Monitor,
  },
  {
    id: 'about',
    title: m.settings_section_about(),
    icon: CircleHelp,
  },
];
