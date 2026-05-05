import { useRef } from 'react';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';

import confettiAnimation from '../../public/animations/confetti on transparent background.json';
import { Button } from '@/components/ui/button';
import SpinnerBars from '@/components/shadcn-space/spinner/spinner-06';
import { useRoadmapSetupAssessmentStatusQuery } from '@/queries/roadmap-setup-assessment-queries';
import { useRecommendationQuery } from '@/queries/recommendation-query';
import { Twemoji } from '@/components/twemoji';
import { Link } from 'react-router-dom';
import { ChevronRight, PartyPopper } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const PathwayCongratulations = () => {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  const {
    data: roadmapSetupAssessmentData,
    isPending: roadmapSetupAssessmentPending,
  } = useRoadmapSetupAssessmentStatusQuery();

  const { data: recommendationData, isPending: recommendationPending } =
    useRecommendationQuery();

  if (roadmapSetupAssessmentPending || recommendationPending) {
    return <SpinnerBars />;
  }

  const userPickedRecommendedPathway = recommendationData?.data.find(
    (item) =>
      item.pathwayId === roadmapSetupAssessmentData?.data.pickedPathwayId
  );

  const title = userPickedRecommendedPathway?.title ?? 'Your Pathway';

  return (
    <div className="relative min-h-dvh border px-4 py-10 flex flex-col items-center justify-center">
      <Lottie
        lottieRef={lottieRef}
        animationData={confettiAnimation}
        loop={false}
        className="pointer-events-none absolute inset-0 z-50 mx-auto h-full w-full max-w-5xl"
      />

      <div className="flex flex-col h-full items-center justify-center text-center">
        <div className="flex flex-col gap-4">
          <Twemoji className="text-9xl">🎉</Twemoji>

          <Badge
            variant={'outline'}
            className="font-medium tracking-[0.2em] uppercase"
          >
            Great choice
          </Badge>
        </div>

        <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-200 md:text-5xl uppercase mt-6">
          Congratulations
        </h1>

        <div className="mt-2 space-y-3">
          <h2 className="text-balance text-4xl font-semibold text-slate-900 dark:text-slate-200 md:text-4xl">
            {title}
          </h2>

          {userPickedRecommendedPathway?.summary ? (
            <p className="mx-auto max-w-lg text-sm leading-6 text-slate-600 dark:text-slate-300 md:text-base">
              {userPickedRecommendedPathway.summary}
            </p>
          ) : null}
        </div>

        <div className="mt-7 flex flex-col gap-4 justify-center">
          <Button
            variant="outline"
            className="rounded-full px-10 py-7 text-sm font-medium"
            onClick={() => lottieRef.current?.goToAndPlay(0, true)}
          >
            Celebrate again
            <PartyPopper />
          </Button>
          <Link to="/roadmap-setup-assessment">
            <Button className="rounded-full px-10 py-7 text-sm font-medium">
              Continue App
              <ChevronRight />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PathwayCongratulations;
