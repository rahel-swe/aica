import type {
  AdvisorChatRequest,
  AdvisorContextSource,
  AdvisorResponse,
} from '@contracts/shared/types/advisor-types';
import { advisorResponseSchema } from '@contracts/shared/schemas/advisor-schema';
import { pathwayAssessmentRepository } from '../repositories/pathway-assessment-repository';
import { pathwayRepository } from '../repositories/pathway-repository';
import { recommendationRepository } from '../repositories/recommendation-repository';
import { roadmapRepository } from '../repositories/roadmap-repository';
import { roadmapSetupAssessmentRepository } from '../repositories/roadmap-setup-assessment-repository';
import { llmClient } from '../llm/llm-client';
import advisorGuidancePrompt from '@/src/llm/prompts/advisor-guidance-prompt.txt';

type AdvisorContext = {
  onboarding: unknown;
  recommendations: unknown[];
  selectedPathway: unknown;
  roadmapSetup: unknown;
  roadmap: any;
};

export class AdvisorService {
  private readonly pathwayAssessment = pathwayAssessmentRepository;
  private readonly recommendations = recommendationRepository;
  private readonly pathways = pathwayRepository;
  private readonly roadmaps = roadmapRepository;
  private readonly roadmapSetup = roadmapSetupAssessmentRepository;
  private readonly llm = llmClient;

  async answer(userId: string, request: AdvisorChatRequest) {
    const context = await this.buildContext(userId);

    if (!process.env.HF_TOKEN) {
      return this.buildFallbackResponse(request, context);
    }

    try {
      const raw = await this.llm.createTextCompletion(
        this.renderPrompt(request, context)
      );
      const parsed = this.parseJson(raw);
      const response = advisorResponseSchema.parse({
        intent: request.intent,
        contextUsed: this.getContextUsed(context),
        ...parsed,
      });

      return response;
    } catch {
      return this.buildFallbackResponse(request, context);
    }
  }

  private async buildContext(userId: string): Promise<AdvisorContext> {
    const [onboarding, recommendations, roadmapSetup, roadmap] =
      await Promise.all([
        this.pathwayAssessment
          .findByUserId(userId)
          .then((item) => item?.toObject?.() ?? item),
        this.recommendations.findByUserId(userId),
        this.roadmapSetup.findByUserId(userId),
        this.roadmaps.findOneByUserId(userId),
      ]);

    const selectedPathwayId =
      roadmap?.pathwayId ??
      roadmapSetup?.pickedPathwayId ??
      recommendations[0]?.pathwayId;

    const selectedPathway = selectedPathwayId
      ? await this.pathways.findActiveDetailByIdOrSlug(
          String(selectedPathwayId)
        )
      : null;

    return {
      onboarding,
      recommendations: recommendations.slice(0, 3),
      selectedPathway,
      roadmapSetup,
      roadmap,
    };
  }

  private renderPrompt(request: AdvisorChatRequest, context: AdvisorContext) {
    return advisorGuidancePrompt
      .replace('{{intent}}', request.intent)
      .replace('{{message}}', request.message)
      .replace(
        '{{context}}',
        JSON.stringify(this.summarizeContext(context), null, 2)
      );
  }

  private summarizeContext(context: AdvisorContext) {
    return {
      onboarding: context.onboarding,
      recommendations: context.recommendations.map((item: any) => ({
        title: item.title,
        slug: item.slug,
        rank: item.rank,
        totalScore: item.totalScore,
        reasons: item.reasons,
      })),
      selectedPathway: context.selectedPathway
        ? this.pickPathwayFields(context.selectedPathway as any)
        : null,
      roadmapSetup: context.roadmapSetup,
      roadmap: context.roadmap
        ? {
            title: context.roadmap.title,
            summary: context.roadmap.summary,
            goal: context.roadmap.goal,
            currentLevel: context.roadmap.currentLevel,
            timeBudgetPerWeek: context.roadmap.timeBudgetPerWeek,
            roadmapStyle: context.roadmap.roadmapStyle,
            nextReviewAt: context.roadmap.nextReviewAt,
            phases: context.roadmap.phases?.map((phase: any) => ({
              title: phase.title,
              objective: phase.objective,
              steps: phase.steps?.map((step: any) => ({
                title: step.title,
                status: step.status,
                estimatedTime: step.estimatedTime,
                difficulty: step.difficulty,
              })),
            })),
          }
        : null,
    };
  }

  private pickPathwayFields(pathway: any) {
    return {
      title: pathway.title,
      slug: pathway.slug,
      type: pathway.type,
      summary: pathway.summary,
      description: pathway.description,
      keySkills: pathway.keySkills,
      opportunities: pathway.opportunities,
      durationProfile: pathway.durationProfile,
      journeyPhases: pathway.journeyPhases,
      verificationNote: pathway.verificationNote,
    };
  }

