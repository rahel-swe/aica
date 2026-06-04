import type {
  SettingsSectionId,
  SettingsData,
  SettingsSaveHandler,
} from '@contracts/shared/types/settings-types';
import AboutPanel from './about-panel';
import AccountPanel from './account-panel';
import LanguagePanel from './language-panel';
import NotificationsPanel from './notificatons-panel';
import ProfilePanel from './profile-panel';
import SecurityPanel from './security-panel';
import AppearancePanel from './appearance-panel';

type SettingsDetailProps = {
  sectionId: SettingsSectionId;
  data: SettingsData;
  onSave: SettingsSaveHandler;
};

const SettingsDetail = ({ sectionId, data, onSave }: SettingsDetailProps) => {
  switch (sectionId) {
    case 'profile':
      return <ProfilePanel />;

    case 'account':
      return <AccountPanel data={data} onSave={onSave} />;

    case 'notifications':
      return <NotificationsPanel data={data} onSave={onSave} />;

    case 'security':
      return <SecurityPanel data={data} onSave={onSave} />;

    case 'language':
      return <LanguagePanel data={data} onSave={onSave} />;

    case 'appearance':
      return <AppearancePanel />;

    case 'about':
      return <AboutPanel />;

    default:
      return null;
  }
};

export default SettingsDetail;
