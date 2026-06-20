import { Globe } from 'lucide-react';
import { useState } from 'react';

import type { SupportedLocale } from '@contracts/shared/schemas/i18n';
import { setLocale } from '../../paraglide/runtime';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import LocaleSelectItems from './locale-select-items';
import SettingsPanelShell from './settings-panel-shell';
import SettingsSaveButton from './settings-save-button';
import { m } from '../../paraglide/messages';

type AppLangaugeType = {
  locale?: SupportedLocale;
  region?: string;
};

const LanguagePanel = () => {
  const [form, setForm] = useState<AppLangaugeType>();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);

    setLocale(form?.locale as SupportedLocale);
    setIsSaving(false);
  };

  return (
    <SettingsPanelShell
      icon={Globe}
      title={m.settings_section_language()}
      description={m.language_panel_description()}
    >
      <div className="grid gap-2">
        <Label htmlFor="app-language" className="text-sm font-medium">
          {m.app_language()}
        </Label>

        <LocaleSelectItems
          value={form?.locale}
          onSelectChange={(value) => {
            setForm({
              ...form,
              locale: value,
            });
          }}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="region" className="text-sm font-medium">
          {m.region()}
        </Label>

        <Select
          value={form?.region || 'AF'}
          onValueChange={(value) =>
            setForm((prev) => ({
              ...prev,
              region: value,
            }))
          }
        >
          <SelectTrigger id="region" className="w-full py-5">
            <SelectValue placeholder={m.select_region()} />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="AF">{m.country_afghanistan()}</SelectItem>
            <SelectItem value="US">{m.country_united_states()}</SelectItem>
            <SelectItem value="UK">{m.country_united_kingdom()}</SelectItem>
            <SelectItem value="Other">{m.country_other()}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <SettingsSaveButton
        onSave={handleSave}
        isSaving={isSaving}
        disabled={isSaving}
      />
    </SettingsPanelShell>
  );
};

export default LanguagePanel;
