import { AlignVerticalJustifyEnd } from 'lucide-react';
import { Drawer, DrawerContent, DrawerTrigger } from '../ui/drawer';
import {
  AdvisorHistoryList,
  type AdvisorHistoryListProps,
} from './advisor-history-list';
import { Button } from '../ui/button';

type AdvisorHistoryListDrawerProps = {
  onOpenChage?: (open: boolean) => void;
  open?: boolean;
} & AdvisorHistoryListProps;

const AdvisorHistoryListDrawer = ({
  onOpenChage,
  open,
  onSelect,
}: AdvisorHistoryListDrawerProps) => {
  return (
    <Drawer onOpenChange={onOpenChage} open={open} direction="right">
      <DrawerTrigger asChild>
        <Button>
          <AlignVerticalJustifyEnd />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <AdvisorHistoryList onSelect={onSelect} />
      </DrawerContent>
    </Drawer>
  );
};

export default AdvisorHistoryListDrawer;
