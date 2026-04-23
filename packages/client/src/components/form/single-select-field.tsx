import { Controller, useFormContext } from 'react-hook-form';
import { Field, FieldContent, FieldLabel, FieldTitle } from '../ui/field';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

interface SingleSelectFieldProps {
  name: string;
  label: string;
  options?: { value: string; label: string; emoji: string }[];
}

const SingleSelectField: React.FC<SingleSelectFieldProps> = ({
  name,
  options,
}) => {
  const { control } = useFormContext();

  if (!options?.length) return null;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <RadioGroup {...field} onValueChange={field.onChange} className="">
          {options.map((opt) => (
            <FieldLabel
              key={opt.value}
              className="max-w-md mx-auto rounded-full"
            >
              <Field orientation="horizontal" className="items-center">
                <RadioGroupItem
                  value={opt.value}
                  id={opt.value}
                  className="size-7"
                />
                <FieldContent className="">
                  <FieldTitle className="flex gap-1 text-base">
                    <p className="text-2xl">{opt.emoji}</p>
                    {opt.label}
                  </FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
          ))}
        </RadioGroup>
      )}
    />
  );
};
export default SingleSelectField;
