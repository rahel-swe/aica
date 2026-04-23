import { Button } from '@/components/ui/button';
import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth-client';
import { signInSchema } from '@contracts/shared/schemas/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

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
        onSuccess: () => navigate('/onboarding/welcome'),
        onError: ({ error }) =>
          form.setError('root', { message: error.message }),
      }
    );
  };

  return (
    <div className=" min-h-screen flex items-center justify-center flex-col px-4 py-10 space-y-4 max-w-md w-full mx-auto">
      <div className="space-y-4">
        <h1 className="text-4xl font-medium">Welcome back</h1>
        <p className="text-sm text-balance text-muted-foreground">
          Pick up where you left off — review your matches, explore pathways,
          and continue building your academic and career roadmap.
        </p>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FieldGroup>
          <Field className="">
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
          <Button type="submit" className="h-13">
            Continue to workspace
          </Button>
        </FieldGroup>
      </form>
      <p className="mt-4 text-sm text-muted-foreground">
        New here?{' '}
        <Link className="font-medium text-primary" to="/auth/sign-up">
          Start your guidance journey
        </Link>
      </p>
    </div>
  );
}
