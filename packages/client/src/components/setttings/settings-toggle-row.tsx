import { Switch } from '@/components/ui/switch';

type SettingToggleRowProps = {
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

const SettingToggleRow = ({
  title,
  description,
  checked,
  onCheckedChange,
}: SettingToggleRowProps) => {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border px-4 py-3 bg-card">
      <div className="space-y-1">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
};

export default SettingToggleRow;
