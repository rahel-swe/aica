import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { authClient } from '@/lib/auth-client';
import { useProfileStatusQuery } from '@/queries/profile-query';
import {
  CheckCircle2,
  CircleDashed,
  Mail,
  Route,
  Save,
  User,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
  const { data: sessionData, isPending: isSessionPending } =
    authClient.useSession();
  const {
    data: profileStatus,
    isPending: isProfilePending,
    refetch,
  } = useProfileStatusQuery();
  const [name, setName] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const user = sessionData?.user ?? profileStatus?.data.user;
  const isPending = isSessionPending || isProfilePending;
  const hasNameChanged = name.trim() !== (user?.name ?? '').trim();

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user?.name]);

  const handleSaveProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextName = name.trim();
    if (!nextName || !hasNameChanged) return;

    setIsSaving(true);
    setMessage(null);

    try {
      await authClient.updateUser({
        name: nextName,
      });
      await refetch();
      setMessage('Profile updated.');
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : 'Profile update failed.'
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Keep your guidance profile accurate
        </h1>
        <p className="max-w-3xl text-muted-foreground">
          Your account details and assessment status control how AICA
          personalizes recommendations, roadmaps, and advisor context.
        </p>
      </div>
      <Separator />
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_380px]">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Basic identity is managed through your secure auth account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isPending ? (
              <ProfileSkeleton />
            ) : (
              <form className="space-y-5" onSubmit={handleSaveProfile}>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="profile-name">Name</Label>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="profile-name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="pl-9"
                        placeholder="Your name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Email</Label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        value={user?.email ?? ''}
                        className="pl-9"
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    type="submit"
                    disabled={!hasNameChanged || !name.trim() || isSaving}
                  >
                    <Save />
                    {isSaving ? 'Saving' : 'Save profile'}
                  </Button>
                  {message && (
                    <p className="text-sm text-muted-foreground">{message}</p>
                  )}
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Readiness</CardTitle>
            <CardDescription>
              These are the profile inputs AICA uses before stronger guidance.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isPending ? (
              <ProfileSkeleton compact />
            ) : (
              <>
                <AssessmentStatusRow
                  title="Pathway profile"
                  description="Strengths, interests, goals, and work preferences."
                  completed={
                    profileStatus?.data.assessments.pathwayCompleted ?? false
                  }
                  to="/pathway-assessment"
                />
                <Separator />
                <AssessmentStatusRow
                  title="Roadmap setup"
                  description="Starting point, weekly time, constraints, and plan style."
                  completed={
                    profileStatus?.data.assessments.roadmapSetupCompleted ??
                    false
                  }
                  to="/roadmap-setup-assessment"
                />
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AssessmentStatusRow({
  title,
  description,
  completed,
  to,
}: {
  title: string;
  description: string;
  completed: boolean;
  to: string;
}) {
  const Icon = completed ? CheckCircle2 : CircleDashed;

  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex gap-3">
        <Icon className="mt-0.5 size-5 text-primary" />
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-medium">{title}</p>
            <Badge variant={completed ? 'secondary' : 'outline'}>
              {completed ? 'Complete' : 'Needs update'}
            </Badge>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>

      <Button asChild variant="outline" size="sm" className="shrink-0">
        <Link to={to}>
          <Route />
          {completed ? 'Edit' : 'Start'}
        </Link>
      </Button>
    </div>
  );
}

function ProfileSkeleton({ compact = false }: { compact?: boolean }) {
  return (
    <div className="space-y-4">
      <Skeleton className="h-12 rounded-full" />
      <Skeleton className="h-12 rounded-full" />
      {!compact && <Skeleton className="h-10 w-36 rounded-full" />}
    </div>
  );
}
