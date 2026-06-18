import { useMemo, useState } from 'react';

import SettingsDesktopSectionsList from '@/components/setttings/settings-desktop-sections-list';
import SettingsDetail from '@/components/setttings/settings-details';
import SettingsMobileSectionDetails from '@/components/setttings/settings-mobile-section-details';
import SettingsMobileSectionsList from '@/components/setttings/settings-mobile-sections-list';
import { settingsSections } from '@/constants/settings-sections-data';
import { useSettingsSectionParam } from '@/params/use-settings-sections-params';
import type {
  SettingsData,
  SettingsSectionId,
} from '@contracts/shared/types/settings-types';

const SettingsPage = () => {
  const [section, setSection] = useSettingsSectionParam();

  const [data, setData] = useState<SettingsData>({
    profile: {
      name: 'Rahel',
      bio: 'Building AICA one step at a time.',
    },
    account: {
      username: 'rahel',
      email: 'rahel@example.com',
    },
    security: {
      twoFactorAuth: false,
      loginAlerts: true,
    },

    notifications: {
      emailUpdates: true,
      roadmapReminders: true,
      recommendationUpdates: false,
      productNews: true,
    },
    privacy: {
      profileVisibility: true,
      personalization: true,
      dataSharing: false,
      analytics: true,
    },
    language: {
      appLanguage: 'English',
      region: 'Afghanistan',
    },
  });

  const activeSectionId = useMemo<SettingsSectionId>(() => {
    const match = settingsSections.find((item) => item.id === section);
    return match?.id ?? 'profile';
  }, [section]);

  const handleSave = (next: Partial<SettingsData>) => {
    setData((prev) => ({
      ...prev,
      ...next,
    }));
  };

  return (
    <div className="space-y-6 p-4 md:py-0 h-full min-h-0">
      <SettingsMobileSectionsList
        isMobileDetailOpen={Boolean(section)}
        onSectionClick={setSection}
      />

      <SettingsMobileSectionDetails
        isMobileDetailOpen={Boolean(section)}
        onBackNavigation={() => setSection(null)}
        activeSectionId={activeSectionId}
        settingsMockData={data}
        settingMockSave={handleSave}
      />

      {/* Desktop layout */}
      <div className="hidden gap-6 md:grid md:grid-cols-[260px_1fr]">
        <SettingsDesktopSectionsList
          activeSectionId={activeSectionId}
          onSectionClick={setSection}
        />

        <SettingsDetail
          sectionId={activeSectionId}
          data={data}
          onSave={handleSave}
        />
      </div>
    </div>
  );
};

export default SettingsPage;
