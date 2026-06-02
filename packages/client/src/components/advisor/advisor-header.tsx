import { Button } from '../ui/button';
import { PencilLine } from 'lucide-react';
import AdvisorHistoryListDrawer from './advisor-history-list-drawer';
import type { AdvisorHistoryListProps } from './advisor-history-list';
import { useAdvisorHistoryListParams } from '@/hooks/use-advisor-history-list-params';

const AdvisorHeader = ({ onSelect }: AdvisorHistoryListProps) => {
  const [, setAdvisorHistolyParams] = useAdvisorHistoryListParams();
  return (
    <div className="flex justify-between border w-full">
      <Button
        onClick={() => {
          setAdvisorHistolyParams({ historyId: null });
        }}
      >
        <PencilLine />
      </Button>
      <AdvisorHistoryListDrawer onSelect={onSelect} />
    </div>
  );
};

export default AdvisorHeader;
