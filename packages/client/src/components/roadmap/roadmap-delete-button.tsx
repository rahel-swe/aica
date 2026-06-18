import { useRoadmapDeleteMutation } from '@/queries/roadmap-query';
import { Trash } from 'lucide-react';
import { Button } from '../ui/button';
import SpinnerBars from '../shadcn-space/spinner/spinner-06';
import ActionDialog from '../action-dialog';
import { useState } from 'react';

const RoadmapDeleteButton = ({ roadmapId }: { roadmapId: string }) => {
  const { mutateAsync, isPending } = useRoadmapDeleteMutation();
  const [openDialog, setOpenDialog] = useState(false);

  const handleDelete = async () => {
    try {
      await mutateAsync(roadmapId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ActionDialog
      open={openDialog}
      setOpen={setOpenDialog}
      trigger={
        <Button
          variant="destructive"
          className="w-min text-destructive px-4 relative text-xs sm:text-sm"
          disabled={isPending}
          onClick={() => setOpenDialog(true)}
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
