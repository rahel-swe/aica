import { Button } from '../ui/button';
import { Trash } from 'lucide-react';
import { useDeleteConversationByIdQuery } from '@/queries/advisor-query';
import SpinnerBars from '../shadcn-space/spinner/spinner-06';
import { useAdvisorHistoryStore } from '@/stores/advisor-history-store';

const DeleteConversationButton = ({
  conversationId,
}: {
  conversationId: string;
}) => {
  const { mutate, isPending, error } = useDeleteConversationByIdQuery();
  const { selectedHistory, clearSelectedHistory } = useAdvisorHistoryStore();

  return (
    <Button
      size={'xs'}
      variant={'destructive'}
      className="cursor-pointer"
      disabled={isPending}
      onClick={(e) => {
        e.stopPropagation();
        mutate(conversationId);
        if (conversationId === selectedHistory?._id) clearSelectedHistory();

        console.log(error?.message);
      }}
    >
      {isPending ? (
        <SpinnerBars
          className={'gap-1 h-4'}
          barClassName="w-0.5"
          heights={['3px', '12px', '3px']}
        />
      ) : (
        <Trash />
      )}
    </Button>
  );
};

export default DeleteConversationButton;
