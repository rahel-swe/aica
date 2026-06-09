/* eslint-disable react-hooks/set-state-in-effect */
import { User, UserCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { Label } from '../ui/label';
import ProfileReadness from './profile-readness';
import SettingsPanelShell from './settings-panel-shell';
import SettingsSaveButton from './settings-save-button';
import { useProfileStatusQuery } from '@/queries/profile-query';

const ProfilePanel = () => {
  const [name, setName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const { data: sessionData, isPending: isSessionPending } =
    authClient.useSession();

  const { isPending: isProfilePending, refetch } = useProfileStatusQuery();

  const user = sessionData?.user;
  const isPending = isSessionPending || isProfilePending;

  // Initialize name from user once
  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user?.name]);

  const handleSave = async () => {
    setIsSaving(true);

    try {
      await authClient.updateUser({ name });
      await refetch(); // refresh profile status after update
    } finally {
      setIsSaving(false);
    }
  };

  if (isPending) return <p>Loading...</p>;

  return (
    <SettingsPanelShell
      icon={UserCircle}
      title="Profile"
      description="Manage your name and assessments."
    >
      <div className="flex flex-col md:flex-row items-center gap-3">
        <div className="space-y-2 w-full">
          <Label htmlFor="profile-name">Name</Label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="profile-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="ps-10"
              placeholder="Your name"
            />
          </div>
        </div>

        <SettingsSaveButton
          onSave={handleSave}
          isSaving={isSaving}
          disabled={isSaving || name === user?.name}
          className="self-end"
        />
      </div>

      <ProfileReadness />
    </SettingsPanelShell>
  );
};

export default ProfilePanel;
