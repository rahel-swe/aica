import Email from '@/components/EmailInput';
import FormHeader from '@/components/FormHeader';
import OAuthGoogle from '@/components/OAuthGoogle';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import useToast from '@/hooks/useToast';
import { authClient } from '@/lib/better-auth';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
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
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, isSubmitting },
  } = form;

  const { toastNotification: toast } = useToast();
  const [showPasswords, setShowPasswords] = useState(false);

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    await authClient.signUp
      .email(formData, {
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
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
              <FieldSet disabled={isSubmitting}>
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
                    aria-invalid={formErrors.name && true}
                    required
                  />
                  {formErrors.name && <FieldError errors={[formErrors.name]} />}
                </Field>
                <Email>
                  {
                    <Input
                      {...register('email')}
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      aria-invalid={formErrors.email && 'true'}
                      required
                    />
                  }
                  {formErrors.email && (
                    <FieldError errors={[formErrors.email]} />
                  )}
                </Email>
                <Field>
                  <Field className="grid grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <Input
                        aria-invalid={formErrors.password && 'true'}
                        {...register('password')}
                        id="password"
                        type={showPasswords ? 'text' : 'password'}
                        placeholder="********"
                        required
                      />
                      {formErrors.password && (
                        <FieldError errors={[formErrors.password]} />
                      )}
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="confirm-password">
                        Confirm Password
                      </FieldLabel>
                      <Input
                        {...register('confirmPassword')}
                        id="confirm-password"
                        type={showPasswords ? 'text' : 'password'}
                        aria-invalid={formErrors.confirmPassword && 'true'}
                        placeholder="********"
                        required
                      />
                      {formErrors.confirmPassword && (
                        <FieldError errors={[formErrors.confirmPassword]} />
                      )}
                    </Field>
                  </Field>
                  <div className=" flex items-center gap-2">
                    <Label htmlFor="show-password" className="ml-auto">
                      Show password
                    </Label>
                    <Checkbox
                      className=""
                      id="show-passwords"
                      checked={showPasswords}
                      onCheckedChange={() => setShowPasswords(!showPasswords)}
                    />
                  </div>
                </Field>
                <Field>
                  <Button type="submit">
                    {isSubmitting && <Spinner />} Create Account
                  </Button>
                  <OAuthGoogle />
                  <FieldDescription className="text-center">
                    Already have an account?{' '}
                    <Link to="/auth/login">Sign in</Link>
                  </FieldDescription>
                </Field>
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
export default SignupForm;
