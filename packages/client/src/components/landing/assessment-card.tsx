import { subjectOptions } from '@/constants/pathway-assessment-steps-data';
import { cn } from '@/lib/utils';
import { Database, ArrowRight } from 'lucide-react';
import { RadioGroup } from '@/components/ui/radio-group';
import { roadmapStepFlagColors } from '../roadmap/roadmap-view-utils';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { FieldContent, FieldTitle, FieldLabel, Field } from '../ui/field';
import { RadioGroupItem } from '../ui/radio-group';
import { Progress } from '../ui/progress';

const AssessmentCard = () => {
  return (
    <div className="relative w-full max-w-[370px] rounded-3xl border border-border bg-card/70 backdrop-blur-xl overflow-hidden shadow-2xl dark:shadow-border">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Database className="size-6 text-violet-500" />
            <span className="text-sm mt-auto">Profile Assessment</span>
          </div>
          <Badge variant="secondary" className="rounded-full text-[11px]">
            Step 2 / 5
          </Badge>
        </div>

        <Progress
          value={40}
          className="h-1.5 rounded-full transition-all duration-500"
        />
      </div>

      {/* Body */}
      <div className="px-5 py-4 backdrop-blur-xl">
        <p className="text-base font-semibold text-foreground leading-relaxed mb-3.5">
          Which subject are you best at explaining?
        </p>

        <div className="space-y-2">
          <RadioGroup className="" defaultChecked>
            {subjectOptions
              .slice(0, 4)
              .map(({ label, value, icon: Icon, description }, idx) => (
                <FieldLabel
                  key={value}
                  className="max-w-md mx-auto rounded-full backdrop-blur-xl relative"
                >
                  <Field orientation="horizontal" className="items-center">
                    <RadioGroupItem
                      value={value}
                      id={value}
                      className="size-5"
                    />
                    <FieldContent className="">
                      <FieldTitle className="flex gap-1 text-xs">
                        <Icon
                          className={cn(
                            'size-4',
                            roadmapStepFlagColors[idx + 2]
                          )}
                        />
                        {label}
                      </FieldTitle>
                    </FieldContent>
                  </Field>
                </FieldLabel>
              ))}
          </RadioGroup>
        </div>

        <Button className="mt-4 w-full rounded-full gap-1.5 py-5">
          Next <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
};

export default AssessmentCard;
