import z from 'zod';
import { signInSchema, signUpSchema } from '../schemas/auth-schema';

export type SignUpFormType = z.infer<typeof signUpSchema>;

export type SignInFormType = z.infer<typeof signInSchema>;
