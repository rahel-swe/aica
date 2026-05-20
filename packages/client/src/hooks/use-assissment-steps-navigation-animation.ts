import type { Variants } from 'motion/react';
import { useEffect, useState } from 'react';

export type Direction = 'forward' | 'backward';

export const containerVariants = {
  hidden: (direction: Direction) => ({
    opacity: 0,
    x: direction === 'backward' ? 16 : -16,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.28,
      ease: 'easeOut',
      when: 'beforeChildren',
    },
  },
} as Variants;

type AnimationState = {
  direction: Direction;
  shouldAnimate: boolean;
  replayKey: number;
};

export function useAssissmentStepsNavigationAnimation(
  currentIndex: number,
  lastIndex: number
) {
  const [previousIndex, setPreviousIndex] = useState(currentIndex);

  const [animationState, setAnimationState] = useState<AnimationState>({
    direction: 'forward',
    shouldAnimate: false,
    replayKey: 0,
  });

  useEffect(() => {
    const isGoingBack = previousIndex > currentIndex;

    const direction: Direction = isGoingBack ? 'backward' : 'forward';

    const isEdgeZone =
      currentIndex === 0 ||
      (currentIndex === 1 && previousIndex === 0) ||
      currentIndex === lastIndex ||
      (currentIndex === lastIndex - 1 && previousIndex === lastIndex);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAnimationState((prev) => ({
      direction,
      shouldAnimate: isEdgeZone,
      replayKey: isEdgeZone ? prev.replayKey + 1 : prev.replayKey,
    }));

    setPreviousIndex(currentIndex);
  }, [currentIndex, previousIndex, lastIndex]);

  return animationState;
}
