import { z } from 'zod';

export const signInSchema = z.object({
  email: z.email('Enter a valid email (e.g. name@email.com)'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const signUpSchema = z
  .object({
    name: z.string().min(2, 'Name is required'),
    email: z.email('Enter a valid email (e.g. name@email.com)'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });
