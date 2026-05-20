import { cn } from '@/lib/utils';
import { Check, FlagTriangleRight } from 'lucide-react';
import { roadmapStepTextColors } from './roadmap-view-utils';
import { Button } from '../ui/button';

const roadmapPreviewSteps = ['First', 'Second', 'Third'];

const RoadmapStepsPreview = () => {
  return (
    <div className="relative flex w-full max-w-2xl flex-col gap-8">
      {roadmapPreviewSteps.map((step, index) => {
        const isCompleted = index < 1;
        const isInProgress = index === 1;

        return (
          <div
            key={step}
            className={cn(
              'flex items-center gap-6',
              index % 2 === 0 ? 'lg:translate-x-0' : 'lg:translate-x-16'
            )}
          >
            {/* Step Button */}
            <div className="relative shrink-0">
              <Button
                variant={isCompleted ? 'default' : 'outline'}
                className={cn(
                  'relative h-20 w-24 border-2 border-dashed text-2xl font-semibold'
                )}
              >
                {isCompleted ? (
                  <Check
                    className={cn(
                      'absolute size-10',
                      isInProgress && 'animate-pulse'
                    )}
                  />
                ) : (
                  <FlagTriangleRight
                    fill="currentColor"
                    className={cn(
                      'absolute -top-7 left-1 size-12',
                      roadmapStepTextColors[
                        (index % roadmapStepTextColors.length) + 2
                      ],
                      isInProgress && 'animate-pulse'
                    )}
                  />
                )}

                {!isCompleted && index + 1}
              </Button>
            </div>

            {/* Title Card */}
            <div className="flex-1 rounded-2xl border p-5 backdrop-blur-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold h-5 rounded-full max-w-100 w-full bg-secondary" />

                  <p className="mt-1 text-sm text-muted-foreground">
                    {index === 0
                      ? 'Completed foundation'
                      : index === 1
                        ? 'Currently in progress'
                        : 'Upcoming milestone'}
                  </p>
                </div>

                <div className="hidden rounded-xl border px-3 py-1 text-sm text-muted-foreground sm:block">
                  Step {index + 1}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Decorative Connector */}
      <div className="pointer-events-none absolute left-10 top-16 hidden h-[75%] border-l border-dashed lg:block" />
    </div>
  );
};

export default RoadmapStepsPreview;
