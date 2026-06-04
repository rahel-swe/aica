import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { sleep } from '@/lib/settings-utils';
import type {
  SettingsData,
  SettingsSaveHandler,
} from '@contracts/shared/types/settings-types';
import SettingsPanelShell from './settings-panel-shell';
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
      footer={
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save changes'}
          </Button>
        </div>
      }
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
    </SettingsPanelShell>
  );
};

export default NotificationsPanel;
