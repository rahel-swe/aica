import { useFormContext, Controller } from 'react-hook-form';
import { Field, FieldLabel, FieldTitle, FieldContent } from '../ui/field';
import { Checkbox } from '../ui/checkbox';

interface MultiSelectFieldProps {
  name: string;
  label: string;
  options: { value: string; label: string; emoji: string }[];
  maxSelect?: number;
}

const MultiSelectField: React.FC<MultiSelectFieldProps> = ({
  name,
  options,
  maxSelect,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      shouldUnregister={false}
      render={({ field }) => {
        const values: string[] = field.value || [];

        const toggleValue = (val: string) => {
          if (values.includes(val)) {
            field.onChange(values.filter((v) => v !== val));
          } else {
            if (maxSelect && values.length >= maxSelect) return; // enforce max
            field.onChange([...values, val]);
          }
        };

        return (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {options.map((opt) => (
              <FieldLabel key={opt.value}>
                <Field orientation="horizontal">
                  <Checkbox
                    id={opt.value}
                    checked={values.includes(opt.value)}
                    onCheckedChange={() => toggleValue(opt.value)}
                    className="size-7 rounded-full"
                  />
                  <FieldContent>
                    <FieldTitle className="flex gap-1 text-base">
                      <p className="text-2xl">{opt.emoji}</p>
                      {opt.label}
                    </FieldTitle>
                  </FieldContent>
                </Field>
              </FieldLabel>
            ))}
          </div>
        );
      }}
    />
  );
};
export default MultiSelectField;
