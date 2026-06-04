import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from './ui/avatar';

const UserAvatar = ({
  username,
  className,
  fallBackClassName,
}: {
  username: string;
  className?: string;
  fallBackClassName?: string;
}) => {
  return (
    <Avatar className={cn('size-11', className)}>
      <AvatarFallback
        className={cn('bg-primary/10 text-sm font-semibold', fallBackClassName)}
      >
        {username?.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
