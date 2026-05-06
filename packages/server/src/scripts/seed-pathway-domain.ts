import mongoose from 'mongoose';
import { pathwayMatchProfileRepository } from '../repositories/pathway-match-profile-repository';
import { pathwayRepository } from '../repositories/pathway-repository';
import { taxonomyNodeRepository } from '../repositories/taxonomy-node-repository';

if (!Bun.env.MONGODB_URI)
  throw new Error('DATABASE_URL is not defined in environment variables.');

async function connectDB() {
  return await mongoose.connect(Bun.env.MONGODB_URI!, {
    dbName: Bun.env.DB_NAME,
    maxPoolSize: 10,
  });
}

type TaxonomySeedItem = {
  name: string;
  slug: string;
  kind: string;
  parentSlug: string | null;
  order: number;
  status: string;
  description?: string;
};

type PathwaySeedItem = {
  title: string;
  slug: string;
  type: string;
  taxonomySlugs: string[];
  summary: string;
  description: string;
  keySkills: string[];
  opportunities: string[];
  durationProfile: {
    commitmentLevel: string;
    timelineType: string;
    degreeRequirement: string;
    estimatedMonthsMin?: number;
    estimatedMonthsMax?: number;
    estimatedYearsMin?: number;
    estimatedYearsMax?: number;
    requiresLicense: boolean;
    localRulesRequired: boolean;
    roadmapWindowLabel: string;
  };
  journeyPhases: Array<{
    name: string;
    duration: string;
    focus: string;
  }>;
  verificationNote?: string;
  relatedPathwaySlugs?: string[];
  status: string;
};

type MatchProfileSeedItem = {
  pathwaySlug: string;
  version: number;
  strengths: Array<{ value: string; weight: number; band: string }>;
  subjects: Array<{ value: string; weight: number; band: string }>;
  passions: Array<{ value: string; weight: number; band: string }>;
  freeTime: Array<{ value: string; weight: number; band: string }>;
  workEnvironment: Array<{ value: string; weight: number; band: string }>;
  workStyle: Array<{ value: string; weight: number; band: string }>;
  impact: Array<{ value: string; weight: number; band: string }>;
  goals: Array<{ value: string; weight: number; band: string }>;
  notes: string[];
  status: string;
};

async function readJsonFile<T>(relativePath: string): Promise<T> {
  const file = Bun.file(new URL(relativePath, import.meta.url));
  return (await file.json()) as T;
}

async function seedPathwayDomain() {
  await connectDB();

  const [taxonomySeed, pathwaySeed, profileSeed] = await Promise.all([
    readJsonFile<TaxonomySeedItem[]>(
      '../data/pathway-domain/taxonomy-nodes.json'
    ),
    readJsonFile<PathwaySeedItem[]>('../data/pathway-domain/pathways.json'),
    readJsonFile<MatchProfileSeedItem[]>(
      '../data/pathway-domain/pathway-match-profiles.json'
    ),
  ]);

  await pathwayMatchProfileRepository.deleteAll();
  await pathwayRepository.deleteAll();
  await taxonomyNodeRepository.deleteAll();

  const taxonomyBySlug = new Map<string, any>();

  for (const node of taxonomySeed) {
    const createdNode = await taxonomyNodeRepository.create({
      name: node.name,
      slug: node.slug,
      kind: node.kind,
      parentId: node.parentSlug
        ? taxonomyBySlug.get(node.parentSlug)?._id
        : null,
      order: node.order,
      status: node.status,
      description: node.description,
    });

    taxonomyBySlug.set(node.slug, createdNode);
  }

  const pathways = await pathwayRepository.createMany(
    pathwaySeed.map((pathway) => ({
      title: pathway.title,
      slug: pathway.slug,
      type: pathway.type,
      taxonomyNodeIds: pathway.taxonomySlugs.map((slug) => {
        const taxonomyNode = taxonomyBySlug.get(slug);

        if (!taxonomyNode) {
          throw new Error(`Missing taxonomy node for slug: ${slug}`);
        }

        return taxonomyNode._id;
      }),
      summary: pathway.summary,
      description: pathway.description,
      keySkills: pathway.keySkills,
      opportunities: pathway.opportunities,
      durationProfile: pathway.durationProfile,
      journeyPhases: pathway.journeyPhases,
      verificationNote: pathway.verificationNote,
      status: pathway.status,
    }))
  );

  const pathwayBySlug = new Map(pathways.map((item) => [item.slug, item]));

  for (const pathwaySeedItem of pathwaySeed) {
    if (!pathwaySeedItem.relatedPathwaySlugs?.length) {
      continue;
    }

    const currentPathway = pathwayBySlug.get(pathwaySeedItem.slug);

    if (!currentPathway) {
      throw new Error(
        `Missing seeded pathway for slug: ${pathwaySeedItem.slug}`
      );
    }

    currentPathway.relatedPathwayIds = pathwaySeedItem.relatedPathwaySlugs.map(
      (slug) => {
        const relatedPathway = pathwayBySlug.get(slug);

        if (!relatedPathway) {
          throw new Error(`Missing related pathway for slug: ${slug}`);
        }

        return relatedPathway._id;
      }
    );

    await currentPathway.save();
  }

  await pathwayMatchProfileRepository.createMany(
    profileSeed.map((profile) => {
      const pathway = pathwayBySlug.get(profile.pathwaySlug);

      if (!pathway) {
        throw new Error(`Missing pathway for slug: ${profile.pathwaySlug}`);
      }

      return {
        pathwayId: pathway._id,
        version: profile.version,
        strengths: profile.strengths,
        subjects: profile.subjects,
        passions: profile.passions,
        freeTime: profile.freeTime,
        workEnvironment: profile.workEnvironment,
        workStyle: profile.workStyle,
        impact: profile.impact,
        goals: profile.goals,
        notes: profile.notes,
        status: profile.status,
      };
    })
  );

  console.log(
    `Seeded ${taxonomySeed.length} taxonomy nodes, ${pathways.length} pathways, and ${profileSeed.length} match profiles.`
  );

  await mongoose.disconnect();
}

seedPathwayDomain().catch(async (error) => {
  console.error('Failed to seed pathway domain:', error);
  await mongoose.disconnect();
  process.exit(1);
});
