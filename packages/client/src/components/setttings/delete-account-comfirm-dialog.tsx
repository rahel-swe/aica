import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ArrowRight, ShieldCheck, Trash } from 'lucide-react';

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
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';

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
          Delete Account
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-h-[80dvh] h-full">
        <ScrollArea className="overflow-auto">
          <div className="space-y-4">
            <AlertDialogHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="size-5 text-destructive" />

                <AlertDialogTitle>Delete your AICA account?</AlertDialogTitle>
              </div>

              <AlertDialogDescription className="pt-2">
                Your account and all associated guidance data will be
                permanently removed.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="text-sm font-medium">You will lose access to:</p>

              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                <li>Your guidance profile and assessment results</li>

                <li>Saved academic and career pathways</li>

                <li>Personalized recommendations and match history</li>

                <li>Roadmap progress and completed milestones</li>

                <li>AI advisor conversations and generated insights</li>
              </ul>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                If your interests, goals, or career direction have changed, you
                can retake your assessment and generate updated recommendations
                instead of deleting your account.
              </p>
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel>
                <ShieldCheck className="size-4" />
                Keep My Account
              </AlertDialogCancel>

              <AlertDialogAction
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={() => navigate('/settings/delete-account')}
              >
                Review Deletion Request
                <ArrowRight className="size-4" />
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
