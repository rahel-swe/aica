import { parseAsString, parseAsStringLiteral, useQueryStates } from 'nuqs';

const PATHWAY_STAGES = ['direction', 'family', 'pathway'] as const;

export type PathwayPickerStage = (typeof PATHWAY_STAGES)[number];

export const usePathwayPickerParams = () => {
  const [params, setParams] = useQueryStates({
    stage: parseAsStringLiteral(PATHWAY_STAGES).withDefault('direction'),
    directionSlug: parseAsString.withDefault(''),
    familySlug: parseAsString.withDefault(''),
    pathwaySlug: parseAsString.withDefault(''),
  });

  const selectDirection = (slug: string) => setParams({ directionSlug: slug });

  const selectFamily = (slug: string) => setParams({ familySlug: slug });

  const selectPathway = (slug: string) => setParams({ pathwaySlug: slug });

  const goToFamily = () => setParams({ stage: 'family' });

  const goToPathway = () => setParams({ stage: 'pathway' });

  const goBack = () => {
    if (params.stage === 'pathway') {
      setParams({ stage: 'family', pathwaySlug: '' });
      return;
    }

    if (params.stage === 'family')
      setParams({ stage: 'direction', familySlug: '', directionSlug: '' });
  };

  const isNavigatingBack = params.stage !== 'direction';

  return {
    params,
    isNavigatingBack,
    selectDirection,
    selectFamily,
    selectPathway,
    goToFamily,
    goToPathway,
    goBack,
  };
};
