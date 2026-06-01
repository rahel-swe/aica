import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { StatusList } from '@/pages/page-primitives';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Settings and platform preferences
        </h1>
        <p className="max-w-3xl text-muted-foreground">
          Settings should stay focused on security, privacy, notifications, and
          language, without cluttering the main product flow.
        </p>
      </div>

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
    </div>
  );
}
