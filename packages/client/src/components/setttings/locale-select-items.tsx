import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

import type { SupportedLocale } from '@contracts/shared/schemas/i18n';
import { setLocale, getLocale } from '../../paraglide/runtime';
import { cn } from '@/lib/utils';

const LocaleSelectItems = ({
  value,
  onSelectChange,
  className,
  contentClassName,
}: {
  value?: SupportedLocale;
  onSelectChange?: (value: SupportedLocale) => void;
  className?: string;
  contentClassName?: string;
}) => {
  const onChangeLocale = (value: SupportedLocale) => {
    setLocale(value);
  };

  return (
    <Select
      value={value || getLocale() || 'en'}
      onValueChange={(value: SupportedLocale) => {
        if (onSelectChange) onSelectChange(value);
        else onChangeLocale(value);
      }}
    >
      <SelectTrigger id="app-language" className={cn('w-full py-5', className)}>
        <SelectValue placeholder="Select language" />
      </SelectTrigger>

      <SelectContent className={cn(contentClassName)}>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="ps">Pashto</SelectItem>
        <SelectItem value="fa">Dari</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LocaleSelectItems;
