import { AlertTriangle, Trash, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { m } from '../../paraglide/messages';

const DeleteAccountComfirmDialog = ({
  open,
  onOpenChange,
  className,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}) => {
  const navigate = useNavigate();

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className={cn(className)}>
          <Trash />
          {m.delete_account()}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-h-[80dvh] h-full">
        <ScrollArea className="overflow-auto">
          <div className="space-y-4">
            <AlertDialogHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="size-5 text-destructive" />

                <AlertDialogTitle>
                  {' '}
                  {m.delete_account_dialog_title()}
                </AlertDialogTitle>
              </div>

              <AlertDialogDescription className="pt-2">
                {m.delete_account_dialog_description()}
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="text-sm font-medium">
                {' '}
                {m.delete_account_you_will_lose()}
              </p>

              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                <li>{m.delete_account_item_1()}</li>
                <li>{m.delete_account_item_2()}</li>
                <li>{m.delete_account_item_3()}</li>
                <li>{m.delete_account_item_4()}</li>
                <li>{m.delete_account_item_5()}</li>
              </ul>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                {m.delete_account_alternative()}
              </p>
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel>
                <X className="size-4" />
                {m.keep_account()}
              </AlertDialogCancel>

              <AlertDialogAction
                variant="destructive"
                onClick={() => navigate('/settings/delete-account')}
              >
                {m.continue_to_deletion()}
                <Trash className="size-4" />
              </AlertDialogAction>
            </AlertDialogFooter>
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAccountComfirmDialog;
