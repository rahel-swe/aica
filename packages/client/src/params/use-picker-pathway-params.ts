import { parseAsString, parseAsStringLiteral, useQueryStates } from 'nuqs';

const PATHWAY_STAGES = ['domain', 'field', 'specialization'] as const;
export type PathwayPickerStage = (typeof PATHWAY_STAGES)[number];

export const usePathwayPickerParams = () => {
  const [params, setParams] = useQueryStates({
    stage: parseAsStringLiteral(PATHWAY_STAGES).withDefault('domain'),
    domainSlug: parseAsString.withDefault(''),
    fieldSlug: parseAsString.withDefault(''),
    specializationSlug: parseAsString.withDefault(''),
  });

  // ── Selection setters ───────────────────────────────

  const selectDomain = (slug: string) => setParams({ domainSlug: slug });
  const selectField = (slug: string) => setParams({ fieldSlug: slug });
  const selectSpecialization = (slug: string) =>
    setParams({ specializationSlug: slug });

  const goToField = () => setParams({ stage: 'field' });
  const goToSpecialization = () => setParams({ stage: 'specialization' });

  const goBack = () => {
    if (params.stage === 'specialization') {
      setParams({ stage: 'field', specializationSlug: '' });
      return;
    }
    if (params.stage === 'field') {
      setParams({ stage: 'domain', fieldSlug: '', domainSlug: '' });
    }
  };

  const isNavigatingBack = params.stage !== 'domain';

  return {
    params,
    isNavigatingBack,
    selectDomain,
    selectField,
    selectSpecialization,
    goToField,
    goToSpecialization,
    goBack,
  };
};
