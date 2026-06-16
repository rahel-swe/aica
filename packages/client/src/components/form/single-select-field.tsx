import type { PathwayAssessmentOption } from '@/constants/pathway-assessment-steps-data';
import { Controller, useFormContext } from 'react-hook-form';
import { Field, FieldContent, FieldLabel, FieldTitle } from '../ui/field';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { cn } from '@/lib/utils';
import { roadmapStepFlagColors } from '../../lib/roadmap-view-utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Info } from 'lucide-react';
import { useState } from 'react';
import { getDirection } from '@/lib/get-direction';

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
  const [openPopover, setOpenPopover] = useState<string | null>(null);

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
          onValueChange={(value) => {
            field.onChange(value);
            if (value) setOpenPopover(value);
          }}
          dir={getDirection().dir}
        >
          {options.map(({ value, label, description, icon: Icon }, idx) => (
            <FieldLabel
              key={value}
              className="max-w-md mx-auto rounded-full backdrop-blur-xl relative"
            >
              <Field orientation="horizontal" className="items-center">
                <RadioGroupItem value={value} id={value} className="size-7" />
                <FieldContent className="">
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
        </RadioGroup>
      )}
    />
  );
};
export default SingleSelectField;
