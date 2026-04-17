import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '@contracts/shared/schemas/auth-schema';
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
import { authClient } from '@/lib/auth-client';

type SignUpForm = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const navigate = useNavigate();
  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = async (data: SignUpForm) => {
    await authClient.signUp.email(
      { email: data.email, name: data.name, password: data.password },
      {
        onSuccess: () => navigate('/app/onboarding'),
        onError: ({ error }) =>
          form.setError('root', { message: error.message }),
      }
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <Card className="w-full max-w-lg rounded-3xl">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Create your AICA account</CardTitle>
          <CardDescription>
            Set up your workspace to explore aligned faculties, careers, and
            personalized roadmaps.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  {...form.register('name')}
                  placeholder="Your full name"
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  {...form.register('email')}
                  placeholder="you@example.com"
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...form.register('password')}
                  placeholder="Create a password"
                />
                {form.formState.errors.password && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...form.register('confirmPassword')}
                  placeholder="Repeat your password"
                />
                {form.formState.errors.confirmPassword && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
            {form.formState.errors.root && (
              <p className="text-sm text-destructive">
                {form.formState.errors.root.message}
              </p>
            )}
            <Button type="submit" className="w-full">
              Create account
            </Button>
          </form>
          <p className="mt-4 text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link className="font-medium text-primary" to="/auth/sign-in">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