  private parseJson(raw: string) {
    const start = raw.indexOf('{');
    const end = raw.lastIndexOf('}');

    if (start === -1 || end === -1) {
      throw new Error('Advisor response was not JSON.');
    }

    return JSON.parse(raw.slice(start, end + 1));
  }

  private buildFallbackResponse(
    request: AdvisorChatRequest,
    context: AdvisorContext
  ): AdvisorResponse {
    const roadmap = context.roadmap;
    const pathway = context.selectedPathway as any;
    const topRecommendation = context.recommendations[0] as any;
    const nextStep = roadmap?.phases
      ?.flatMap((phase: any) => phase.steps ?? [])
      ?.find((step: any) => step.status !== 'completed');

    const title =
      request.intent === 'fit'
        ? 'Why this pathway may fit'
        : request.intent === 'compare'
          ? 'How to compare your options'
          : request.intent === 'adjust'
            ? 'How to adjust the plan'
            : request.intent === 'decide'
              ? 'How to make the decision'
              : 'How to use your roadmap';

    const directAnswer = this.buildDirectAnswer(request.intent, {
      pathway,
      roadmap,
      topRecommendation,
      nextStep,
    });

    return {
      intent: request.intent,
      title,
      directAnswer,
      meaning:
        'AICA is using your saved pathway, recommendation, setup, and roadmap context. The guidance is scoped to decision quality and next steps, not general advice.',
      nextActions: this.buildNextActions(request.intent, nextStep),
      cautions: this.buildCautions(pathway, roadmap),
      contextUsed: this.getContextUsed(context),
      suggestedFollowUps: [
        'What should I do this week?',
        'Explain the current phase simply.',
        'What could make this pathway hard for me?',
      ],
    };
  }

  private buildDirectAnswer(
    intent: AdvisorChatRequest['intent'],
    context: {
      pathway: any;
      roadmap: any;
      topRecommendation: any;
      nextStep: any;
    }
  ) {
    if (!context.pathway && !context.roadmap) {
      return 'Complete recommendations and generate a roadmap first so the Advisor can give grounded guidance.';
    }

    if (intent === 'fit') {
      return `${context.pathway?.title ?? context.topRecommendation?.title ?? 'This pathway'} fits best when your strengths, interests, and work preferences match the recommendation reasons already saved in AICA. Use the fit score as a signal, then check whether the daily work and training path feel realistic.`;
    }

    if (intent === 'compare') {
      return 'Compare the options by commitment, work style, required study, and first 30 days of action. The better choice is not always the highest score; it is the one with strong fit and a realistic next step.';
    }

    if (intent === 'adjust') {
      return `Adjust the roadmap by protecting the core outcome, then changing pace. Keep the next step small: ${context.nextStep?.title ?? 'choose one concrete action you can finish this week'}.`;
    }

    if (intent === 'decide') {
      return 'Stay with the pathway if the work style, learning route, and near-term actions still feel realistic after review. Pause or compare again if the commitment, constraints, or required study path conflicts with your situation.';
    }

    return `Use the roadmap as your first action window, not the full career journey. Start with ${context.nextStep?.title ?? 'the first active step'}, then review progress before adding more work.`;
  }

  private buildNextActions(
    intent: AdvisorChatRequest['intent'],
    nextStep: any
  ) {
    if (intent === 'compare') {
      return [
        'Open the top two recommendations and compare daily work style.',
        'Check which option has the clearest first step.',
        'Choose the option you can test with the least risk this week.',
      ];
    }

    if (intent === 'adjust') {
      return [
        'Reduce the roadmap to one active step for this week.',
        'Move expensive or high-time tasks later if constraints are real.',
        'Keep evidence of completion simple and visible.',
      ];
    }

    return [
      nextStep?.title ?? 'Pick the first roadmap step and make it concrete.',
      'Write down what completion will look like.',
      'Review again after one focused work session.',
    ];
  }

  private buildCautions(pathway: any, roadmap: any) {
    const cautions: string[] = [];

    if (
      pathway?.verificationNote ||
      pathway?.durationProfile?.localRulesRequired
    ) {
      cautions.push(
        pathway.verificationNote ??
          'Local admission, licensing, or training rules may need verification.'
      );
    }

    if (!roadmap) {
      cautions.push(
        'No generated roadmap was found yet, so guidance is limited.'
      );
    }

    return cautions;
  }

  private getContextUsed(context: AdvisorContext): AdvisorContextSource[] {
    const sources: AdvisorContextSource[] = [];

    if (context.onboarding) sources.push('onboarding');
    if (context.recommendations.length) sources.push('recommendations');
    if (context.selectedPathway) {
      sources.push('pathway');
      sources.push('pathwayKnowledge');
    }
    if (context.roadmapSetup) sources.push('roadmapSetup');
    if (context.roadmap) sources.push('roadmap');

    return sources;
  }
}

export const advisorService = new AdvisorService();
