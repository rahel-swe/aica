/* eslint-disable react-hooks/exhaustive-deps */
import PasswordInput from '@/components/form/password-input';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { m } from '../../paraglide/messages';
import { ArrowUpRight, Loader } from 'lucide-react';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
});

type SignInForm = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
    register,
    control,
    watch,
    clearErrors,
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (!watch('email') || !watch('password') || isSubmitting)
      clearErrors('root');
  }, [clearErrors, isSubmitting, watch('email'), watch('password')]);

  const onSubmit = async (data: SignInForm) => {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => navigate('/app/dashboard'),
        onError: ({ error }) => setError('root', { message: error.message }),
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col px-4 py-10 space-y-4 max-w-md w-full mx-auto">
      <div className="space-y-4 text-center px-10">
        <h1 className="text-5xl font-semibold uppercase">
          {' '}
          {m.auth_sign_in_welcome_back()}
        </h1>
        <p className="text-md">{m.auth_sign_in_description()}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FieldGroup>
          {/* Email */}
          <Field>
            <Label htmlFor="email">{m.auth_email_label()}</Label>
            <Input
              id="email"
              {...register('email')}
              disabled={isSubmitting}
              placeholder={m.auth_email_placeholder()}
              className="bg-background py-7 rounded-full"
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </Field>

          {/* Password (Reusable Component) */}
          <Field>
            <Label htmlFor="password"> {m.auth_password_label()}</Label>
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <PasswordInput
                  {...field}
                  placeholder={m.auth_password_placeholder()}
                  disabled={isSubmitting}
                />
              )}
            />
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </Field>

          {/* Root Error */}
          {errors.root && (
            <p className="text-sm text-destructive">{errors.root.message}</p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="py-6.5 w-min mx-auto px-10"
          >
            {m.auth_sign_in_title()}
            {isSubmitting ? (
              <Loader className="animate-spin" />
            ) : (
              <ArrowUpRight className="rtl:rotate-270" />
            )}
          </Button>
        </FieldGroup>
      </form>

      <p className="mt-4 text-sm text-muted-foreground">
        {m.auth_sign_up_have_account()}
        <Link className="font-medium text-primary" to="/auth/sign-up">
          {m.auth_sign_up_title()}
        </Link>
      </p>
    </div>
  );
}
