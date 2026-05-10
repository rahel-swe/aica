import { useRoadmapDeleteMutation } from '@/queries/roadmap-query';
import { Trash } from 'lucide-react';
import { Button } from '../ui/button';
import SpinnerBars from '../shadcn-space/spinner/spinner-06';

const RoadmapDeleteButton = ({ roadmapId }: { roadmapId: string }) => {
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
      variant={'destructive'}
      className={'w-min mx-auto text-destructive px-4 relative'}
      onClick={onDeleteClick}
      disabled={isPending}
    >
      Delete Roadmap
      <Trash />
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

export default RoadmapDeleteButton;
