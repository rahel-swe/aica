import { useState } from 'react';
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Globe,
  Lock,
  Monitor,
  Shield,
  User,
  UserCircle,
} from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { ShellPage } from '@/pages/page-primitives';

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
  {
    id: 'privacy',
    title: 'Privacy',
    description: 'Control your data, visibility, and personalization settings.',
    icon: Shield,
  },
  {
    id: 'security',
    title: 'Security',
    description: 'Manage password, sessions, and login protection.',
    icon: Lock,
  },
  {
    id: 'billing',
    title: 'Billing',
    description: 'Manage your plan, invoices, and payment methods.',
    icon: CreditCard,
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
          items={[
            'Email address',
            'Username',
            'Account status',
            'Connected accounts',
          ]}
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

    case 'billing':
      return (
        <SettingsPanel
          title="Billing"
          description="Manage your subscription and payments."
          items={['Current plan', 'Payment method', 'Invoices', 'Cancel plan']}
        />
      );

    case 'appearance':
      return (
        <SettingsPanel
          title="Appearance"
          description="Adjust how AICA looks for you."
          items={[
            'Theme',
            'Font preference',
            'Compact mode',
            'Motion settings',
          ]}
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
  const [activeSectionId, setActiveSectionId] = useState('profile');
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);

  const activeSection =
    settingsSections.find((section) => section.id === activeSectionId) ??
    settingsSections[0];

  function handleSectionClick(sectionId: string) {
    setActiveSectionId(sectionId);
    setIsMobileDetailOpen(true);
  }

  return (
    <ShellPage
      eyebrow="Settings"
      title="Account and platform preferences"
      description="Manage your profile, account, notifications, privacy, security, billing, appearance, and language settings."
    >
      {/* Mobile section list */}
      {!isMobileDetailOpen && (
        <div className="grid gap-3 md:hidden">
          {settingsSections.map((section) => {
            const Icon = section.icon;

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => handleSectionClick(section.id)}
                className="flex items-center gap-4 rounded-xl border bg-card p-4 text-left transition-colors hover:bg-accent"
              >
                <div className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="font-medium">{section.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {section.description}
                  </p>
                </div>

                <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
              </button>
            );
          })}
        </div>
      )}

      {/* Mobile detail */}
      {isMobileDetailOpen && (
        <div className="space-y-4 md:hidden">
          <button
            type="button"
            onClick={() => setIsMobileDetailOpen(false)}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="size-4" />
            Back to settings
          </button>

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

        <SettingsDetail sectionId={activeSection.id} />
      </div>
    </ShellPage>
  );
}
