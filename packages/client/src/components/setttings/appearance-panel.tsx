import { Monitor, Moon, Sun } from 'lucide-react';

import { m } from '../../paraglide/messages';
import { useTheme } from '@/providers/theme-provider';

import SettingsPanelShell from './settings-panel-shell';
import { Button } from '../ui/button';

const themes = [
  {
    value: 'dark',
    label: m.theme_dark(),
    icon: Moon,
  },
  {
    value: 'light',
    label: m.theme_light(),
    icon: Sun,
  },
  {
    value: 'system',
    label: m.theme_system(),
    icon: Monitor,
  },
] as const;

const AppearancePanel = () => {
  const { setTheme, theme } = useTheme();

  return (
    <SettingsPanelShell
      icon={Monitor}
      title={m.settings_section_appearance()}
      description={m.appearance_panel_description()}
    >
      <div className="flex gap-4 flex-wrap">
        {themes.map((t) => {
          const Icon = t.icon;
          const active = theme === t.value;

          return (
            <Button
              key={t.value}
              onClick={() => setTheme(t.value)}
              variant={active ? 'default' : 'outline'}
              className="py-6 max-w-24 sm:max-w-40 w-full"
            >
              <Icon className="size-5" />
              <span>{t.label}</span>
            </Button>
          );
        })}
      </div>
    </SettingsPanelShell>
  );
};

export default AppearancePanel;
