import { Loader } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';

type DeleteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isPending: boolean;
};

function ConversationDeleteDialog({
  open,
  onOpenChange,
  onConfirm,
  isPending,
}: DeleteDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="rounded-2xl max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete conversation?</AlertDialogTitle>
          <AlertDialogDescription>
            This conversation and all its messages will be permanently removed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending} variant={'secondary'}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isPending}
            variant={'destructive'}
          >
            {isPending ? (
              <Loader className="size-3.5 animate-spin mr-1" />
            ) : null}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ConversationDeleteDialog;
