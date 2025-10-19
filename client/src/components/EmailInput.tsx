import { Input } from '@/components/ui/input';
import { Field, FieldLabel } from './ui/field';

const Email = () => {
  return (
    <Field>
      <FieldLabel htmlFor="email">Email</FieldLabel>
      <Input id="email" type="email" placeholder="m@example.com" required />
    </Field>
  );
};

export default Email;
