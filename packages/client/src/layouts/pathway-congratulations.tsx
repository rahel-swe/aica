import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
import confettiAnimation from '../../public/animations/confetti on transparent background.json';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';

const PathwayCongratulations = () => {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center">
      <h1 className="text-5xl">Congratulations</h1>
      <Lottie
        lottieRef={lottieRef}
        animationData={confettiAnimation}
        loop={false}
        className="w-full md:w-[50%] h-auto absolute"
      />
      <Button
        className="relative z-50"
        onClick={() => {
          lottieRef.current?.goToAndPlay(0, true);
          console.log('it works');
        }}
      >
        Celebrate Again
      </Button>
    </div>
  );
};

export default PathwayCongratulations;
