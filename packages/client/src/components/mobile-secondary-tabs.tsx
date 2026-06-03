import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

import { SECONDARY_TABS } from '@/constants/app-tabs';
import { useIsTabActive } from '@/hooks/use-active-route';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'motion/react';

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
        // whileHover={{ y: -2 }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 20,
        }}
        className={cn(
          'group relative  flex min-w-16 items-center rounded-full px-3 py-2 text-xs font-medium transition-all duration-200 border hover:bg-muted',
          isActive
            ? 'text-primary-foreground shadow-lg shadow-primary/20'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        <Icon
          size={22}
          className={cn(
            'relative z-10 transition-all duration-300',
            !isActive && 'group-hover:scale-110 group-hover:-rotate-3'
          )}
        />

        <span className={cn('relative z-10 text-sm font-bold ms-2')}>
          {label}
        </span>
      </motion.div>
    </Link>
  );
}

const MobileSecondaryTabs = ({ className }: { className?: string }) => {
  const isTabActive = useIsTabActive();
  const isMobile = useIsMobile();

  if (!isTabActive && isMobile) return null;

  return (
    <div
      className={cn(
        'sticky inset-x-0 bottom-3 z-10 flex px-4 flex-wrap items-center justify-center gap-4 mx-auto',
        className
      )}
    >
      {SECONDARY_TABS.map((item) => (
        <TabItem key={item.to} {...item} />
      ))}
    </div>
  );
};
export default MobileSecondaryTabs;
