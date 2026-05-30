import { useRoadmapDeleteMutation } from '@/queries/roadmap-query';
import { Trash } from 'lucide-react';
import { Button } from '../ui/button';
import SpinnerBars from '../shadcn-space/spinner/spinner-06';
import RoadmapActionDialog from './roadmap-action-dialog';

const RoadmapDeleteButton = ({ roadmapId }: { roadmapId: string }) => {
  const { mutateAsync, isPending } = useRoadmapDeleteMutation();

  const handleDelete = async () => {
    try {
      await mutateAsync(roadmapId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RoadmapActionDialog
      trigger={
        <Button
          variant="destructive"
          className="w-min text-destructive px-4 relative text-xs sm:text-sm"
          disabled={isPending}
        >
          Delete Roadmap
          <Trash />
          {isPending && (
            <SpinnerBars
              className="my-auto absolute gap-1"
              barClassName="w-1"
              heights={['3px', '15px', '3px']}
            />
          )}
        </Button>
      }
      title="Delete roadmap?"
      description="This action cannot be undone."
      actionLabel="Delete"
      actionVariant="destructive"
      onAction={handleDelete}
      isPending={isPending}
    />
  );
};

export default RoadmapDeleteButton;
