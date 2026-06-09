import { useFormContext, Controller } from 'react-hook-form';
import { Field, FieldLabel, FieldTitle, FieldContent } from '../ui/field';
import { Checkbox } from '../ui/checkbox';
import type { PathwayAssessmentOption } from '@/constants/pathway-assessment-steps-data';
import { cn } from '@/lib/utils';
import { roadmapStepFlagColors } from '../roadmap/roadmap-view-utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Info } from 'lucide-react';
import { useState } from 'react';

interface MultiSelectFieldProps {
  name: string;
  label: string;
  options: PathwayAssessmentOption[];
  maxSelect?: number;
}

const MultiSelectField: React.FC<MultiSelectFieldProps> = ({
  name,
  options,
  maxSelect,
}) => {
  const { control } = useFormContext();
  const [openPopover, setOpenPopover] = useState<string | null>(null);

  return (
    <Controller
      name={name}
      control={control}
      shouldUnregister={false}
      render={({ field }) => {
        const values: string[] = field.value || [];

        // Toggle value in array
        const toggleValue = (val: string, description?: string) => {
          const isSelected = values.includes(val);

          if (isSelected) {
            field.onChange(values.filter((v) => v !== val));
          } else {
            if (maxSelect && values.length >= maxSelect) return;

            field.onChange([...values, val]);

            // Auto-open description
            if (description) setOpenPopover(val);
          }
        };

        return (
          <div className="grid gap-4 sm:grid-cols-2">
            {options.map(({ value, label, description, icon: Icon }, idx) => (
              <FieldLabel key={value} className="backdrop-blur-xl">
                <Field orientation="horizontal" className="items-center">
                  <Checkbox
                    id={value}
                    checked={values.includes(value)}
                    onCheckedChange={() => toggleValue(value, description)}
                    className="size-7 rounded-full"
                  />
                  <FieldContent>
                    <FieldTitle className="flex gap-1 text-base">
                      <Icon
                        className={cn(
                          'text-2xl me-1',
                          roadmapStepFlagColors[idx]
                        )}
                      />
                      {label}
                      <Popover
                        open={openPopover === value}
                        onOpenChange={(open) =>
                          setOpenPopover(open ? value : null)
                        }
                      >
                        <PopoverTrigger asChild>
                          <button
                            type="button"
                            className="text-muted-foreground hover:text-foreground ms-4"
                          >
                            <Info className="size-4" />
                          </button>
                        </PopoverTrigger>

                        <PopoverContent
                          side="top"
                          align="start"
                          className="max-w-sm"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Icon
                                className={cn(
                                  'text-lg',
                                  roadmapStepFlagColors[idx]
                                )}
                              />
                              <h4 className="font-medium">{label}</h4>
                            </div>

                            <p className="text-muted-foreground text-sm">
                              {description}
                            </p>
                          </div>
                        </PopoverContent>
                      </Popover>
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
