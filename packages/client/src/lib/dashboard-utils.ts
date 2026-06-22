import type { RoadmapStepDifficulty } from '@contracts/shared/types/roadmap-types';
import { m } from '../paraglide/messages';

export type RoadmapProgressTone =
  | 'excellent'
  | 'good'
  | 'growing'
  | 'getting_started';

export function getRoadmapProgressTone(progress: number) {
  if (progress >= 80) return m.roadmap_progress_excellent();
  if (progress >= 50) return m.roadmap_progress_good();
  if (progress >= 20) return m.roadmap_progress_growing();

  return 'getting_started';
}

export function getDifficultyTone(
  difficulty?: RoadmapStepDifficulty
): RoadmapStepDifficulty | null {
  switch (difficulty) {
    case m.roadmap_difficulty_easy():
    case m.roadmap_difficulty_medium():
    case m.roadmap_difficulty_hard():
      return difficulty;
    default:
      return null;
  }
}
