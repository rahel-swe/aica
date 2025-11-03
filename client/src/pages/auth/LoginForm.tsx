import Email from '@/components/EmailInput';
import FormHeader from '@/components/FormHeader';
import OAuthGoogle from '@/components/OAuthGoogle';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import useToast from '@/hooks/use-toast';
import { authClient } from '@/lib/better-auth';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import z from 'zod';

const formSchema = z.object({
  email: z.string().trim().email('Invalid email address.'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 charecters.')
    .max(20, 'Password must be at most 20 characters.'),
});

export function LoginForm({ className }: { className?: string }) {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { toastNotification: toast } = useToast();

  const [isShowPassword, setIsShowPassword] = useState(false);

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    await authClient.signIn
      .email(formData, {
        redirect: 'follow',
        onSuccess: () => navigate('/app/dashboard'),
        onError: (ctx) => {
          toast('error', ctx.error.message);
        },
      })
      .catch((error) => {
        console.error(error);
        toast('error', error.message);
      });
  };
  return (
    <div
      className={cn(
        'flex flex-col gap-6 max-w-4xl mx-auto max-md:max-w-lg',
        className
      )}
    >
      <Card className="overflow-hidden p-0 ">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
            <FieldSet disabled={isSubmitting && true}>
              <FormHeader
                title="Welcome back"
                description="Login to your Academ AI account"
              />
              <Email>
                {
                  <Input
                    {...register('email')}
                    id="email"
                    type="email"
                    aria-invalid={formErrors.email && 'true'}
                    placeholder="m@example.com"
                    required
                  />
                }
                {formErrors && <FieldError errors={[formErrors.email]} />}
              </Email>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>

                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    aria-invalid={formErrors.password && 'true'}
                    {...register('password')}
                    id="password"
                    type={isShowPassword ? 'text' : 'password'}
                    placeholder="********"
                    required
                  />
                  <Button
                    className="flex justify-end absolute top-0 right-3"
                    variant="ghost"
                    size="icon"
                    type="button"
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  >
                    {isShowPassword ? <Eye /> : <EyeClosed />}
                  </Button>
                </div>
                {formErrors && <FieldError errors={[formErrors.password]} />}
              </Field>
              <Field>
                <Button type="submit">
                  {isSubmitting && <Spinner />}
                  Login
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field>
                <OAuthGoogle />
              </Field>
              <FieldDescription className="text-center">
                Don&apos;t have an account?{' '}
                <Link to="/auth/signup">Sign up</Link>
              </FieldDescription>
            </FieldSet>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginForm;
