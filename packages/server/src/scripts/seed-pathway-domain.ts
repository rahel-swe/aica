import mongoose, { type Types } from 'mongoose';

import {
  SUPPORTED_LOCALES,
  type SupportedLocale,
} from '@contracts/shared/schemas/i18n';

import { pathwayMatchProfileRepository } from '../repositories/pathway-match-profile-repository';
import { pathwayRepository } from '../repositories/pathway-repository';
import { taxonomyNodeRepository } from '../repositories/taxonomy-node-repository';

if (!Bun.env.MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined in environment variables.');
}

async function connectDB() {
  return await mongoose.connect(Bun.env.MONGODB_URI!, {
    dbName: Bun.env.DB_NAME,
    maxPoolSize: 10,
  });
}

type TranslationMap<T> = Partial<Record<SupportedLocale, T>>;

type TaxonomySeedItem = {
  name: string;
  slug: string;
  kind: 'domain' | 'field' | 'specialization';
  parentSlug: string | null;
  order: number;
  status: 'draft' | 'active' | 'archived';
  description?: string;
};

type TaxonomyTranslationFields = Pick<TaxonomySeedItem, 'name' | 'description'>;

type PathwayJourneyPhaseSeedItem = {
  name: string;
  duration: string;
  focus: string;
};

type PathwaySeedItem = {
  title: string;
  slug: string;
  type: 'study' | 'career' | 'hybrid';
  taxonomySlugs: string[];
  summary: string;
  description: string;
  keySkills: string[];
  opportunities: string[];
  visibilityLayer: 'primary' | 'adjacent' | 'specialized';
  durationProfile: {
    commitmentLevel: 'short' | 'medium' | 'long';
    routeType:
      | 'skill_route'
      | 'portfolio_route'
      | 'vocational_route'
      | 'certification_route'
      | 'degree_route'
      | 'regulated_degree'
      | 'hybrid_route';
    degreeRequirement: 'not_required' | 'optional' | 'preferred' | 'required';
    estimatedMonthsMin?: number;
    estimatedMonthsMax?: number;
    estimatedYearsMin?: number;
    estimatedYearsMax?: number;
    requiresLicense: boolean;
    localRulesRequired: boolean;
  };
  roadmapWindowLabel: string;
  journeyPhases: PathwayJourneyPhaseSeedItem[];
  verificationNote?: string;
  relatedPathwaySlugs?: string[];
  status: 'draft' | 'active' | 'archived';
};

type PathwayTranslationFields = Pick<
  PathwaySeedItem,
  | 'title'
  | 'summary'
  | 'description'
  | 'keySkills'
  | 'opportunities'
  | 'verificationNote'
  | 'journeyPhases'
  | 'roadmapWindowLabel'
>;

type MatchWeightEntrySeedItem = {
  value: string;
  weight: number;
  band: 'strong' | 'supporting' | 'weak' | 'penalty';
};

type MatchProfileSeedItem = {
  pathwaySlug: string;
  version: number;
  status: 'draft' | 'active' | 'archived';
  strengths: MatchWeightEntrySeedItem[];
  passions: MatchWeightEntrySeedItem[];
  subjects: MatchWeightEntrySeedItem[];
  learningPreference: MatchWeightEntrySeedItem[];
  collaborationStyle: MatchWeightEntrySeedItem[];
  workEnvironment: MatchWeightEntrySeedItem[];
  workStyle: MatchWeightEntrySeedItem[];
  impact: MatchWeightEntrySeedItem[];
  goals: MatchWeightEntrySeedItem[];
  notes: string[];
};

async function readJsonFile<T>(relativePath: string): Promise<T> {
  const file = Bun.file(new URL(relativePath, import.meta.url));
  return (await file.json()) as T;
}

async function readLocalizedJson<T>(
  baseName: string,
  locale: SupportedLocale
): Promise<T[]> {
  return await readJsonFile<T[]>(
    `../data/pathway-domain/${baseName}-${locale}.json`
  );
}

function assertSameLocalizedSlugs<T extends { slug: string }>(
  entityName: string,
  localizedItems: Record<SupportedLocale, T[]>
) {
  const sourceSlugs = localizedItems.en.map((item) => item.slug);

  for (const locale of SUPPORTED_LOCALES) {
    const localeSlugs = localizedItems[locale].map((item) => item.slug);

    if (
      localeSlugs.length !== sourceSlugs.length ||
      localeSlugs.some((slug, index) => slug !== sourceSlugs[index])
    ) {
      throw new Error(
        `${entityName} ${locale} seed file must match en slugs and order. ` +
          `Expected ${sourceSlugs.length} items, got ${localeSlugs.length}.`
      );
    }
  }
}

function buildTranslationMap<T extends { slug: string }, U>(
  localizedItems: Record<SupportedLocale, T[]>,
  pickFields: (item: T) => U
): Map<string, TranslationMap<U>> {
  const translationsBySlug = new Map<string, TranslationMap<U>>();

  for (const locale of SUPPORTED_LOCALES) {
    for (const item of localizedItems[locale]) {
      const translations = translationsBySlug.get(item.slug) ?? {};
      translations[locale] = pickFields(item);
      translationsBySlug.set(item.slug, translations);
    }
  }

  return translationsBySlug;
}

function pickTaxonomyTranslation(
  item: TaxonomySeedItem
): TaxonomyTranslationFields {
  return {
    name: item.name,
    description: item.description,
  };
}

