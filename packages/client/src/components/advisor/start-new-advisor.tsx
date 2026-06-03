import { useAdvisorHistoryStore } from '@/stores/advisor-history-store';
import { PencilLine } from 'lucide-react';
import { Button } from '../ui/button';

const StartNewAdvisor = ({
  size,
}: {
  size?:
    | 'default'
    | 'xs'
    | 'sm'
    | 'lg'
    | 'icon'
    | 'icon-xs'
    | 'icon-sm'
    | 'icon-lg';
}) => {
  const { clearSelectedHistory, selectedHistory } = useAdvisorHistoryStore();

  if (!selectedHistory) return null;

  return (
    <Button
      variant={'outline'}
      className=""
      size={size ?? 'default'}
      onClick={() => clearSelectedHistory()}
      aria-label="Start new Chat"
    >
      <PencilLine />
    </Button>
  );
};

export default StartNewAdvisor;
