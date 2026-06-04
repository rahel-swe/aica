import { CardContent } from '@/components/ui/card';
import {
  Bell,
  ChevronRight,
  CircleHelp,
  Globe,
  Lock,
  Monitor,
  User,
  UserCircle,
} from 'lucide-react';
import { useState } from 'react';

import SignOutButton from '@/components/sign-out-button';
import NavigationBackButton from '@/components/navigation-back-button';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import UserAvatar from '@/components/user-avatar';
import { cn } from '@/lib/utils';

const settingsSections = [
  {
    id: 'profile',
    title: 'Profile',
    description: 'Manage your name, avatar, and personal information.',
    icon: UserCircle,
  },
  {
    id: 'account',
    title: 'Account',
    description: 'Update account details and connected email address.',
    icon: User,
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Choose which updates and reminders you want to receive.',
    icon: Bell,
  },
  // {
  //   id: 'privacy',
  //   title: 'Privacy',
  //   description: 'Control your data, visibility, and personalization settings.',
  //   icon: Shield,
  // },
  {
    id: 'security',
    title: 'Security',
    description: 'Manage password, sessions, and login protection.',
    icon: Lock,
  },

  {
    id: 'appearance',
    title: 'Appearance',
    description: 'Customize theme, display mode, and interface preferences.',
    icon: Monitor,
  },
  {
    id: 'language',
    title: 'Language',
    description: 'Choose your preferred language and region.',
    icon: Globe,
  },
  {
    id: 'about',
    title: 'About',
    description: 'About us and our services.',
    icon: CircleHelp,
  },
];

function SettingsPanel({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: string[];
}) {
  return (
    <Card className="rounded-xl">
      <CardContent className="space-y-5 p-5">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>

        <Separator />

        <div className="grid gap-3">
          {items.map((item) => (
            <button
              key={item}
              type="button"
              className="flex items-center justify-between rounded-lg border bg-background px-4 py-3 text-left text-sm transition-colors hover:bg-accent"
            >
              <span>{item}</span>
              <ChevronRight className="size-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function SettingsDetail({ sectionId }: { sectionId: string }) {
  switch (sectionId) {
    case 'profile':
      return (
        <SettingsPanel
          title="Profile"
          description="Manage your public profile and personal information."
          items={['Name', 'Profile photo', 'Bio', 'Career interests']}
        />
      );

    case 'account':
      return (
        <SettingsPanel
          title="Account"
          description="Update the basic information connected to your account."
          items={['Email address', 'Username']}
        />
      );

    case 'notifications':
      return (
        <SettingsPanel
          title="Notifications"
          description="Control how AICA sends you updates."
          items={[
            'Email notifications',
            'Roadmap reminders',
            'Recommendation updates',
            'Product news',
          ]}
        />
      );

    case 'privacy':
      return (
        <SettingsPanel
          title="Privacy"
          description="Choose how your data is used inside AICA."
          items={[
            'Profile visibility',
            'Personalization',
            'Data sharing',
            'Download data',
          ]}
        />
      );

    case 'security':
      return (
        <SettingsPanel
          title="Security"
          description="Keep your account protected."
          items={[
            'Change password',
            'Two-step verification',
            'Active sessions',
            'Login history',
          ]}
        />
      );

    case 'appearance':
      return (
        <SettingsPanel
          title="Appearance"
          description="Adjust how AICA looks for you."
          items={['Theme']}
        />
      );

    case 'language':
      return (
        <SettingsPanel
          title="Language"
          description="Set your language and region preferences."
          items={['App language', 'Region', 'Date format', 'Time format']}
        />
      );

    default:
      return null;
  }
}

export default function SettingsPage() {
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState('');

  const activeSection =
    settingsSections.find((section) => section.id === activeSectionId) ??
    settingsSections[0];

  function handleSectionClick(sectionId: string) {
    setActiveSectionId(sectionId);
    setIsMobileDetailOpen(true);
  }
  return (
    <div className="space-y-6 p-4">
      {/* Mobile section list */}
      {!isMobileDetailOpen && (
        <div className="flex flex-col items-center gap-2 md:hidden max-w-xs mx-auto">
          <NavigationBackButton
            title="Back"
            className="self-start absolute inset-s-6 top-6"
          />
          <UserAvatar
            username="Rahel"
            className="size-23 my-5"
            fallBackClassName="text-xl"
          />
          {settingsSections.map((section) => {
            const Icon = section.icon;

            return (
              <Button
                key={section.id}
                variant={'outline'}
                onClick={() => handleSectionClick(section.id)}
                className="flex items-center gap-4 text-left  w-full py-7 px-4 dark:bg-secondary/20"
              >
                <Icon className="size-7" />
                <div className="min-w-0 flex-1">
                  <h2 className="font-medium">{section.title}</h2>
                </div>

                <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
              </Button>
            );
          })}

          <SignOutButton className="gap-4 text-left mt-5 w-full py-7 px-4 max-w-40" />
        </div>
      )}

      {/* Mobile detail */}
      {isMobileDetailOpen && (
        <div className="space-y-4 md:hidden">
          <NavigationBackButton title="Back" />

          <SettingsDetail sectionId={activeSection.id} />
        </div>
      )}

      {/* Desktop layout */}
      <div className="hidden gap-6 md:grid md:grid-cols-[260px_1fr]">
        <aside className="space-y-2">
          {settingsSections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection.id === section.id;

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveSectionId(section.id)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                )}
              >
                <Icon className="size-4 shrink-0" />
                <span>{section.title}</span>
              </button>
            );
          })}
        </aside>
      </div>
    </div>
  );
}
