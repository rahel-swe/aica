import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ShellPage, StatusList } from '@/shared/pages/page-primitives';

export default function ProfilePage() {
  return (
    <ShellPage
      eyebrow="Profile"
      title="Manage personal guidance inputs"
      description="Profile data should stay structured, editable, and directly connected to recommendation quality."
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Profile sections</CardTitle>
            <CardDescription>
              These are the inputs that matter for alignment.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StatusList
              items={[
                'Basic information',
                'Interests and strengths',
                'Goals and preferences',
                'Education and experience',
                'Saved options',
              ]}
            />
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <StatusList
              items={['Edit profile', 'Update goals', 'Retake assessment']}
            />
          </CardContent>
        </Card>
      </div>
    </ShellPage>
  );
}
