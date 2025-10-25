import Email from '@/components/EmailInput';
import FormHeader from '@/components/FormHeader';
import OAuthGoogle from '@/components/OAuthGoogle';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/better-auth';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import z from 'zod';

const formSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, ' Full Name must be at least 2 charecters.')
      .max(27, 'full name must be at most 27 charecters.'),
    email: z.string().trim().email('Invalid email address.'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 charecters.')
      .max(20, 'Password must be at most 20 characters.'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

function SignupForm({ className }: { className?: string }) {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (formData: any) => {
    const { data, error } = await authClient.signUp.email(formData, {
      onRequest: (ctx) => {
        setIsLoading(true);
        console.log('On Request:', ctx);
      },
      onSuccess: (ctx) => {
        navigate('/app/dashboard');
        console.log('On Success:', ctx);
      },
      onError: (ctx) => {
        console.log('On Error:', ctx);
      },
    });

    console.log('sing up data', data, error);
  };

  return (
    <div
      className={cn(
        'flex flex-col gap-6 max-w-4xl mx-auto max-md:max-w-lg',
        className
      )}
    >
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
            <FieldGroup>
              <FormHeader
                title="Create your account"
                description=" Enter your email below to create your account"
              />
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  {...register('name')}
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  aria-invalid={errors.name && 'true'}
                  required
                />
                {errors && <FieldError errors={[errors.name]} />}
              </Field>
              <Email>
                {
                  <Input
                    {...register('email')}
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    aria-invalid={errors.email && 'true'}
                    required
                  />
                }
                {errors && <FieldError errors={[errors.email]} />}
              </Email>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
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
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      {...register('confirmPassword')}
                      id="confirm-password"
                      type="password"
                      aria-invalid={errors.confirmPassword && 'true'}
                      required
                    />
                    {errors && <FieldError errors={[errors.confirmPassword]} />}
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit">Create Account</Button>
                <OAuthGoogle />
                <FieldDescription className="text-center">
                  Already have an account? <Link to="/auth/login">Sign in</Link>
                </FieldDescription>
              </Field>
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
export default SignupForm;
