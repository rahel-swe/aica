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
      title="Notifications"
      description="Choose which updates and reminders you want to receive."
    >
      <SettingToggleRow
        title="Email updates"
        description="Receive account and product emails."
        checked={form.emailUpdates}
        onCheckedChange={(checked) =>
          setForm((prev) => ({ ...prev, emailUpdates: checked }))
        }
      />

      <SettingToggleRow
        title="Roadmap reminders"
        description="Get nudges when a roadmap step is due."
        checked={form.roadmapReminders}
        onCheckedChange={(checked) =>
          setForm((prev) => ({ ...prev, roadmapReminders: checked }))
        }
      />

      <SettingToggleRow
        title="Recommendation updates"
        description="Know when new matches are generated."
        checked={form.recommendationUpdates}
        onCheckedChange={(checked) =>
          setForm((prev) => ({ ...prev, recommendationUpdates: checked }))
        }
      />

      <SettingToggleRow
        title="Product news"
        description="Hear about new features and launches."
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
