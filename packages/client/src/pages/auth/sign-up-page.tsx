import PasswordInput from '@/components/form/password-input';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth-client';
import { signUpSchema } from '@contracts/shared/schemas/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowUpRight, Loader } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { m } from '../../paraglide/messages';

type SignUpForm = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
    register,
    control,
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
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
        onSuccess: () => navigate('/pathway-assessment/welcome'),
        onError: ({ error }) => setError('root', { message: error.message }),
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col px-4 py-10 space-y-4 max-w-md w-full mx-auto">
      <div className="space-y-4 text-center px-10 mb-10">
        <h1 className="capitalize text-4xl font-semibold">
          {m.auth_sign_up_heading()}
        </h1>
        {/* <p className="text-sm text-balance text-muted-foreground">
          Tell us about your interests and goals. We’ll match you with the right
          academic pathways and build a clear roadmap forward.
        </p> */}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FieldGroup>
          {/* Name */}
          <Field>
            <Label htmlFor="name"> {m.auth_full_name_label()}</Label>
            <Input
              id="name"
              {...register('name')}
              placeholder={m.auth_full_name_placeholder()}
              disabled={isSubmitting}
              className="bg-background py-7 rounded-full"
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </Field>

          {/* Email */}
          <Field>
            <Label htmlFor="email"> {m.auth_email_label()}</Label>
            <Input
              id="email"
              {...register('email')}
              placeholder={m.auth_email_placeholder()}
              className="bg-background py-7 rounded-full"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </Field>

          {/* Password */}
          <Field>
            <Label htmlFor="password"> {m.auth_password_label()}</Label>
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <PasswordInput
                  {...field}
                  placeholder={m.auth_password_signup_placeholder()}
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

          {/* Confirm Password */}
          <Field>
            <Label htmlFor="confirmPassword">
              {' '}
              {m.auth_confirm_password_label()}
            </Label>
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field }) => (
                <PasswordInput
                  {...field}
                  placeholder={m.auth_confirm_password_placeholder()}
                  disabled={isSubmitting}
                />
              )}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-destructive">
                {errors.confirmPassword.message}
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
            {m.auth_sign_up_title()}
            {isSubmitting ? (
              <Loader className="animate-spin" />
            ) : (
              <ArrowUpRight className="rtl:rotate-270" />
            )}
          </Button>
        </FieldGroup>
      </form>

      <p className="mt-4 text-sm text-muted-foreground">
        {m.auth_sign_in_have_account()}{' '}
        <Link className="font-medium text-primary" to="/auth/sign-in">
          {m.auth_sign_in_title()}
        </Link>
      </p>
    </div>
  );
}
