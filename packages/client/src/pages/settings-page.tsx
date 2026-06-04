import { ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';

import NavigationBackButton from '@/components/navigation-back-button';
import SettingsDetail from '@/components/setttings/settings-details';
import SignOutButton from '@/components/sign-out-button';
import { Button } from '@/components/ui/button';
import UserAvatar from '@/components/user-avatar';
import { settingsSections } from '@/constants/settings-sections-data';
import { useSettingsSectionParam } from '@/params/use-settings-sections-params';
import type {
  SettingsData,
  SettingsSectionId,
} from '@contracts/shared/types/settings-types';
import { ScrollArea } from '@/components/ui/scroll-area';

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
    notifications: {
      emailUpdates: true,
      roadmapReminders: true,
      recommendationUpdates: false,
      productNews: true,
    },
    security: {
      twoFactorAuth: false,
      loginAlerts: true,
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
    return (match?.id ?? 'profile') as SettingsSectionId;
  }, [section]);

  const isMobileDetailOpen = Boolean(section);

  const handleSectionClick = (sectionId: SettingsSectionId) => {
    setSection(sectionId);
  };

  const handleSave = (next: Partial<SettingsData>) => {
    setData((prev) => ({
      ...prev,
      ...next,
    }));
  };

  return (
    <div className="space-y-6 p-4 md:pt-0 h-full min-h-0">
      {/* Mobile section list */}
      {!isMobileDetailOpen && (
        <div className="flex flex-col items-center gap-2 md:hidden max-w-xs mx-auto">
          <NavigationBackButton
            title="Back"
            className="self-start absolute inset-s-6 top-6"
          />
          <div className="my-5 flex flex-col justify-center items-center gap-2">
            <UserAvatar
              username={data.profile.name}
              className="size-23 "
              fallBackClassName="text-xl"
            />
            <h6 className="truncate text-lg font-semibold">
              Khatibullah Rahel
            </h6>
          </div>
          {settingsSections.map((sectionItem) => {
            const Icon = sectionItem.icon;

            return (
              <Button
                key={sectionItem.id}
                variant={'outline'}
                onClick={() => handleSectionClick(sectionItem.id)}
                className="flex items-center gap-4 text-left  w-full py-7 px-4 dark:bg-secondary/20"
              >
                <Icon className="size-7" />
                <div className="min-w-0 flex-1">
                  <h2 className="font-medium">{sectionItem.title}</h2>
                </div>

                <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
              </Button>
            );
          })}

          <SignOutButton className="gap-4 text-left mt-5 w-full py-7 mb-7 px-4 max-w-40" />
        </div>
      )}

      {/* Mobile detail */}
      {isMobileDetailOpen && (
        <div className="md:hidden">
          <NavigationBackButton
            onClick={() => setSection(null)}
            title="Back"
            className="self-start"
          />

          <SettingsDetail
            sectionId={activeSectionId}
            data={data}
            onSave={handleSave}
          />
        </div>
      )}

      {/* Desktop layout */}
      <div className="hidden gap-6 md:grid md:grid-cols-[260px_1fr] h-full h-min-0 ov">
        <aside className="space-y-2 w-full top-0 flex flex-1">
          <div className="space-y-2 fixed max-w-65 w-full">
            <div className="flex flex-col items-center justify-center gap-2 mb-4">
              <UserAvatar
                username={data.profile.name}
                className="size-20"
                fallBackClassName="text-xl"
              />
              <h6 className="truncate text-md font-semibold">
                Khatibullah Rahel
              </h6>
            </div>

            <ScrollArea className="h-full max-h-[67dvh] flex flex-col">
              {settingsSections.map((sectionItem) => {
                const Icon = sectionItem.icon;
                const isActive = activeSectionId === sectionItem.id;

                return (
                  <Button
                    key={sectionItem.id}
                    variant={isActive ? 'default' : 'ghost'}
                    className="w-[90%] justify-start ps-8 py-6 mb-1"
                    onClick={() => handleSectionClick(sectionItem.id)}
                  >
                    <Icon className="size-4 shrink-0" />
                    <span>{sectionItem.title}</span>
                  </Button>
                );
              })}

              <SignOutButton className="gap-4 text-left mb-10 mt-4 w-[90%] py-6 px-4" />
            </ScrollArea>
          </div>
        </aside>

        <div className="space-y-4">
          <SettingsDetail
            sectionId={activeSectionId}
            data={data}
            onSave={handleSave}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
