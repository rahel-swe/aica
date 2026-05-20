import type { PathwayAssessmentOption } from '@/constants/pathway-assessment-steps';
import { Controller, useFormContext } from 'react-hook-form';
import { Twemoji } from '../twemoji';
import { Field, FieldContent, FieldLabel, FieldTitle } from '../ui/field';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

interface SingleSelectFieldProps {
  name: string;
  label: string;
  options?: PathwayAssessmentOption[];
}

const SingleSelectField: React.FC<SingleSelectFieldProps> = ({
  name,
  options,
}) => {
  const { control } = useFormContext();

  if (!options?.length) return null;

  return (
    <Controller
      key={name}
      name={name}
      control={control}
      shouldUnregister={false}
      render={({ field }) => (
        <RadioGroup
          name={field.name}
          value={field.value ?? ''}
          onValueChange={field.onChange}
          className=""
        >
          {options.map((opt) => (
            <FieldLabel
              key={opt.value}
              className="max-w-md mx-auto rounded-full backdrop-blur-xl relative"
            >
              <Field orientation="horizontal" className="items-center">
                <RadioGroupItem
                  value={opt.value}
                  id={opt.value}
                  className="size-7"
                />
                <FieldContent className="">
                  <FieldTitle className="flex gap-1 text-base">
                    <Twemoji className="text-2xl">{opt.emoji}</Twemoji>
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
