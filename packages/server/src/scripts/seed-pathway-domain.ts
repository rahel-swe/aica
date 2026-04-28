import mongoose from 'mongoose';
import { pathwayMatchProfileRepository } from '../repositories/pathway-match-profile-repository';
import { pathwayRepository } from '../repositories/pathway-repository';
import { taxonomyNodeRepository } from '../repositories/taxonomy-node-repository';

if (!Bun.env.MONGODB_URI) {
  throw new Error('DATABASE_URL is not defined in environment variables.');
}

async function connectDB() {
  return await mongoose.connect(Bun.env.MONGODB_URI!, {
    dbName: Bun.env.DB_NAME,
    maxPoolSize: 10,
  });
}

async function seedPathwayDomain() {
  await connectDB();

  await pathwayMatchProfileRepository.deleteAll();
  await pathwayRepository.deleteAll();
  await taxonomyNodeRepository.deleteAll();

  const taxonomyNodes = await taxonomyNodeRepository.createMany([
    {
      name: 'Health',
      slug: 'health',
      kind: 'domain',
      order: 1,
      status: 'active',
      description: 'Health-related academic and career directions.',
    },
    {
      name: 'Technology',
      slug: 'technology',
      kind: 'domain',
      order: 2,
      status: 'active',
      description: 'Technology and digital systems pathways.',
    },
  ]);

  const healthNode = taxonomyNodes.find((node) => node.slug === 'health');
  const techNode = taxonomyNodes.find((node) => node.slug === 'technology');

  if (!healthNode || !techNode) {
    throw new Error('Base taxonomy nodes were not created correctly.');
  }

  const childNodes = await taxonomyNodeRepository.createMany([
    {
      name: 'Medicine',
      slug: 'medicine',
      kind: 'field',
      parentId: healthNode._id,
      order: 1,
      status: 'active',
    },
    {
      name: 'Nursing',
      slug: 'nursing',
      kind: 'field',
      parentId: healthNode._id,
      order: 2,
      status: 'active',
    },
    {
      name: 'Software Engineering',
      slug: 'software-engineering',
      kind: 'field',
      parentId: techNode._id,
      order: 1,
      status: 'active',
    },
    {
      name: 'Data',
      slug: 'data',
      kind: 'field',
      parentId: techNode._id,
      order: 2,
      status: 'active',
    },
  ]);

  const medicineNode = childNodes.find((node) => node.slug === 'medicine');
  const nursingNode = childNodes.find((node) => node.slug === 'nursing');
  const softwareEngineeringNode = childNodes.find(
    (node) => node.slug === 'software-engineering'
  );
  const dataNode = childNodes.find((node) => node.slug === 'data');

  if (!medicineNode || !nursingNode || !softwareEngineeringNode || !dataNode) {
    throw new Error('Field taxonomy nodes were not created correctly.');
  }

  const specializationNodes = await taxonomyNodeRepository.createMany([
    {
      name: 'Frontend Development',
      slug: 'frontend-development',
      kind: 'specialization',
      parentId: softwareEngineeringNode._id,
      order: 1,
      status: 'active',
    },
    {
      name: 'Backend Development',
      slug: 'backend-development',
      kind: 'specialization',
      parentId: softwareEngineeringNode._id,
      order: 2,
      status: 'active',
    },
  ]);

  const frontendNode = specializationNodes.find(
    (node) => node.slug === 'frontend-development'
  );
  const backendNode = specializationNodes.find(
    (node) => node.slug === 'backend-development'
  );

  if (!frontendNode || !backendNode) {
    throw new Error(
      'Specialization taxonomy nodes were not created correctly.'
    );
  }

  const pathways = await pathwayRepository.createMany([
    {
      title: 'General Doctor',
      slug: 'general-doctor',
      type: 'hybrid',
      taxonomyNodeIds: [healthNode._id, medicineNode._id],
      summary:
        'A care-focused pathway for diagnosis, treatment, and patient support.',
      description:
        'General doctors combine science, communication, and long-term learning to support patient health across many conditions.',
      keySkills: ['clinical reasoning', 'communication', 'biology foundation'],
      learningRoute: [
        'Build strong science foundations',
        'Prepare for medical entry requirements',
        'Train through supervised clinical practice',
      ],
      opportunities: ['hospitals', 'clinics', 'community health'],
      status: 'active',
    },
    {
      title: 'Nurse',
      slug: 'nurse',
      type: 'hybrid',
      taxonomyNodeIds: [healthNode._id, nursingNode._id],
      summary:
        'A people-centered healthcare pathway focused on direct patient care.',
      description:
        'Nursing fits people who value human support, structure, responsibility, and practical clinical impact.',
      keySkills: ['patient care', 'communication', 'team coordination'],
      learningRoute: [
        'Study nursing fundamentals',
        'Build supervised clinical experience',
        'Develop specialization over time',
      ],
      opportunities: ['hospitals', 'schools', 'community health centers'],
      status: 'active',
    },
    {
      title: 'Frontend Engineer',
      slug: 'frontend-engineer',
      type: 'career',
      taxonomyNodeIds: [
        techNode._id,
        softwareEngineeringNode._id,
        frontendNode._id,
      ],
      summary:
        'A creative technical pathway for building user-facing digital experiences.',
      description:
        'Frontend engineers combine problem solving, creativity, and product thinking to build clear and usable interfaces.',
      keySkills: ['javascript', 'ui development', 'design collaboration'],
      learningRoute: [
        'Learn web fundamentals',
        'Build responsive interfaces',
        'Work with APIs and product systems',
      ],
      opportunities: ['product teams', 'startups', 'digital agencies'],
      status: 'active',
    },
    {
      title: 'Backend Engineer',
      slug: 'backend-engineer',
      type: 'career',
      taxonomyNodeIds: [
        techNode._id,
        softwareEngineeringNode._id,
        backendNode._id,
      ],
      summary:
        'A systems-oriented technical pathway for building application logic and services.',
      description:
        'Backend engineers focus on APIs, data flow, reliability, and structured problem solving behind user-facing apps.',
      keySkills: ['api design', 'databases', 'system thinking'],
      learningRoute: [
        'Learn programming fundamentals',
        'Build APIs and service logic',
        'Develop database and reliability skills',
      ],
      opportunities: ['platform teams', 'saas products', 'enterprise systems'],
      status: 'active',
    },
    {
      title: 'Data Analyst',
      slug: 'data-analyst',
      type: 'career',
      taxonomyNodeIds: [techNode._id, dataNode._id],
      summary:
        'A data-focused pathway for turning information into practical decisions.',
      description:
        'Data analysts fit users who enjoy analytical thinking, patterns, evidence, and structured communication.',
      keySkills: ['sql', 'analysis', 'data storytelling'],
      learningRoute: [
        'Learn spreadsheets and SQL',
        'Practice analysis on real datasets',
        'Build reporting and communication skills',
      ],
      opportunities: ['business teams', 'research units', 'operations'],
      status: 'active',
    },
    {
      title: 'Medical Laboratory Specialist',
      slug: 'medical-laboratory-specialist',
      type: 'hybrid',
      taxonomyNodeIds: [healthNode._id, medicineNode._id],
      summary:
        'A science-centered health pathway focused on testing, evidence, and lab practice.',
      description:
        'This pathway suits users who value science, structure, careful analysis, and evidence-based healthcare support.',
      keySkills: ['lab methods', 'scientific observation', 'precision'],
      learningRoute: [
        'Strengthen science fundamentals',
        'Train on laboratory tools and methods',
        'Develop quality and reporting discipline',
      ],
      opportunities: ['diagnostic labs', 'hospitals', 'research support'],
      status: 'active',
    },
  ]);

  const pathwayBySlug = new Map(pathways.map((item) => [item.slug, item]));

  await pathwayMatchProfileRepository.createMany([
    {
      pathwayId: pathwayBySlug.get('general-doctor')!._id,
      version: 1,
      strengths: [
        { value: 'analytical', weight: 0.9, band: 'strong' },
        { value: 'communication', weight: 0.8, band: 'strong' },
        { value: 'people', weight: 0.9, band: 'strong' },
      ],
      subjects: [{ value: 'science', weight: 1, band: 'strong' }],
      passions: [
        { value: 'science', weight: 0.9, band: 'strong' },
        { value: 'social', weight: 0.6, band: 'supporting' },
      ],
      freeTime: [{ value: 'learn', weight: 0.7, band: 'supporting' }],
      workEnvironment: [{ value: 'mixed', weight: 0.8, band: 'supporting' }],
      workStyle: [{ value: 'help', weight: 0.9, band: 'strong' }],
      impact: [{ value: 'people', weight: 1, band: 'strong' }],
      goals: [
        { value: 'impact', weight: 0.9, band: 'strong' },
        { value: 'growth', weight: 0.7, band: 'supporting' },
      ],
      notes: [
        'High fit when science, people impact, and long-term growth align.',
      ],
      status: 'active',
    },
    {
      pathwayId: pathwayBySlug.get('nurse')!._id,
      version: 1,
      strengths: [
        { value: 'people', weight: 1, band: 'strong' },
        { value: 'communication', weight: 0.9, band: 'strong' },
        { value: 'organized', weight: 0.7, band: 'supporting' },
      ],
      subjects: [{ value: 'science', weight: 0.8, band: 'strong' }],
      passions: [{ value: 'social', weight: 0.8, band: 'strong' }],
      freeTime: [{ value: 'socialize', weight: 0.5, band: 'supporting' }],
      workEnvironment: [{ value: 'mixed', weight: 0.7, band: 'supporting' }],
      workStyle: [{ value: 'help', weight: 1, band: 'strong' }],
      impact: [{ value: 'people', weight: 1, band: 'strong' }],
      goals: [{ value: 'impact', weight: 0.8, band: 'strong' }],
      notes: ['Best when direct human support is a major driver.'],
      status: 'active',
    },
    {
      pathwayId: pathwayBySlug.get('frontend-engineer')!._id,
      version: 1,
      strengths: [
        { value: 'problem_solving', weight: 0.9, band: 'strong' },
        { value: 'creativity', weight: 0.9, band: 'strong' },
        { value: 'communication', weight: 0.6, band: 'supporting' },
      ],
      subjects: [
        { value: 'math', weight: 0.6, band: 'supporting' },
        { value: 'arts', weight: 0.7, band: 'supporting' },
      ],
      passions: [
        { value: 'tech', weight: 1, band: 'strong' },
        { value: 'building', weight: 0.8, band: 'strong' },
        { value: 'ideas', weight: 0.7, band: 'supporting' },
      ],
      freeTime: [
        { value: 'build', weight: 0.8, band: 'strong' },
        { value: 'learn', weight: 0.6, band: 'supporting' },
      ],
      workEnvironment: [
        { value: 'remote', weight: 0.7, band: 'supporting' },
        { value: 'mixed', weight: 0.8, band: 'supporting' },
      ],
      workStyle: [{ value: 'create', weight: 1, band: 'strong' }],
      impact: [{ value: 'create', weight: 0.9, band: 'strong' }],
      goals: [
        { value: 'growth', weight: 0.8, band: 'strong' },
        { value: 'variety', weight: 0.6, band: 'supporting' },
      ],
      notes: ['High fit when tech interest and creative execution overlap.'],
      status: 'active',
    },
    {
      pathwayId: pathwayBySlug.get('backend-engineer')!._id,
      version: 1,
      strengths: [
        { value: 'problem_solving', weight: 1, band: 'strong' },
        { value: 'analytical', weight: 0.9, band: 'strong' },
        { value: 'organized', weight: 0.6, band: 'supporting' },
      ],
      subjects: [{ value: 'math', weight: 0.8, band: 'strong' }],
      passions: [
        { value: 'tech', weight: 1, band: 'strong' },
        { value: 'building', weight: 0.7, band: 'supporting' },
      ],
      freeTime: [
        { value: 'build', weight: 0.7, band: 'supporting' },
        { value: 'learn', weight: 0.7, band: 'supporting' },
      ],
      workEnvironment: [
        { value: 'remote', weight: 0.7, band: 'supporting' },
        { value: 'mixed', weight: 0.7, band: 'supporting' },
      ],
      workStyle: [{ value: 'analyze', weight: 0.9, band: 'strong' }],
      impact: [{ value: 'systems', weight: 1, band: 'strong' }],
      goals: [
        { value: 'growth', weight: 0.8, band: 'strong' },
        { value: 'money', weight: 0.5, band: 'supporting' },
      ],
      notes: [
        'Strong when the user likes systems, logic, and structured building.',
      ],
      status: 'active',
    },
    {
      pathwayId: pathwayBySlug.get('data-analyst')!._id,
      version: 1,
      strengths: [
        { value: 'analytical', weight: 1, band: 'strong' },
        { value: 'problem_solving', weight: 0.8, band: 'strong' },
        { value: 'communication', weight: 0.6, band: 'supporting' },
      ],
      subjects: [
        { value: 'math', weight: 0.9, band: 'strong' },
        { value: 'science', weight: 0.6, band: 'supporting' },
      ],
      passions: [
        { value: 'tech', weight: 0.7, band: 'supporting' },
        { value: 'ideas', weight: 0.6, band: 'supporting' },
      ],
      freeTime: [{ value: 'learn', weight: 0.8, band: 'supporting' }],
      workEnvironment: [
        { value: 'office', weight: 0.6, band: 'supporting' },
        { value: 'remote', weight: 0.6, band: 'supporting' },
      ],
      workStyle: [{ value: 'analyze', weight: 1, band: 'strong' }],
      impact: [{ value: 'systems', weight: 0.7, band: 'supporting' }],
      goals: [{ value: 'growth', weight: 0.7, band: 'supporting' }],
      notes: ['Best when evidence, patterns, and analysis are central.'],
      status: 'active',
    },
    {
      pathwayId: pathwayBySlug.get('medical-laboratory-specialist')!._id,
      version: 1,
      strengths: [
        { value: 'analytical', weight: 0.9, band: 'strong' },
        { value: 'organized', weight: 0.8, band: 'strong' },
      ],
      subjects: [{ value: 'science', weight: 1, band: 'strong' }],
      passions: [{ value: 'science', weight: 0.9, band: 'strong' }],
      freeTime: [{ value: 'learn', weight: 0.6, band: 'supporting' }],
      workEnvironment: [{ value: 'lab', weight: 1, band: 'strong' }],
      workStyle: [{ value: 'analyze', weight: 0.8, band: 'strong' }],
      impact: [{ value: 'discover', weight: 0.6, band: 'supporting' }],
      goals: [{ value: 'growth', weight: 0.6, band: 'supporting' }],
      notes: ['Best fit when science and lab-based structured work align.'],
      status: 'active',
    },
  ]);

  console.log(
    `Seeded ${taxonomyNodes.length + childNodes.length + specializationNodes.length} taxonomy nodes, ${pathways.length} pathways, and 6 match profiles.`
  );

  await mongoose.disconnect();
}

seedPathwayDomain().catch(async (error) => {
  console.error('Failed to seed pathway domain:', error);
  await mongoose.disconnect();
  process.exit(1);
});
