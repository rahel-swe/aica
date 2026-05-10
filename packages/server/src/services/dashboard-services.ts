import { UserModel } from '../models/user-model';
import { PathwayModel } from '../models/pathway-model';
import { recommendationRepository } from '../repositories/recommendation-repository';
import { roadmapSetupAssessmentRepository } from '../repositories/roadmap-setup-assessment-repository';

export class DashboardService {
  private readonly userModel = UserModel;
  private readonly pathwayModel = PathwayModel;
  private readonly recommendationRepo = recommendationRepository;
  private readonly roadmapSetupAssessmentRepo =
    roadmapSetupAssessmentRepository;

  /**
   * MAIN DASHBOARD DATA
   */
  async getDashboardData(userId: string) {
    const [user, stats, progress, recommendations, insights] =
      await Promise.all([
        this.getUserSummary(userId),
        this.getStats(userId),
        this.getProgress(userId),
        this.getRecommendationSummary(userId),
        this.getInsights(userId),
      ]);

    return {
      user,
      stats,
      progress,
      recommendations,
      insights,
    };
  }

  /**
   * USER INFO (WELCOME SECTION)
   */
  async getUserSummary(userId: string) {
    const user = await this.userModel.findById(userId).select('name email');

    if (!user) {
      throw new Error('User not found');
    }

    const roadmapSetupAssessment =
      await this.roadmapSetupAssessmentRepo.findByUserId(userId);

    const activePathways = await this.pathwayModel.findOne({
      userId,
      _id: roadmapSetupAssessment?.pickedPathwayId,
      status: 'active',
    });

    return {
      name: user.name,
      email: user.email,
      activePathways,
    };
  }

  /**
   * DASHBOARD STATS (CARDS)
   */
  async getStats(userId: string) {
    const pathways = await this.pathwayModel.find({ userId });

    const totalPathways = pathways.length;

    const completedPathways = pathways.filter(
      (p: any) => p.progress === 1
    ).length;

    const inProgress = totalPathways - completedPathways;

    const avgProgress =
      totalPathways === 0
        ? 0
        : pathways.reduce((sum: number, p: any) => sum + (p.progress || 0), 0) /
          totalPathways;

    return {
      totalPathways,
      completedPathways,
      inProgress,
      averageProgress: Number(avgProgress.toFixed(2)),
    };
  }

  /**
   * ROADMAP PROGRESS SECTION
   */
  async getProgress(userId: string) {
    const pathways = await this.pathwayModel.find({ userId });

    const roadmap = pathways.map((p: any) => ({
      pathwayId: String(p._id),
      title: p.title,
      slug: p.slug,
      progress: p.progress || 0,
      currentStep: p.currentStep || null,
      completedSteps: p.completedSteps || 0,
    }));

    const currentPathway =
      roadmap.find((p) => p.progress > 0 && p.progress < 1) || null;

    return {
      roadmap,
      currentPathway,
      nextSteps: this.getNextSteps(roadmap),
    };
  }

  /**
   * RECOMMENDATION PREVIEW (from your RecommendationService)
   */
  async getRecommendationSummary(userId: string) {
    const recommendations = await this.recommendationRepo.findByUserId(userId);

    if (!recommendations.length) {
      return {
        hasRecommendations: false,
        top: [],
      };
    }

    const top = recommendations.slice(0, 3).map((r: any) => ({
      pathwayId: r.pathwayId,
      title: r.title,
      slug: r.slug,
      score: r.totalScore,
      rank: r.rank,
    }));

    return {
      hasRecommendations: true,
      top,
    };
  }

  /**
   * SIMPLE INSIGHTS (NO AI ENGINE INSIDE DASHBOARD)
   */
  async getInsights(userId: string) {
    const stats = await this.getStats(userId);
    const recommendations = await this.getRecommendationSummary(userId);

    let message = 'Keep building your learning path.';

    if (recommendations.hasRecommendations && stats.averageProgress > 0.6) {
      message =
        'You are doing great! You are ready to explore advanced pathways.';
    }

    if (!recommendations.hasRecommendations) {
      message = 'Complete onboarding to unlock personalized recommendations.';
    }

    return {
      message,
    };
  }

  /**
   * HELPERS
   */
  private getNextSteps(roadmap: any[]) {
    return roadmap
      .filter((p) => p.progress < 1)
      .slice(0, 2)
      .map((p) => ({
        pathwayId: p.pathwayId,
        title: p.title,
      }));
  }
}
