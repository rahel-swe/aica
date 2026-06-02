import { useAdvisorHistoryListParams } from '@/hooks/use-advisor-history-list-params';
import { useAdvisorHistoryStore } from '@/stores/advisor-history-store';
import { PencilLine } from 'lucide-react';
import { Button } from '../ui/button';

const StartNewAdvisor = () => {
  const [{ historyId }, setAdvisorHistolyParams] =
    useAdvisorHistoryListParams();
  const { clearSelectedHistory } = useAdvisorHistoryStore();

  if (!historyId) return null;

  return (
    <Button
      variant={'outline'}
      className=""
      onClick={() => {
        setAdvisorHistolyParams({ historyId: null });
        clearSelectedHistory();
      }}
    >
      <PencilLine />
    </Button>
  );
};

export default StartNewAdvisor;
