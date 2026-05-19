import { useRoadmapDeleteMutation } from '@/queries/roadmap-query';
import { Pencil } from 'lucide-react';
import SpinnerBars from '../shadcn-space/spinner/spinner-06';
import { Button } from '../ui/button';

const RoadmapEditButton = ({ roadmapId }: { roadmapId: string }) => {
  const { mutate, isPending } = useRoadmapDeleteMutation();

  const onDeleteClick = () => {
    mutate(roadmapId, {
      onError(error) {
        console.log(error);
      },
    });
  };

  return (
    <Button
      variant={'secondary'}
      className={'w-min mx-auto px-4 relative'}
      onClick={onDeleteClick}
      disabled={isPending}
    >
      Edit Roadmap
      <Pencil />
      {isPending && (
        <SpinnerBars
          className={'my-auto absolute gap-1'}
          barClassName="w-1"
          heights={['3px', '15px', '3px']}
        />
      )}
    </Button>
  );
};

export default RoadmapEditButton;
