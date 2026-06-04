import { useEffect, useState } from 'react';
import { User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { sleep } from '@/lib/settings-utils';
import type {
  SettingsData,
  SettingsSaveHandler,
} from '@contracts/shared/types/settings-types';
import SettingsPanelShell from './settings-panel-shell';

type AccountPanelProps = {
  data: SettingsData;
  onSave: SettingsSaveHandler;
};

const AccountPanel = ({ data, onSave }: AccountPanelProps) => {
  const [form, setForm] = useState(data.account);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setForm(data.account);
  }, [data.account]);

  const handleSave = async () => {
    setIsSaving(true);
    await sleep(700);
    onSave({ account: form });
    setIsSaving(false);
  };

  return (
    <SettingsPanelShell
      icon={User}
      title="Account"
      description="Update your username and connected email address."
      footer={
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save changes'}
          </Button>
        </div>
      }
    >
      <div className="grid gap-2">
        <label htmlFor="account-username" className="text-sm font-medium">
          Username
        </label>
        <Input
          id="account-username"
          value={form.username}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              username: e.target.value,
            }))
          }
          placeholder="Username"
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="account-email" className="text-sm font-medium">
          Email address
        </label>
        <Input
          id="account-email"
          type="email"
          value={form.email}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
          placeholder="name@example.com"
        />
      </div>
      <Button variant="destructive">Delete account</Button>
    </SettingsPanelShell>
  );
};

export default AccountPanel;
