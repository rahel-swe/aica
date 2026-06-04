import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

import { MAIN_TABS } from '@/constants/app-tabs';
import { useIsTabActive } from '@/hooks/use-active-tab';
import { useIsMobile } from '@/hooks/use-mobile';
import { authClient } from '@/lib/auth-client';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { Separator } from './ui/separator';
import UserAvatar from './user-avatar';

type TabItemProps = {
  label: string;
  to: string;
  icon: LucideIcon;
};

function TabItem({ label, to, icon: Icon }: TabItemProps) {
  const isActive = useIsTabActive(false, to);

  return (
    <Link to={to}>
      <motion.div
        whileTap={{ scale: 0.96 }}
        // whileHover={{ y: -2 }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 20,
        }}
        className={cn(
          'group relative  flex items-center rounded-full px-3 py-2 text-xs font-medium transition-all duration-200 ',
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

        {isActive && (
          <span className={cn('relative z-10 text-sm font-bold ms-2')}>
            {label}
          </span>
        )}
      </motion.div>
    </Link>
  );
}

const MobileMainTabs = ({ className }: { className?: string }) => {
  const isTabActive = useIsTabActive();
  const { data, isPending } = authClient.useSession();
  const isMobile = useIsMobile();

  if (isPending || (!isTabActive && isMobile)) return null;

  return (
    <div
      className={cn(
        'flex items-center justify-between md:hidden w-full',
        className
      )}
    >
      <div
        className={cn(
          'flex py-2 items-center rounded-full border fixed inset-s-4 inset-x-0 bottom-3 z-10',
          'backdrop-blur-md supports-backdrop-filter:bg-background/ px-2 w-min z-50'
        )}
      >
        {MAIN_TABS.map((item) => (
          <TabItem key={item.to} {...item} />
        ))}
      </div>
      <Separator
        decorative
        className="fixed z-0 inset-e-7 border rounded-2xl ms-auto bottom-9 inset-x-0 max-w-[80%]"
      />
      <Link
        to="/app/profile"
        className="items-center rounded-full bg-background/40 transition-all md:flex fixed inset-e-5 ms-auto bottom-3 w-min z-10 backdrop-blur-sm"
      >
        <UserAvatar className="size-12" username={data!.user.name} />
      </Link>
    </div>
  );
};

export default MobileMainTabs;
