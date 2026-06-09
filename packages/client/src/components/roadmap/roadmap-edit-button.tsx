import { Pencil } from 'lucide-react';
import { Button } from '../ui/button';
import ActionDialog from '../action-dialog';
import { useRoadmapDeleteMutation } from '@/queries/roadmap-query';
import { useNavigate } from 'react-router-dom';

const RoadmapEditButton = ({ roadmapId }: { roadmapId: string }) => {
  const { mutateAsync, isPending } = useRoadmapDeleteMutation();
  const navigate = useNavigate();

  const onEdit = async () => {
    try {
      await mutateAsync(roadmapId);
      navigate('/roadmap-setup-assessment', { viewTransition: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ActionDialog
      trigger={
        <Button
          variant="secondary"
          className="w-min px-4 text-xs sm:text-sm"
          disabled={isPending}
        >
          Edit Roadmap
          <Pencil />
        </Button>
      }
      title="Edit roadmap?"
      description="Continuing will delete your current roadmap and start a new assessment."
      actionLabel="Continue"
      actionVariant="default"
      onAction={onEdit}
    />
  );
};

export default RoadmapEditButton;
