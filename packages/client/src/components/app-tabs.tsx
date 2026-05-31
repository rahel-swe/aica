import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

import { Avatar, AvatarFallback } from './ui/avatar';
import { useIsTabActive } from '@/hooks/use-active-route';
import { motion } from 'motion/react';
import { tabItems } from '@/constants/app-tabs';
import { useIsMobile } from '@/hooks/use-mobile';

type TabItemProps = {
  label: string;
  to: string;
  icon: React.ElementType;
};

function TabItem({ label, to, icon: Icon }: TabItemProps) {
  const isActive = useIsTabActive(false, to);

  return (
    <Link to={to}>
      <motion.div
        whileTap={{ scale: 0.96 }}
        whileHover={{ y: -2 }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 20,
        }}
        className={cn(
          'group relative  flex min-w-16 flex-col items-center rounded-full px-3 py-2 text-xs font-medium transition-all duration-200',
          isActive
            ? 'text-primary-foreground shadow-lg shadow-primary/20'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        {/* Active Background */}
        {isActive && (
          <motion.span
            layoutId="mobile-tab-indicator"
            className="absolute inset-0 rounded-full bg-primary"
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
          />
        )}

        <Icon
          size={22}
          className={cn(
            'relative z-10 transition-all duration-300',
            !isActive && 'group-hover:scale-110 group-hover:-rotate-3'
          )}
        />

        <span className={cn('relative z-10 mt-1 text-[0.6rem]')}>{label}</span>
      </motion.div>
    </Link>
  );
}

export default function AppTabs() {
  const { data, isPending } = authClient.useSession();
  const isTabActive = useIsTabActive();
  const isMobile = useIsMobile();

  if (isPending || (!isTabActive && isMobile)) return null;

  return (
    <div className="sticky inset-x-0 bottom-3 z-50 flex items-center justify-between px-4 md:hidden">
      {/* Tabs */}
      <div
        className={cn(
          'flex h-16 items-center justify-evenly rounded-full border',
          'backdrop-blur-md supports-backdrop-filter:bg-background/10 px-1.5'
        )}
      >
        {tabItems.map((item) => (
          <TabItem key={item.to} {...item} />
        ))}
      </div>

      {/* Profile */}
      <Link to="/app/profile" className="shrink-0">
        <Avatar className="size-12 border backdrop-blur-sm">
          <AvatarFallback className="bg-background/20 backdrop-blur-xl">
            {data?.user.name?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </Link>
    </div>
  );
}
