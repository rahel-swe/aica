import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

import type { SupportedLocale } from '@contracts/shared/schemas/i18n';
import { setLocale, getLocale } from '../../paraglide/runtime';

const LocaleSelectItems = ({
  value,
  onSelectChange,
}: {
  value?: SupportedLocale;
  onSelectChange?: (value: SupportedLocale) => void;
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
      <SelectTrigger id="app-language" className="w-full py-5">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="ps">Pashto</SelectItem>
        <SelectItem value="fa">Dari</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LocaleSelectItems;
