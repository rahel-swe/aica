import { cn } from '@/lib/utils';
import { LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { authClient } from '@/lib/auth-client';
import { useNavigate } from 'react-router-dom';

const SignOutButton = ({ className }: { className?: string }) => {
  const navigate = useNavigate();

  return (
    <Button
      variant={'destructive'}
      className={cn(className)}
      onClick={async () => {
        const signOuted = await authClient.signOut();

        if (signOuted) navigate('/');
      }}
    >
      <LogOut className="size-5" />
      <h2 className="font-medium text-md">Log Out</h2>
    </Button>
  );
};

export default SignOutButton;
