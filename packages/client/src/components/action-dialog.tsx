import React from 'react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

type ActionDialogProps = {
  trigger?: React.ReactNode;
  title: string;
  description?: string;
  open?: boolean;
  setOpen: (open: boolean) => void;
  actionLabel: string;
  onAction: () => void | Promise<void>;
  actionVariant?: 'default' | 'secondary' | 'destructive';
  isPending?: boolean;
};

const ActionDialog = ({
  trigger,
  title,
  setOpen,
  open,
  description,
  actionLabel,
  onAction,
  actionVariant = 'default',
  isPending = false,
}: ActionDialogProps) => {
  const handleAction = async () => {
    await onAction();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

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

export default ActionDialog;
