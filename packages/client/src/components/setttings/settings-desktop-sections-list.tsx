import { settingsSections } from '@/constants/settings-sections-data';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import SignOutButton from '../sign-out-button';
import UserAvatar from '../user-avatar';
import type { SettingsSectionId } from '@contracts/shared/types/settings-types';

const SettingsDesktopSectionsList = ({
  activeSectionId,
  onSectionClick,
}: {
  activeSectionId: SettingsSectionId;
  onSectionClick: (sectionId: SettingsSectionId) => void;
}) => {
  return (
    <aside className="space-y-2 w-full top-0 flex flex-1">
      <div className="space-y-2 fixed max-w-65 w-full">
        <div className="flex flex-col items-center justify-center gap-2 mb-4">
          <UserAvatar
            username={'Khatibullah Rahel'}
            className="size-20"
            fallBackClassName="text-xl"
          />
          <h6 className="truncate text-md font-semibold">Khatibullah Rahel</h6>
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
                onClick={() => onSectionClick(sectionItem.id)}
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
  );
};

export default SettingsDesktopSectionsList;
