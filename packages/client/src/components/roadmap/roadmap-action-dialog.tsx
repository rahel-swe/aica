import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '../ui/dialog';
import { Button } from '../ui/button';
import React from 'react';

type ActionDialogProps = {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  actionLabel: string;
  onAction: () => void | Promise<void>;
  actionVariant?: 'default' | 'secondary' | 'destructive';
  isPending?: boolean;
};

const RoadmapActionDialog = ({
  trigger,
  title,
  description,
  actionLabel,
  onAction,
  actionVariant = 'default',
  isPending = false,
}: ActionDialogProps) => {
  const [open, setOpen] = React.useState(false);

  const handleAction = async () => {
    await onAction();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description ? (
            <DialogDescription>{description}</DialogDescription>
          ) : null}
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button
            variant={actionVariant}
            onClick={handleAction}
            disabled={isPending}
          >
            {actionLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RoadmapActionDialog;
