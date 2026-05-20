import SpinnerBars from '@/components/shadcn-space/spinner/spinner-06';
import { Button } from '@/components/ui/button';
import { useGenerateRoadmapMutation } from '@/queries/roadmap-query';
import { useRoadmapSetupAssessmentStatusQuery } from '@/queries/roadmap-setup-assessment-queries';
import { ArrowRight, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';
import RoadmapStepsPreview from './roadmap-steps-preview';

export function RoadmapEmptyState() {
  const { mutate, isPending: isGenerating } = useGenerateRoadmapMutation();

  const { data: roadmapStatusData, isPending } =
    useRoadmapSetupAssessmentStatusQuery();

  if (isPending) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <SpinnerBars
          className="gap-1"
          barClassName="w-1"
          heights={['6px', '20px', '6px']}
        />
      </div>
    );
  }

  const roadmapSetupData = roadmapStatusData?.data;

  const hasSetup = !!roadmapSetupData?.completed;

  return (
    <section className="relative flex min-h-[75vh] items-center overflow-hidden px-4">
      <div className="flex items-center justify-evenly flex-col-reverse md:flex-row  w-full gap-20 md:gap-0">
        {/* Left Side */}
        <div className="order-2 lg:order-1">
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight md:text-6xl">
            {hasSetup
              ? 'Generate your next learning roadmap'
              : 'Setup your roadmap journey first'}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
            {hasSetup
              ? 'Your assessment is ready. Generate a structured roadmap with milestones, projects, and progression steps tailored to your current skill level.'
              : 'Complete the roadmap assessment first so we can understand your goals, current level, and build a personalized learning path for you.'}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            {hasSetup ? (
              <Button
                size="lg"
                className="h-12 gap-2 px-6 text-base"
                disabled={isGenerating}
                onClick={() => {
                  mutate({
                    pathwayId: roadmapSetupData.pickedPathwayId,
                  });
                }}
              >
                {isGenerating ? (
                  <>
                    Generating Roadmap
                    <SpinnerBars
                      className="gap-1"
                      barClassName="w-1"
                      heights={['3px', '12px', '3px']}
                    />
                  </>
                ) : (
                  <>
                    Generate Roadmap
                    <ArrowRight className="size-4" />
                  </>
                )}
              </Button>
            ) : (
              <Button asChild size="lg" className="h-12 gap-2 px-6 text-base">
                <Link to="/roadmap-setup-assessment">
                  Start Assessment
                  <ClipboardList className="size-4" />
                </Link>
              </Button>
            )}

            <p className="text-sm text-muted-foreground">
              {hasSetup
                ? 'Takes less than a minute'
                : 'Personalized based on your goals'}
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative order-1 flex items-center justify-center lg:order-2">
          <RoadmapStepsPreview />
        </div>
      </div>
    </section>
  );
}
