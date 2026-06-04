import { Monitor } from 'lucide-react';

import ModeToggle from '../toggle-mode';
import SettingsPanelShell from './settings-panel-shell';

const AppearancePanel = () => {
  return (
    <SettingsPanelShell
      icon={Monitor}
      title="Appearance"
      description="Customize theme and display preferences."
    >
      <ModeToggle />
    </SettingsPanelShell>
  );
};

export default AppearancePanel;
