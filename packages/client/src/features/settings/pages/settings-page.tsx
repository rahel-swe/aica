import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ShellPage, StatusList } from '@/shared/pages/page-primitives';

export default function SettingsPage() {
  return (
    <ShellPage
      eyebrow="Settings"
      title="Account and platform preferences"
      description="Settings should stay focused on security, privacy, notifications, and language, without cluttering the main product flow."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>
              Core account settings for the production app.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StatusList
              items={[
                'Password and security',
                'Notification settings',
                'Privacy controls',
                'Language preferences',
              ]}
            />
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Account actions</CardTitle>
          </CardHeader>
          <CardContent>
            <StatusList
              items={[
                'Update account settings',
                'Review privacy options',
                'Delete account if requested',
              ]}
            />
          </CardContent>
        </Card>
      </div>
    </ShellPage>
  );
}
