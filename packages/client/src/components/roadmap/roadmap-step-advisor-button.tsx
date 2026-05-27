import { AdvisorResponsePanel } from '@/components/advisor/advisor-response-panel';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useAdvisorMutation } from '@/queries/advisor-query';
import type {
  RoadmapPhase,
  RoadmapStep,
} from '@contracts/shared/types/roadmap-types';
import { Sparkles } from 'lucide-react';

type RoadmapStepAdvisorButtonProps = {
  roadmapId: string;
  phase?: RoadmapPhase;
  step: RoadmapStep;
};

const buildStepPrompt = (phase: RoadmapPhase | undefined, step: RoadmapStep) =>
  [
    `Explain this roadmap step in detail: ${step.title}.`,
    phase ? `Phase: ${phase.title}.` : null,
    `Step reason: ${step.why}.`,
    step.evidenceOfCompletion
      ? `Done should look like: ${step.evidenceOfCompletion}.`
      : null,
    'Give me exact actions for this week, what to avoid, and how I know I completed it.',
  ]
    .filter(Boolean)
    .join(' ');

export default function RoadmapStepAdvisorButton({
  roadmapId,
  phase,
  step,
}: RoadmapStepAdvisorButtonProps) {
  const { mutate, isPending, data } = useAdvisorMutation();

  const askAboutStep = (message = buildStepPrompt(phase, step)) => {
    mutate({
      message,
      roadmapStep: {
        roadmapId,
        phaseId: step.phaseId,
        stepId: step.id,
      },
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="w-full justify-center gap-2 rounded-full backdrop-blur"
          onClick={() => askAboutStep()}
        >
          <Sparkles className="size-4" />
          Ask Advisor about this step
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>{step.title}</SheetTitle>
          <SheetDescription>
            Detailed guidance for the selected roadmap step.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6">
          <AdvisorResponsePanel
            response={data?.data}
            isPending={isPending}
            onFollowUp={askAboutStep}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
