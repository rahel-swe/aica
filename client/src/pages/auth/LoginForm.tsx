import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import OAuthGoogle from '@/components/OAuthGoogle';
import Email from '@/components/EmailInput';
import FormHeader from '@/components/FormHeader';
import { Link, useNavigate } from 'react-router-dom';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  CircleCheck,
  CloudAlert,
  FileWarning,
  MessageCircleWarning,
} from 'lucide-react';
import { authClient } from '@/lib/better-auth';
import { Form } from '@/components/ui/form';
import { Spinner } from '@/components/ui/spinner';
import useToast from '@/hooks/use-toast';

const formSchema = z.object({
  email: z.string().trim().email('Invalid email address.'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 charecters.')
    .max(20, 'Password must be at most 20 characters.'),
});

export function LoginForm({ className }: { className?: string }) {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const { toastNotification: toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    await authClient.signIn
      .email(formData, {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          navigate('/app/dashboard');
          toast('success', 'You have Login to your account successfully');
          setIsLoading(false);
          reset();
        },
        onError: (ctx) => {
          toast('error', ctx.error.message);
          setIsLoading(false);
        },
      })
      .catch((error) => {
        setIsLoading(false);
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
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
              <FieldSet disabled={isLoading && true}>
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
                      placeholder="m@example.com"
                      required
                    />
                  }
                  {errors && <FieldError errors={[errors.email]} />}
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
                  <Input
                    aria-invalid={errors.password && 'true'}
                    {...register('password')}
                    id="password"
                    type="password"
                    required
                  />
                  {errors && <FieldError errors={[errors.password]} />}
                </Field>
                <Field>
                  <Button type="submit">
                    {isLoading && <Spinner />}
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
          </Form>
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
