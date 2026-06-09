import { backdropShapeVariants } from '@/constants/recommendation-ui-data';
import { cn } from '@/lib/utils';

const BackdropShapes = ({ index }: { index: number }) => {
  return (
    <div
      className={cn(
        'absolute -top-7 left-16 z-0',
        backdropShapeVariants[index % backdropShapeVariants.length]
      )}
    />
  );
};

export default BackdropShapes;
