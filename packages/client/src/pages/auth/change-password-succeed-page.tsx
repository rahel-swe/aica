import { Button } from '@/components/ui/button';
import { ArrowUpRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const ChangePasswordSucceedPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="relative w-full max-w-lg p-10 flex flex-col gap-6 items-center justify-center">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-primary/10">
            <Check className="size-10 text-primary" />
          </div>

          <h1 className="font-heading text-3xl font-bold tracking-tight">
            Password Changed Successfully
          </h1>

          <p className="mt-4 max-w-md text-muted-foreground">
            Your password has been updated successfully. You can now sign in
            using your new password and continue your journey with AICA.
          </p>
        </div>

        <Link to="/auth/sign-in">
          <Button className="py-6.5 w-min mx-auto px-10">
            Sign in
            <ArrowUpRight />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ChangePasswordSucceedPage;
