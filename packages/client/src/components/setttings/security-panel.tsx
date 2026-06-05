import { Key, Lock } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { sleep } from '@/lib/settings-utils';
import type {
  SettingsData,
  SettingsSaveHandler,
} from '@contracts/shared/types/settings-types';

import SignOutButton from '@/components/sign-out-button';
import { useNavigate } from 'react-router-dom';
import SettingsPanelShell from './settings-panel-shell';
import SettingsSaveButton from './settings-save-button';
import SettingToggleRow from './settings-toggle-row';

type SecurityPanelProps = {
  data: SettingsData;
  onSave: SettingsSaveHandler;
};

const SecurityPanel = ({ data, onSave }: SecurityPanelProps) => {
  const [form, setForm] = useState(data.security);
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setForm(data.security);
  }, [data.security]);

  const handleSave = async () => {
    setIsSaving(true);

    await sleep(700);

    onSave({
      security: {
        ...data.security,
        loginAlerts: form.loginAlerts,
        twoFactorAuth: form.twoFactorAuth,
      },
    });

    setIsSaving(false);
  };

  return (
    <SettingsPanelShell
      icon={Lock}
      title="Security"
      description="Manage your account security and login preferences."
    >
      <SettingToggleRow
        title="Login alerts"
        description="Receive a notification when a new login is detected."
        checked={form.loginAlerts}
        onCheckedChange={(checked) =>
          setForm((prev) => ({ ...prev, loginAlerts: checked }))
        }
      />
      <SettingToggleRow
        title="Two-factor authentication"
        description="Add another layer of protection to your account."
        checked={form.twoFactorAuth}
        onCheckedChange={(checked) => {
          setForm((prev) => ({ ...prev, twoFactorAuth: checked }));
        }}
      />

      <SettingsSaveButton
        onSave={handleSave}
        isSaving={isSaving}
        disabled={
          isSaving || JSON.stringify(form) === JSON.stringify(data.security)
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          variant="outline"
          onClick={() => navigate('/auth/change-password')}
          className="p-6"
        >
          <Key />
          Change password
        </Button>

        <SignOutButton className="p-6" />
      </div>
    </SettingsPanelShell>
  );
};

export default SecurityPanel;
