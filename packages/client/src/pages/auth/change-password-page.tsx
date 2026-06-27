/* eslint-disable react-hooks/exhaustive-deps */
import PasswordInput from '@/components/form/password-input';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowUpRight, Loader } from 'lucide-react';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import z from 'zod';
import { m } from '../../paraglide/messages';

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, m.auth_current_password_required()),

  newPassword: z
    .string()
    .nonempty(m.auth_new_password_required())
    .min(8, m.auth_new_password_min()),
});

type ChangePasswordForm = z.infer<typeof changePasswordSchema>;

const ChangePasswordPage = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
    control,
    clearErrors,
    watch,
  } = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
  });

  useEffect(() => {
    if (!watch('currentPassword') || !watch('newPassword') || isSubmitting)
      clearErrors('root');
  }, [
    clearErrors,
    isSubmitting,
    watch('currentPassword'),
    watch('newPassword'),
  ]);

  const onSubmit = async (data: ChangePasswordForm) => {
    await authClient.changePassword(
      {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        revokeOtherSessions: true,
      },
      {
        onSuccess: async () => {
          await authClient.signOut();
          navigate('/auth/change-password-success', {
            replace: true,
            viewTransition: true,
          });
        },
        onError: ({ error }) => {
          setError('root', { message: error.message });
          console.log(error);
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col px-4 py-10 gap-7 max-w-md w-full mx-auto">
      <div className="space-y-4 text-center px-10">
        <h1 className="text-5xl font-semibold uppercase">
          {' '}
          {m.auth_change_password_title()}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FieldGroup>
          {/* Email */}
          <Field>
            <Label htmlFor="currentPassword">
              {' '}
              {m.auth_current_password_label()}
            </Label>
            <Controller
              control={control}
              name="currentPassword"
              render={({ field }) => (
                <PasswordInput
                  {...field}
                  placeholder={m.auth_current_password_placeholder()}
                  disabled={isSubmitting}
                />
              )}
            />
            {errors.currentPassword && (
              <p className="text-sm text-destructive">
                {errors.currentPassword.message}
              </p>
            )}
          </Field>

          {/* Password (Reusable Component) */}
          <Field>
            <Label htmlFor="newPassword"> {m.auth_new_password_label()}</Label>
            <Controller
              control={control}
              name="newPassword"
              render={({ field }) => (
                <PasswordInput
                  {...field}
                  placeholder={m.auth_new_password_placeholder()}
                  disabled={isSubmitting}
                />
              )}
            />
            {errors.newPassword && (
              <p className="text-sm text-destructive">
                {errors.newPassword.message}
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
            {m.auth_change_button()}
            {isSubmitting ? (
              <Loader className="animate-spin" />
            ) : (
              <ArrowUpRight />
            )}
          </Button>
        </FieldGroup>
      </form>

      <p className="text-sm text-muted-foreground">
        {m.auth_forgot_password_question()}{' '}
        <Link
          className="font-medium text-primary border-b hover:border-primary"
          to="#"
          viewTransition
        >
          {m.auth_reset_password()}
        </Link>
      </p>
    </div>
  );
};

export default ChangePasswordPage;
