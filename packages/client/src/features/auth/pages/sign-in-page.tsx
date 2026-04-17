import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema } from '@contracts/shared/schemas/auth-schema';
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

type SignInForm = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const navigate = useNavigate();
  const form = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: SignInForm) => {
    await authClient.signIn.email(
      { email: data.email, password: data.password },
      {
        onSuccess: () => navigate('/app/dashboard'),
        onError: ({ error }) =>
          form.setError('root', { message: error.message }),
      }
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md rounded-3xl">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Sign in to AICA</CardTitle>
          <CardDescription>
            Continue to your dashboard, recommendations, roadmap, and advisor
            workspace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
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
                placeholder="Enter your password"
              />
              {form.formState.errors.password && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>
            {form.formState.errors.root && (
              <p className="text-sm text-destructive">
                {form.formState.errors.root.message}
              </p>
            )}
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>
          <p className="mt-4 text-sm text-muted-foreground">
            New to AICA?{' '}
            <Link className="font-medium text-primary" to="/auth/sign-up">
              Create an account
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
