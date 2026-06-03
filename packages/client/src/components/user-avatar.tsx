import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from './ui/avatar';

const UserAvatar = ({
  username,
  className,
}: {
  username: string;
  className?: string;
}) => {
  return (
    <Avatar className={cn('size-11', className)}>
      <AvatarFallback className="bg-primary/10 text-sm font-semibold">
        {username?.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
