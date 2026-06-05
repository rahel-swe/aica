import { Monitor, Moon, Sun } from 'lucide-react';

import SettingsPanelShell from './settings-panel-shell';
import { useTheme } from '@/providers/theme-provider';
import { Button } from '../ui/button';

const themes = [
  {
    value: 'dark',
    label: 'Dark',
    icon: Moon,
  },
  {
    value: 'light',
    label: 'Light',
    icon: Sun,
  },
  {
    value: 'system',
    label: 'System',
    icon: Monitor,
  },
] as const;

const AppearancePanel = () => {
  const { setTheme, theme } = useTheme();

  return (
    <SettingsPanelShell
      icon={Monitor}
      title="Appearance"
      description="Choose how AICA looks on your device."
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
