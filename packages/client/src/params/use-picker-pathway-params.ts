import { parseAsString, parseAsStringLiteral, useQueryStates } from 'nuqs';

/**
 * Stage names map 1:1 to RecommendationOverview layers:
 *   family    → Layer 1 — user picks a domain        (Technology, Healthcare …)
 *   direction → Layer 2 — user picks a field          (Software Development …)
 *   pathway   → Layer 3 — user picks a specialization (Frontend Development …)
 */
const PATHWAY_STAGES = ['family', 'direction', 'pathway'] as const;
export type PathwayPickerStage = (typeof PATHWAY_STAGES)[number];

export const usePathwayPickerParams = () => {
  const [params, setParams] = useQueryStates({
    stage: parseAsStringLiteral(PATHWAY_STAGES).withDefault('family'),
    familySlug: parseAsString.withDefault(''),
    directionSlug: parseAsString.withDefault(''),
    pathwaySlug: parseAsString.withDefault(''),
  });

  // ── Selection setters ───────────────────────────────

  const selectFamily = (slug: string) => setParams({ familySlug: slug });
  const selectDirection = (slug: string) => setParams({ directionSlug: slug });
  const selectPathway = (slug: string) => setParams({ pathwaySlug: slug });

  // ── Stage transitions ─────────────────────────────────────────────────────

  const goToDirection = () => setParams({ stage: 'direction' });
  const goToPathway = () => setParams({ stage: 'pathway' });

  const goBack = () => {
    if (params.stage === 'pathway') {
      setParams({ stage: 'direction', pathwaySlug: '' });
      return;
    }
    if (params.stage === 'direction') {
      setParams({ stage: 'family', directionSlug: '', familySlug: '' });
    }
  };

  const isNavigatingBack = params.stage !== 'family';

  return {
    params,
    isNavigatingBack,
    selectFamily,
    selectDirection,
    selectPathway,
    goToDirection,
    goToPathway,
    goBack,
  };
};
