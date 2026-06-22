import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { ChartNoAxesColumn, X } from 'lucide-react';
import { useState } from 'react';
import { AdvisorSidebar } from './advisor-sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { m } from '../../paraglide/messages';

export function AdvisorMobileDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <div dir="ltr" lang="en">
      <Drawer open={open} onOpenChange={setOpen} direction={'left'}>
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <DrawerTrigger asChild>
                <Button
                  variant={'ghost'}
                  className="text-muted-foreground dark:hover:bg-transparent hover:text-foreground p-0 h-min"
                >
                  <ChartNoAxesColumn className="size-6 rotate-90 rtl:rotate-270" />
                </Button>
              </DrawerTrigger>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
              {m.advisor_conversations()}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DrawerContent className="">
          <DrawerClose className="absolute inset-e-7 top-6">
            <Button size={'sm'} className="py-4" variant={'outline'}>
              <X />
              {m.common_close()}
            </Button>
          </DrawerClose>
          <AdvisorSidebar className="" />
        </DrawerContent>
      </Drawer>
    </div>
  );
}
