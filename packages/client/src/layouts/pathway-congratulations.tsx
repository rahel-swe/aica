import { useRef } from 'react';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';

import confettiAnimation from '@/animations/confetti on transparent background.json';
import { Button } from '@/components/ui/button';
import SpinnerBars from '@/components/shadcn-space/spinner/spinner-06';
import { useRoadmapSetupAssessmentStatusQuery } from '@/queries/roadmap-setup-assessment-queries';
import { Twemoji } from '@/components/twemoji';
import { Link, Navigate } from 'react-router-dom';
import { ChevronRight, PartyPopper } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { usePathwayDetailQuery } from '@/queries/pathway-query';
import ErrorState from '@/components/error-state';
import { m } from '../paraglide/messages';

const PathwayCongratulations = () => {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  const {
    data: assessment,
    isPending: assessmentLoading,
    error: assessmentError,
  } = useRoadmapSetupAssessmentStatusQuery();

  const pickedSlug = assessment?.data?.pickedPathwaySlug;

  const {
    data: pathwayResponse,
    isPending: pathwayLoading,
    error: pathwayError,
    refetch,
  } = usePathwayDetailQuery(pickedSlug!);

  if (assessmentLoading) {
    return (
      <div className="grid place-items-center min-h-dvh">
        <SpinnerBars />
      </div>
    );
  }

  if (assessmentError) {
    return (
      <ErrorState
        title="Failed to load assessment"
        message={assessmentError.message}
      />
    );
  }

  if (!pickedSlug) {
    return <Navigate to="/pathway-recommendation" replace />;
  }

  if (pathwayError) {
    return (
      <ErrorState
        title="Failed to load pathway"
        message={pathwayError.message}
        isRetrying={pathwayLoading}
        onRetry={refetch}
      />
    );
  }

  if (pathwayLoading || !pathwayResponse?.data) {
    return (
      <div className="grid place-items-center min-h-dvh">
        <SpinnerBars />
      </div>
    );
  }

  const pathway = pathwayResponse.data;

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
            {m.pathway_congratulations_badge()}
          </Badge>
        </div>

        <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-200 md:text-5xl uppercase mt-6 font-heading">
          {m.pathway_congratulations_title()}
        </h1>

        <div className="mt-2 space-y-3">
          <p className="max-w-xl text-muted-foreground">
            {m.pathway_congratulations_message()}
          </p>

          <h2 className="text-balance text-4xl font-semibold text-slate-900 dark:text-slate-200 md:text-4xl font-heading">
            {pathway.title}
          </h2>
        </div>

        <div className="mt-7 flex flex-col gap-4 justify-center">
          <Button
            variant="outline"
            className="rounded-full px-10 py-7 text-sm font-medium"
            onClick={() => lottieRef.current?.goToAndPlay(0, true)}
          >
            {m.pathway_congratulations_celebrate_again()}
            <PartyPopper />
          </Button>
          <Link to="/roadmap-setup-assessment">
            <Button className="rounded-full px-10 py-7 text-sm font-medium">
              {m.pathway_congratulations_continue()}
              <ChevronRight className="rtl:rotate-180" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PathwayCongratulations;
