import { useState } from 'react';
import { motion } from 'motion/react';
import { BrainCircuit, Clock3, Compass, Route } from 'lucide-react';
import { AdvisorHero } from '@/components/advisor/advisor-hero';
import { AdvisorContextCard } from '@/components/advisor/advisor-context-card';
import { AdvisorInputBox } from '@/components/advisor/advisor-input-box';
import { AdvisorIntentTabs } from '@/components/advisor/advisor-intent-tabs';
import { AdvisorPromptGrid } from '@/components/advisor/advisor-prompt-grid';
import { AdvisorResponsePanel } from '@/components/advisor/advisor-response-panel';
import { AdvisorSideSummary } from '@/components/advisor/advisor-side-summary';
import { useAdvisorMutation } from '@/queries/advisor-query';
import { usePathwayDetailQuery } from '@/queries/pathway-query';
import { useRecommendationQuery } from '@/queries/recommendation-query';
import { useRoadmapQuery } from '@/queries/roadmap-query';
import { useRoadmapSetupAssessmentStatusQuery } from '@/queries/roadmap-setup-assessment-queries';
import type { AdvisorIntent } from '@contracts/shared/types/advisor-types';

export default function AdvisorPage() {
  const [intent, setIntent] = useState<AdvisorIntent>('roadmap');
  const [message, setMessage] = useState('');
  const advisorMutation = useAdvisorMutation();
  const recommendationsQuery = useRecommendationQuery();
  const roadmapQuery = useRoadmapQuery();
  const setupQuery = useRoadmapSetupAssessmentStatusQuery();

  const recommendations = recommendationsQuery.data?.data ?? [];
  const roadmap = roadmapQuery.data?.data;
  const setup = setupQuery.data?.data;
  const selectedPathwayId =
    roadmap?.pathwayId ??
    setup?.pickedPathwayId ??
    recommendations[0]?.pathwayId ??
    '';
  const pathwayQuery = usePathwayDetailQuery(selectedPathwayId);
  const pathway = pathwayQuery.data?.data;

  const selectedTitle =
    pathway?.title ??
    roadmap?.title ??
    recommendations[0]?.title ??
    'No pathway selected yet';
  const selectedSummary =
    pathway?.summary ?? roadmap?.summary ?? recommendations[0]?.summary;

  const submitPrompt = (prompt = message, nextIntent = intent) => {
    const cleanPrompt = prompt.trim();

    if (cleanPrompt.length < 3 || advisorMutation.isPending) return;

    setIntent(nextIntent);
    setMessage(cleanPrompt);
    advisorMutation.mutate({
      intent: nextIntent,
      message: cleanPrompt,
    });
  };

  return (
    <main className="min-h-screen rounded-[2rem] bg-gradient-to-br from-sky-100 via-emerald-50 to-amber-100 p-4 text-slate-950 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <AdvisorHero />

        <motion.section
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.07 } },
          }}
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
        >
          {[
            {
              label: 'Selected pathway',
              value: selectedTitle,
              detail: selectedSummary,
              icon: <Compass className="size-4" />,
              className: 'bg-blue-100/75 border-blue-200',
            },
            {
              label: 'Roadmap style',
              value: roadmap?.roadmapStyle ?? setup?.roadmapStyle ?? 'Not set',
              detail:
                roadmap?.timeBudgetPerWeek ??
                'Complete roadmap setup for pacing.',
              icon: <Route className="size-4" />,
              className: 'bg-emerald-100/75 border-emerald-200',
            },
            {
              label: 'Current level',
              value: roadmap?.currentLevel ?? setup?.currentStage ?? 'Not set',
              detail: 'Advisor uses this to keep next steps realistic.',
              icon: <BrainCircuit className="size-4" />,
              className: 'bg-yellow-100/80 border-yellow-200',
            },
            {
              label: 'Next focus',
              value:
                roadmap?.steps.find((step) => step.status !== 'completed')
                  ?.title ?? 'Generate roadmap',
              detail: 'The first useful action matters more than a long chat.',
              icon: <Clock3 className="size-4" />,
              className: 'bg-orange-100/75 border-orange-200',
            },
          ].map((item) => (
            <motion.div
              key={item.label}
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <AdvisorContextCard {...item} />
            </motion.div>
          ))}
        </motion.section>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
          <section className="space-y-5">
            <AdvisorIntentTabs value={intent} onChange={setIntent} />
            <AdvisorPromptGrid
              activeIntent={intent}
              onPromptSelect={(prompt, nextIntent) =>
                submitPrompt(prompt, nextIntent)
              }
            />
            <AdvisorResponsePanel
              response={advisorMutation.data?.data}
              isPending={advisorMutation.isPending}
            />
            <AdvisorInputBox
              value={message}
              intent={intent}
              isPending={advisorMutation.isPending}
              onChange={setMessage}
              onSubmit={() => submitPrompt()}
            />
          </section>

          <AdvisorSideSummary
            selectedTitle={selectedTitle}
            selectedSummary={selectedSummary}
            roadmap={roadmap}
            setup={setup}
            recommendations={recommendations}
          />
        </div>
      </div>
    </main>
  );
}
