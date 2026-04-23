import { Button } from '@/components/ui/button';
import { FieldGroup, Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth-client';
import { signUpSchema } from '@contracts/shared/schemas/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

type SignUpForm = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const navigate = useNavigate();
  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = async (data: SignUpForm) => {
    await authClient.signUp.email(
      {
        email: data.email,
        name: data.name,
        password: data.password,
        isOnboardDone: false,
      },
      {
        onSuccess: () => navigate('/onboarding/welcome'),
        onError: ({ error }) =>
          form.setError('root', { message: error.message }),
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col px-4 py-10 space-y-4 max-w-md w-full mx-auto">
      <div className="space-y-4 text-center px-10">
        <h1 className="text-4xl font-medium capitalize">
          Start your guidance journey
        </h1>
        <p className="text-sm text-balance text-muted-foreground">
          Tell us about your interests and goals. We’ll match you with the right
          academic pathways and build a clear roadmap forward.
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FieldGroup>
          <Field>
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              {...form.register('name')}
              placeholder="How should we address you?"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">
                {form.formState.errors.name.message}
              </p>
            )}
          </Field>

          <Field>
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
          </Field>

          <Field>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...form.register('password')}
              placeholder="At least 8 characters"
            />
            {form.formState.errors.password && (
              <p className="text-sm text-destructive">
                {form.formState.errors.password.message}
              </p>
            )}
          </Field>

          <Field>
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              id="confirmPassword"
              type="password"
              {...form.register('confirmPassword')}
              placeholder="Repeat your password to confirm"
            />
            {form.formState.errors.confirmPassword && (
              <p className="text-sm text-destructive">
                {form.formState.errors.confirmPassword.message}
              </p>
            )}
          </Field>

          {form.formState.errors.root && (
            <p className="text-sm text-destructive">
              {form.formState.errors.root.message}
            </p>
          )}

          <Button type="submit" className="h-13">
            Start my guidance journey
          </Button>
        </FieldGroup>
      </form>

      <p className="mt-4 text-sm text-muted-foreground">
        Already started your journey?{' '}
        <Link className="font-medium text-primary" to="/auth/sign-in">
          Sign in
        </Link>
      </p>
    </div>
  );
}
