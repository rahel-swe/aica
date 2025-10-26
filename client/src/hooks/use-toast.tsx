import { AlertTitle, AlertDescription } from '@/components/ui/alert';
import {
  AlertCircle,
  CheckCircle2,
  Info,
  MessageCircleWarning,
} from 'lucide-react';
import { toast } from 'sonner';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

const icons = {
  success: <CheckCircle2 className="text-green-400 w-5" />,
  error: <AlertCircle className="text-red-500 w-5" />,
  warning: <MessageCircleWarning className="text-yellow-300 w-5" />,
  info: <Info className="text-blue-400 w-5" />,
};

const titles = {
  success: 'Success Notification',
  error: 'Error Notification',
  warning: 'Warning Notification',
  info: 'Info Notification',
};

const useToast = () => {
  const toastNotification = (type: NotificationType, message: string) =>
    toast(
      () => (
        <div className="flex items-center gap-2">
          {icons[type]}
          <AlertTitle
            className={`${
              type === 'success'
                ? 'text-green-400'
                : type === 'error'
                ? 'text-red-500'
                : type === 'warning'
                ? 'text-yellow-300'
                : 'text-blue-400'
            } font-semibold`}
          >
            {titles[type]}
          </AlertTitle>
        </div>
      ),
      {
        description: (
          <AlertDescription className="ml-7">{message}</AlertDescription>
        ),
        closeButton: true,
        dismissible: true,
      }
    );

  return { toastNotification };
};

export default useToast;
