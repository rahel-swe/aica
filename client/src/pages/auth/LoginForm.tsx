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
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import OAuthGoogle from '@/components/OAuthGoogle';
import Email from '@/components/EmailInput';
import FormHeader from '@/components/FormHeader';
import { Link } from 'react-router-dom';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  email: z.string().trim().email('Invalid email address.'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 charecters.')
    .max(20, 'Password must be at most 20 characters.'),
});

export function LoginForm({ className }: { className?: string }) {
  const {
    register,
    handleSubmit,

    formState: { errors, isLoading },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: any) => {
    console.log('Form Data:', data);
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
            <FieldGroup>
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
                <Button type="submit">Login</Button>
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
            </FieldGroup>
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
