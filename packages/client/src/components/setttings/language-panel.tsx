import { useEffect, useState } from 'react';
import { Globe } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { sleep } from '@/lib/settings-utils';
import type {
  SettingsData,
  SettingsSaveHandler,
} from '@contracts/shared/types/settings-types';
import SettingsPanelShell from './settings-panel-shell';

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
      footer={
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save changes'}
          </Button>
        </div>
      }
    >
      <div className="grid gap-2">
        <label htmlFor="app-language" className="text-sm font-medium">
          App language
        </label>
        <select
          id="app-language"
          value={form.appLanguage}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              appLanguage: e.target.value,
            }))
          }
          className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option>English</option>
          <option>Pashto</option>
          <option>Dari</option>
          <option>Arabic</option>
        </select>
      </div>

      <div className="grid gap-2">
        <label htmlFor="region" className="text-sm font-medium">
          Region
        </label>
        <select
          id="region"
          value={form.region}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              region: e.target.value,
            }))
          }
          className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option>Afghanistan</option>
          <option>United States</option>
          <option>United Kingdom</option>
          <option>Other</option>
        </select>
      </div>
    </SettingsPanelShell>
  );
};

export default LanguagePanel;