function pickPathwayTranslation(
  item: PathwaySeedItem
): PathwayTranslationFields {
  return {
    title: item.title,
    summary: item.summary,
    description: item.description,
    keySkills: item.keySkills,
    opportunities: item.opportunities,
    verificationNote: item.verificationNote,
    journeyPhases: item.journeyPhases,
    roadmapWindowLabel: item.roadmapWindowLabel,
  };
}

function requireId(
  idsBySlug: Map<string, Types.ObjectId>,
  slug: string,
  entityName: string
): Types.ObjectId {
  const id = idsBySlug.get(slug);

  if (!id) {
    throw new Error(`Missing ${entityName} for slug: ${slug}`);
  }

  return id;
}

async function seedPathwayDomain() {
  await connectDB();

  const [taxonomySeed, pathwaySeed, profileSeed] = await Promise.all([
    Promise.all(
      SUPPORTED_LOCALES.map(async (locale) => [
        locale,
        await readLocalizedJson<TaxonomySeedItem>('taxonomy-nodes', locale),
      ])
    ),
    Promise.all(
      SUPPORTED_LOCALES.map(async (locale) => [
        locale,
        await readLocalizedJson<PathwaySeedItem>('pathways', locale),
      ])
    ),
    readJsonFile<MatchProfileSeedItem[]>(
      '../data/pathway-domain/pathway-match-profiles.json'
    ),
  ]);

  const taxonomyByLocale = Object.fromEntries(taxonomySeed) as Record<
    SupportedLocale,
    TaxonomySeedItem[]
  >;
  const pathwaysByLocale = Object.fromEntries(pathwaySeed) as Record<
    SupportedLocale,
    PathwaySeedItem[]
  >;

  assertSameLocalizedSlugs('taxonomy node', taxonomyByLocale);
  assertSameLocalizedSlugs('pathway', pathwaysByLocale);

  const taxonomyTranslationsBySlug = buildTranslationMap(
    taxonomyByLocale,
    pickTaxonomyTranslation
  );
  const pathwayTranslationsBySlug = buildTranslationMap(
    pathwaysByLocale,
    pickPathwayTranslation
  );

  const taxonomyIdsBySlug = new Map(
    taxonomyByLocale.en.map((node) => [
      node.slug,
      new mongoose.Types.ObjectId(),
    ])
  );
  const pathwayIdsBySlug = new Map(
    pathwaysByLocale.en.map((pathway) => [
      pathway.slug,
      new mongoose.Types.ObjectId(),
    ])
  );
  const matchProfileIdsByPathwaySlug = new Map(
    profileSeed.map((profile) => [
      profile.pathwaySlug,
      new mongoose.Types.ObjectId(),
    ])
  );

  await pathwayMatchProfileRepository.deleteAll();
  await pathwayRepository.deleteAll();
  await taxonomyNodeRepository.deleteAll();

  await taxonomyNodeRepository.createMany(
    taxonomyByLocale.en.map((node) => ({
      _id: requireId(taxonomyIdsBySlug, node.slug, 'taxonomy node'),
      slug: node.slug,
      kind: node.kind,
      parentId: node.parentSlug
        ? requireId(taxonomyIdsBySlug, node.parentSlug, 'parent taxonomy node')
        : null,
      order: node.order,
      status: node.status,
      translations: taxonomyTranslationsBySlug.get(node.slug),
    }))
  );

  await pathwayRepository.createMany(
    pathwaysByLocale.en.map((pathway) => ({
      _id: requireId(pathwayIdsBySlug, pathway.slug, 'pathway'),
      slug: pathway.slug,
      version: 1,
      type: pathway.type,
      status: pathway.status,
      visibilityLayer: pathway.visibilityLayer,
      durationProfile: pathway.durationProfile,
      taxonomyNodeIds: pathway.taxonomySlugs.map((slug) =>
        requireId(taxonomyIdsBySlug, slug, 'taxonomy node')
      ),
      relatedPathwayIds:
        pathway.relatedPathwaySlugs?.map((slug) =>
          requireId(pathwayIdsBySlug, slug, 'related pathway')
        ) ?? [],
      matchProfileId: requireId(
        matchProfileIdsByPathwaySlug,
        pathway.slug,
        'match profile'
      ),
      translations: pathwayTranslationsBySlug.get(pathway.slug),
    }))
  );

  await pathwayMatchProfileRepository.createMany(
    profileSeed.map((profile) => ({
      _id: requireId(
        matchProfileIdsByPathwaySlug,
        profile.pathwaySlug,
        'match profile'
      ),
      pathwayId: requireId(pathwayIdsBySlug, profile.pathwaySlug, 'pathway'),
      version: profile.version,
      status: profile.status,
      strengths: profile.strengths,
      passions: profile.passions,
      subjects: profile.subjects,
      learningPreference: profile.learningPreference,
      collaborationStyle: profile.collaborationStyle,
      workEnvironment: profile.workEnvironment,
      workStyle: profile.workStyle,
      impact: profile.impact,
      goals: profile.goals,
      notes: profile.notes,
    }))
  );

  console.log(
    `Seeded ${taxonomyByLocale.en.length} taxonomy nodes, ` +
      `${pathwaysByLocale.en.length} pathways, and ` +
      `${profileSeed.length} match profiles across ${SUPPORTED_LOCALES.length} locales.`
  );

  await mongoose.disconnect();
}

seedPathwayDomain().catch(async (error) => {
  console.error('Failed to seed pathway domain:', error);
  await mongoose.disconnect();
  process.exit(1);
});
