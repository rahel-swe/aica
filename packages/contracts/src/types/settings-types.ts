export type SettingsSectionId =
  | 'profile'
  | 'account'
  | 'notifications'
  | 'security'
  | 'language'
  | 'appearance'
  | 'about';

export type SettingsData = {
  profile: {
    name: string;
    bio: string;
  };
  account: {
    username: string;
    email: string;
  };
  notifications: {
    emailUpdates: boolean;
    roadmapReminders: boolean;
    recommendationUpdates: boolean;
    productNews: boolean;
  };
  security: {
    twoFactorAuth: boolean;
    loginAlerts: boolean;
  };
  privacy: {
    profileVisibility: boolean;
    personalization: boolean;
    dataSharing: boolean;
    analytics: boolean;
  };
  language: {
    appLanguage: string;
    region: string;
  };
};

export type SettingsSaveHandler = (next: Partial<SettingsData>) => void;
