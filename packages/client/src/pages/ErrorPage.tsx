import { Button } from '@/components/ui/button';
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  return isRouteErrorResponse(error) ? (
    <Error status={error.status} message={error.statusText} />
  ) : (
    <Error message={(error as Error).message} />
  );
};

const Error = ({ status, message }: { status?: number; message: string }) => {
  return (
    <div className="grid gap-5 place-items-center mt-32">
      <h3 className="text-2xl">Page not found!</h3>

      <p>Please check the URL or go back to the homepage.</p>
      <Button>
        <Link to="/app">Home</Link>
      </Button>
      <p>
        {`${status} :`} {message}
      </p>
    </div>
  );
};

export default ErrorPage;
