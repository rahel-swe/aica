import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

const SettingsSaveButton = ({
  onSave,
  disabled,
  isSaving,
  className,
}: {
  onSave: () => void;
  disabled: boolean;
  isSaving: boolean;
  className?: string;
}) => {
  return (
    <Button
      onClick={onSave}
      disabled={disabled}
      className={cn('self-end ms-auto', className)}
    >
      {isSaving ? 'Saving...' : 'Save changes'}
    </Button>
  );
};

export default SettingsSaveButton;
