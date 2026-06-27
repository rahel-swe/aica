import PasswordInput from '@/components/form/password-input';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth-client';
import { m } from '@/paraglide/messages';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowUpRight, Loader } from 'lucide-react';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import z from 'zod';

const deleteAccountSchema = z.object({
  password: z.string().min(1, m.auth_delete_password_required()),
});

type DeleteAccountForm = z.infer<typeof deleteAccountSchema>;

const DeleteAccountPage = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
    control,
    clearErrors,
    watch,
  } = useForm<DeleteAccountForm>({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: {
      password: '',
    },
  });

  useEffect(() => {
    if (!watch('password') || isSubmitting) {
      clearErrors('root');
    }
  }, [clearErrors, isSubmitting, watch('password')]);

  const onSubmit = async (data: DeleteAccountForm) => {
    await authClient.deleteUser(
      {
        password: data.password,
      },
      {
        onSuccess: async () => {
          navigate('/auth/delete-account-success', {
            replace: true,
            viewTransition: true,
          });
        },
        onError: ({ error }) => {
          setError('root', {
            message: error.message,
          });
          console.log(error);
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col px-4 py-10 gap-7 max-w-md w-full mx-auto">
      <div className="space-y-4 text-center px-10">
        <h1 className="text-5xl font-semibold uppercase">
          {m.auth_delete_account_title()}
        </h1>

        <p className="text-sm text-muted-foreground">
          {m.auth_delete_account_description()}
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 items-center w-full"
      >
        <FieldGroup>
          <Field>
            <Label htmlFor="password">{m.auth_delete_password_label()}</Label>

            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <PasswordInput
                  {...field}
                  placeholder={m.auth_delete_password_placeholder()}
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

          {errors.root && (
            <p className="text-sm text-destructive">{errors.root.message}</p>
          )}

          <Button
            type="submit"
            variant="destructive"
            disabled={isSubmitting}
            className="py-6.5 mx-auto px-10 max-w-46 w-full"
          >
            {m.auth_delete_account_button()}
            {isSubmitting ? (
              <Loader className="animate-spin" />
            ) : (
              <ArrowUpRight />
            )}
          </Button>
        </FieldGroup>

        <Button
          variant={'outline'}
          disabled={isSubmitting}
          className="py-6 mx-auto px-10 max-w-46 w-full"
          asChild
        >
          <Link to="/profile" viewTransition>
            {m.auth_delete_account_cancel()}
          </Link>
        </Button>
      </form>
    </div>
  );
};

export default DeleteAccountPage;
