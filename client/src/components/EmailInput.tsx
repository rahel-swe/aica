import { Input } from '@/components/ui/input'
import { Field, FieldLabel } from './ui/field'
import type { UseFormRegisterReturn } from 'react-hook-form'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}
const Email = ({ children }: Props) => {
  return (
    <Field>
      <FieldLabel htmlFor='email'>Email</FieldLabel>
      {children}
    </Field>
  )
}

export default Email
