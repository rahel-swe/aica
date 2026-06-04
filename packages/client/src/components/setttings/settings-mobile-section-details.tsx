import type {
  SettingsData,
  SettingsSaveHandler,
  SettingsSectionId,
} from '@contracts/shared/types/settings-types';
import NavigationBackButton from '../navigation-back-button';
import SettingsDetail from './settings-details';

const SettingsMobileSectionDetails = ({
  isMobileDetailOpen,
  onBackNavigation,
  activeSectionId,
  settingsMockData,
  settingMockSave,
}: {
  isMobileDetailOpen: boolean;
  activeSectionId: SettingsSectionId;
  settingsMockData: SettingsData;
  onBackNavigation: () => void;
  settingMockSave: SettingsSaveHandler;
}) => {
  if (!isMobileDetailOpen) return null;

  return (
    <div className="md:hidden">
      <NavigationBackButton
        onClick={onBackNavigation}
        title="Back"
        className="self-start"
      />

      <SettingsDetail
        sectionId={activeSectionId}
        data={settingsMockData}
        onSave={settingMockSave}
      />
    </div>
  );
};

export default SettingsMobileSectionDetails;
