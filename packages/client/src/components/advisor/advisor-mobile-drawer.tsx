import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { ChartNoAxesColumn } from 'lucide-react';
import { useState } from 'react';
import { AdvisorSidebar } from './advisor-sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

export function AdvisorMobileDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="left">
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DrawerTrigger asChild>
              <Button
                variant={'ghost'}
                className="text-muted-foreground dark:hover:bg-transparent hover:text-foreground p-0 h-min"
              >
                <ChartNoAxesColumn className="size-6 rotate-90" />
              </Button>
            </DrawerTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-xs">
            Conversations
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DrawerContent className="">
        <AdvisorSidebar className="" />
      </DrawerContent>
    </Drawer>
  );
}
