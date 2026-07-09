import { useCopyText } from '@/hooks/use-copy-text';
import { Check, Copy } from 'lucide-react';
import { Button } from './ui/button';

const CopyTextButton = ({ text }: { text: string }) => {
  const { copyText, isCopiedText } = useCopyText();

  return (
    <Button
      size="icon-xs"
      variant={'ghost'}
      className="py-0 rounded-sm text-muted-foreground"
      onClick={() => copyText(text)}
    >
      {isCopiedText ? (
        <Check className="text-emerald-500" strokeWidth={2.9} />
      ) : (
        <Copy />
      )}
    </Button>
  );
};

export default CopyTextButton;
