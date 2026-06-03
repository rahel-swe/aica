import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 text-center">
      <div className="space-y-4">
        <p className="text-sm font-medium text-primary">404</p>
        <h1 className="text-3xl font-semibold">Page not found</h1>
        <p className="text-muted-foreground">
          The route does not exist in the current AICA application structure.
        </p>
        <Button asChild>
          <Link to="/app/dashboard">Return home</Link>
        </Button>
      </div>
    </div>
  );
}
