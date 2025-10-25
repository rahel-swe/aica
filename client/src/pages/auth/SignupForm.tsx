import Email from '@/components/EmailInput'
import FormHeader from '@/components/FormHeader'
import OAuthGoogle from '@/components/OAuthGoogle'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { authClient } from '@/lib/better-auth'
import { useEffect, useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

const formSchema = z
  .object({
    fullname: z
      .string()
      .trim()
      .min(3, ' Full Name must be at least 3 charecters.')
      .max(27, 'full name must be at most 27 charecters.'),
    email: z.string().trim().email('Invalid email address.'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 charecters.')
      .max(20, 'Password must be at most 20 characters.'),
    confirmPassword: z.string()
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })

function SignupForm ({ className, ...props }: React.ComponentProps<'div'>) {
  const {
    register,
    handleSubmit,

    formState: { errors, isLoading }
  } = useForm({
    resolver: zodResolver(formSchema)
  })

  const [showPasswords, setShowPasswords] = useState(false)

  const onSubmit = async (data: any) => {
    console.log('Form Data:', data)
  }

  return (
    <div
      className={cn(
        'flex flex-col gap-6 max-w-4xl mx-auto max-md:max-w-lg',
        className
      )}
      {...props}
    >
      <Card className='overflow-hidden p-0'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <form onSubmit={handleSubmit(onSubmit)} className='p-6 md:p-8'>
            <FieldGroup>
              <FormHeader
                title='Create your account'
                description=' Enter your email below to create your account'
              />
              <Field>
                <FieldLabel htmlFor='name'>Full Name</FieldLabel>
                <Input
                  {...register('fullname')}
                  id='fullname'
                  type='text'
                  placeholder='John Doe'
                  required
                />
                {errors && <FieldError errors={[errors.fullname]} />}
              </Field>
              <Email>
                {
                  <Input
                    {...register('email')}
                    id='email'
                    type='email'
                    placeholder='m@example.com'
                    required
                  />
                }
                {errors && <FieldError errors={[errors.email]} />}
              </Email>
              <Field>
                <Field className='grid grid-cols-2 gap-4'>
                  <Field>
                    <FieldLabel htmlFor='password'>Password</FieldLabel>
                    <Input
                      aria-invalid={errors.password && 'true'}
                      {...register('password')}
                      id='password'
                      type={showPasswords ? 'text' : 'password'}
                      required
                    />
                    {errors && <FieldError errors={[errors.password]} />}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor='confirm-password'>
                      Confirm Password
                    </FieldLabel>
                    <Input
                      {...register('confirmPassword')}
                      id='confirm-password'
                      type={showPasswords ? 'text' : 'password'}
                      aria-invalid={errors.confirmPassword && 'true'}
                      required
                    />
                    {errors && <FieldError errors={[errors.confirmPassword]} />}
                  </Field>
                </Field>
                <div className=' flex items-center gap-2'>
                  <Label htmlFor='show-password' className='ml-auto'>
                    Show password
                  </Label>
                  <Checkbox
                    className=''
                    id='show-passwords'
                    checked={showPasswords}
                    onCheckedChange={v => setShowPasswords(Boolean(v))}
                  />
                </div>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button type='submit'>Create Account</Button>
                <OAuthGoogle />
                <FieldDescription className='text-center'>
                  Already have an account? <Link to='/auth/login'>Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>

          <div className='bg-muted relative hidden md:block'>
            <img
              src='/placeholder.svg'
              alt='Image'
              className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
export default SignupForm
