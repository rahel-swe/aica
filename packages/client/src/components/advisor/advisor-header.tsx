import { cn } from '@/lib/utils';
import type { AdvisorHistoryListProps } from './advisor-history-list';
import AdvisorHistoryListDrawer from './advisor-history-list-drawer';
import StartNewAdvisor from './start-new-advisor';
import { useIsMobile } from '@/hooks/use-mobile';

type Props = {
  className?: string;
} & AdvisorHistoryListProps;

const AdvisorHeader = ({ onSelect, className }: Props) => {
  const isMobile = useIsMobile(768);

  return (
    <div className={cn('flex flex-col gap-2 items-start', className)}>
      {isMobile && <AdvisorHistoryListDrawer onSelect={onSelect} />}
      <StartNewAdvisor />
    </div>
  );
};

export default AdvisorHeader;
