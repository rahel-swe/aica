import { Globe } from 'lucide-react';
import { useEffect, useState } from 'react';

import { sleep } from '@/lib/settings-utils';
import type {
  SettingsData,
  SettingsSaveHandler,
} from '@contracts/shared/types/settings-types';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import SettingsPanelShell from './settings-panel-shell';
import SettingsSaveButton from './settings-save-button';

type LanguagePanelProps = {
  data: SettingsData;
  onSave: SettingsSaveHandler;
};

const LanguagePanel = ({ data, onSave }: LanguagePanelProps) => {
  const [form, setForm] = useState(data.language);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setForm(data.language);
  }, [data.language]);

  const handleSave = async () => {
    setIsSaving(true);
    await sleep(700);
    onSave({ language: form });
    setIsSaving(false);
  };

  return (
    <SettingsPanelShell
      icon={Globe}
      title="Language"
      description="Choose your preferred language and region."
    >
      <div className="grid gap-2">
        <Label htmlFor="app-language" className="text-sm font-medium">
          App language
        </Label>

        <Select
          value={form.appLanguage}
          onValueChange={(value) =>
            setForm((prev) => ({
              ...prev,
              appLanguage: value,
            }))
          }
        >
          <SelectTrigger id="app-language" className="w-full py-5">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="English">English</SelectItem>
            <SelectItem value="Pashto">Pashto</SelectItem>
            <SelectItem value="Dari">Dari</SelectItem>
            <SelectItem value="Arabic">Arabic</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="region" className="text-sm font-medium">
          Region
        </Label>

        <Select
          value={form.region}
          onValueChange={(value) =>
            setForm((prev) => ({
              ...prev,
              region: value,
            }))
          }
        >
          <SelectTrigger id="region" className="w-full py-5">
            <SelectValue placeholder="Select region" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="Afghanistan">Afghanistan</SelectItem>
            <SelectItem value="United States">United States</SelectItem>
            <SelectItem value="United Kingdom">United Kingdom</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <SettingsSaveButton
        onSave={handleSave}
        isSaving={isSaving}
        disabled={
          isSaving || JSON.stringify(form) === JSON.stringify(data.language)
        }
      />
    </SettingsPanelShell>
  );
};

export default LanguagePanel;
