import { useEffect, useState } from 'react';

type Direction = 'forward' | 'backward';

type AnimationState = {
  direction: Direction;
  shouldAnimate: boolean;
  replayKey: number;
};

export function useRoadmapSetupStepsNavigationAnimation(
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
