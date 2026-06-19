/* eslint-disable react-hooks/set-state-in-effect */
import { AlertTriangle, AtSign, Mail, User } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
import { sleep } from '@/lib/settings-utils';
import type {
  SettingsData,
  SettingsSaveHandler,
} from '@contracts/shared/types/settings-types';
import { Card, CardContent } from '../ui/card';
import { Label } from '../ui/label';
import DeleteAccountComfirmDialog from './delete-account-comfirm-dialog';
import SettingsPanelShell from './settings-panel-shell';
import SettingsSaveButton from './settings-save-button';
import { m } from '../../paraglide/messages';

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
      title={m.settings_section_account()}
      description={m.account_panel_description()}
    >
      <div className="space-y-2 w-full">
        <Label htmlFor="account-username"> {m.account_username_label()}</Label>
        <div className="relative">
          <AtSign className="pointer-events-none absolute inset-s-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="account-username"
            value={form.username}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                username: e.target.value,
              }))
            }
            className="ps-10"
            placeholder={m.account_username_placeholder()}
          />
        </div>
      </div>

      <div className="space-y-2 w-full">
        <Label htmlFor="account-email"> {m.account_email_label()}</Label>
        <div className="relative">
          <Mail className="pointer-events-none absolute inset-s-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
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
            className="ps-10"
            placeholder={m.account_email_placeholder()}
          />
        </div>
      </div>

      <SettingsSaveButton
        onSave={handleSave}
        isSaving={isSaving}
        disabled={
          isSaving ||
          (form.username === data.account.username &&
            form.email === data.account.email)
        }
      />

      <Card className="border-destructive/30 bg-destructive/5">
        <CardContent>
          <div className="flex items-start gap-4">
            <AlertTriangle className="mt-0.5 size-5.5 text-destructive" />

            <div className="flex-1">
              <h3 className="font-semibold text-destructive">
                {m.account_danger_zone_title()}
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                {m.account_danger_zone_description()}
              </p>

              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                <li>{m.account_delete_item_1()}</li>
                <li>{m.account_delete_item_2()}</li>
                <li>{m.account_delete_item_3()}</li>
                <li>{m.account_delete_item_4()}</li>
                <li>{m.account_delete_item_5()}</li>
              </ul>

              <p className="mt-4 text-sm font-medium text-destructive">
                {m.account_delete_warning()}
              </p>

              <DeleteAccountComfirmDialog className="mt-5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </SettingsPanelShell>
  );
};

export default AccountPanel;
