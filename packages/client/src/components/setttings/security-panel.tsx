import { useEffect, useState } from 'react';
import { Lock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { sleep } from '@/lib/settings-utils';
import type {
  SettingsData,
  SettingsSaveHandler,
} from '@contracts/shared/types/settings-types';

import SettingsPanelShell from './settings-panel-shell';
import SettingToggleRow from './settings-toggle-row';
import SignOutButton from '@/components/sign-out-button';

type SecurityPanelProps = {
  data: SettingsData;
  onSave: SettingsSaveHandler;
};

const SecurityPanel = ({ data, onSave }: SecurityPanelProps) => {
  const [loginAlerts, setLoginAlerts] = useState(data.security.loginAlerts);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setLoginAlerts(data.security.loginAlerts);
  }, [data.security.loginAlerts]);

  const handleSave = async () => {
    setIsSaving(true);

    await sleep(700);

    onSave({
      security: {
        ...data.security,
        loginAlerts,
      },
    });

    setIsSaving(false);
  };

  const handleChangePassword = () => {
    // TODO: connect password reset flow
  };

  return (
    <SettingsPanelShell
      icon={Lock}
      title="Security"
      description="Manage your account security and login preferences."
      footer={
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          <SignOutButton />

          <div className="flex gap-3">
            <Button variant="outline" onClick={handleChangePassword}>
              Change password
            </Button>

            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save changes'}
            </Button>
          </div>
        </div>
      }
    >
      <SettingToggleRow
        title="Login alerts"
        description="Receive a notification when a new login is detected."
        checked={loginAlerts}
        onCheckedChange={setLoginAlerts}
      />
      <SettingToggleRow
        title="Two-factor authentication"
        description="Add another layer of protection to your account."
        checked={true}
        onCheckedChange={() => {
          // setForm((prev) => ({ ...prev, twoFactorAuth: checked }))
        }}
      />
    </SettingsPanelShell>
  );
};

export default SecurityPanel;
