import ActionDialog from '../action-dialog';

const StopGeneratingDialog = ({
  setOpen,
  open,
  onAction,
  isPending,
}: {
  setOpen: (open: boolean) => void;
  open: boolean;
  onAction: () => void;
  isPending?: boolean;
}) => {
  return (
    <ActionDialog
      actionLabel="Stop"
      title={'Stop generaing?'}
      description="Changin conversation will stop your current generation, do you want to stop it?"
      open={open}
      setOpen={setOpen}
      isPending={isPending}
      onAction={onAction}
    />
  );
};

export default StopGeneratingDialog;
