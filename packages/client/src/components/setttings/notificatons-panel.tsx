import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';

import { sleep } from '@/lib/settings-utils';
import type {
  SettingsData,
  SettingsSaveHandler,
} from '@contracts/shared/types/settings-types';
import SettingsPanelShell from './settings-panel-shell';
import SettingsSaveButton from './settings-save-button';
import SettingToggleRow from './settings-toggle-row';

import { m } from '../../paraglide/messages';

type NotificationsPanelProps = {
  data: SettingsData;
  onSave: SettingsSaveHandler;
};

const NotificationsPanel = ({ data, onSave }: NotificationsPanelProps) => {
  const [form, setForm] = useState(data.notifications);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setForm(data.notifications);
  }, [data.notifications]);

  const handleSave = async () => {
    setIsSaving(true);
    await sleep(700);
    onSave({ notifications: form });
    setIsSaving(false);
  };

  return (
    <SettingsPanelShell
      icon={Bell}
      title={m.settings_section_notifications()}
      description={m.notifications_panel_description()}
    >
      <SettingToggleRow
        title={m.notifications_email_updates_title()}
        description={m.notifications_email_updates_description()}
        checked={form.emailUpdates}
        onCheckedChange={(checked) =>
          setForm((prev) => ({ ...prev, emailUpdates: checked }))
        }
      />

      <SettingToggleRow
        title={m.notifications_roadmap_reminders_title()}
        description={m.notifications_roadmap_reminders_description()}
        checked={form.roadmapReminders}
        onCheckedChange={(checked) =>
          setForm((prev) => ({ ...prev, roadmapReminders: checked }))
        }
      />

      <SettingToggleRow
        title={m.notifications_recommendation_updates_title()}
        description={m.notifications_recommendation_updates_description()}
        checked={form.recommendationUpdates}
        onCheckedChange={(checked) =>
          setForm((prev) => ({ ...prev, recommendationUpdates: checked }))
        }
      />

      <SettingToggleRow
        title={m.notifications_product_news_title()}
        description={m.notifications_product_news_description()}
        checked={form.productNews}
        onCheckedChange={(checked) =>
          setForm((prev) => ({ ...prev, productNews: checked }))
        }
      />
      <SettingsSaveButton
        onSave={handleSave}
        isSaving={isSaving}
        disabled={
          isSaving ||
          JSON.stringify(form) === JSON.stringify(data.notifications)
        }
      />
    </SettingsPanelShell>
  );
};

export default NotificationsPanel;
