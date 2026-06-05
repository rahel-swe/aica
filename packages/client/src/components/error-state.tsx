import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';

type ErrorStateProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  isRetrying?: boolean;
  fullScreen?: boolean;
};

const ErrorState = ({
  title = 'Something went wrong',
  message = "We couldn't load the data. Please try again.",
  onRetry,
  retryLabel = 'Retry',
  isRetrying = false,
  fullScreen = false,
}: ErrorStateProps) => {
  return (
    <div
      className={`flex items-center justify-center p-6 ${
        fullScreen ? 'min-h-screen' : 'min-h-50'
      }`}
    >
      <div className="w-full max-w-md rounded-2xl border bg-background p-6 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-6 w-6 text-destructive" />
        </div>

        <h2 className="text-lg font-semibold">{title}</h2>

        <p className="mt-2 text-sm text-muted-foreground">{message}</p>

        {onRetry && (
          <Button
            onClick={onRetry}
            disabled={isRetrying}
            className="mt-5 rounded-full px-5"
          >
            <RefreshCw
              className={`size-4.5 ${isRetrying ? 'animate-spin' : ''}`}
            />
            {isRetrying ? 'Retrying...' : retryLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ErrorState;
