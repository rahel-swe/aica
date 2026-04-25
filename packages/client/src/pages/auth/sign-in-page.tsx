import { Button } from '@/components/ui/button';
import { FieldGroup, Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PasswordInput from '@/components/Password/password-input';
import { authClient } from '@/lib/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
});

type SignInForm = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const navigate = useNavigate();

  const form = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInForm) => {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => navigate('/dashboard'), // change if needed
        onError: ({ error }) =>
          form.setError('root', { message: error.message }),
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col px-4 py-10 space-y-4 max-w-md w-full mx-auto">
      <div className="space-y-4 text-center px-10">
        <h1 className="text-4xl font-medium capitalize">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Sign in to continue your journey.
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FieldGroup>
          {/* Email */}
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

          {/* Password (Reusable Component) */}
          <Field>
            <Label htmlFor="password">Password</Label>
            <Controller
              control={form.control}
              name="password"
              render={({ field }) => (
                <PasswordInput
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Enter your password"
                />
              )}
            />
            {form.formState.errors.password && (
              <p className="text-sm text-destructive">
                {form.formState.errors.password.message}
              </p>
            )}
          </Field>

          {/* Root Error */}
          {form.formState.errors.root && (
            <p className="text-sm text-destructive">
              {form.formState.errors.root.message}
            </p>
          )}

          <Button type="submit" className="h-13">
            Sign in
          </Button>
        </FieldGroup>
      </form>

      <p className="mt-4 text-sm text-muted-foreground">
        Don’t have an account?{' '}
        <Link className="font-medium text-primary" to="/auth/sign-up">
          Sign up
        </Link>
      </p>
    </div>
  );
}
