import { settingsSections } from '@/constants/settings-sections-data';
import { Button } from '@/components/ui/button';
import type { SettingsSectionId } from '@contracts/shared/types/settings-types';
import { ChevronRight } from 'lucide-react';
import NavigationBackButton from '../navigation-back-button';
import SignOutButton from '../sign-out-button';
import UserAvatar from '../user-avatar';
import { m } from '../../paraglide/messages';

const SettingsMobileSectionsList = ({
  isMobileDetailOpen,
  onSectionClick,
}: {
  isMobileDetailOpen: boolean;
  onSectionClick: (sectionId: SettingsSectionId) => void;
}) => {
  if (isMobileDetailOpen) return null;

  return (
    <div className="flex flex-col items-center gap-2 md:hidden max-w-xs mx-auto">
      <NavigationBackButton
        title={m.common_back()}
        className="self-start absolute inset-s-6 top-6"
      />
      <div className="my-5 flex flex-col justify-center items-center gap-2">
        <UserAvatar
          username={'Rahel'}
          className="size-23 "
          fallBackClassName="text-xl"
        />
        <h6 className="truncate text-lg font-semibold">Khatibullah Rahel</h6>
      </div>
      {settingsSections.map((sectionItem) => {
        const Icon = sectionItem.icon;

        return (
          <Button
            key={sectionItem.id}
            variant={'outline'}
            onClick={() => onSectionClick(sectionItem.id)}
            className="flex items-center gap-4 text-left  w-full py-7 px-4 dark:bg-secondary/20"
          >
            <Icon className="size-7" />
            <div className="min-w-0 flex-1">
              <h2 className="font-medium">{sectionItem.title}</h2>
            </div>

            <ChevronRight className="size-5 shrink-0 text-muted-foreground rtl:rotate-180" />
          </Button>
        );
      })}

      <SignOutButton className="gap-4 text-left mt-5 w-full py-7 mb-7 px-4 max-w-40" />
    </div>
  );
};

export default SettingsMobileSectionsList;
