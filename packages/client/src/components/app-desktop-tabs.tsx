import { DESKTOP_TABS } from '@/constants/app-tabs-data';
import { useIsTabActive } from '@/hooks/use-active-tab';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type NavItemProps = {
  label: string;
  to: string;
  icon: React.ElementType;
};

function NavItem({ label, to, icon: Icon }: NavItemProps) {
  const isActive = useIsTabActive(false, to);
  const [hovered, setHovered] = useState(false);

  return (
    <Link to={to} viewTransition>
      <motion.div
        layout
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ x: 4 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
        className={cn(
          'group relative flex h-14 items-center rounded-full px-4 overflow-visible',
          'transition-colors duration-300 backdrop-blur-2xl supports-backdrop-filter:bg-background/10',
          isActive
            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 backdrop-blur-2xl'
            : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground'
        )}
      >
        {/* Active Background */}
        {isActive && (
          <motion.div
            layoutId="active-pill"
            className="absolute inset-0 rounded-full bg-primary"
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
          />
        )}

        <div className="relative z-10 flex items-center">
          <Icon
            className={cn(
              'size-5 shrink-0 transition-all duration-300',
              !isActive && 'group-hover:scale-110 group-hover:rotate-3'
            )}
          />

          <AnimatePresence>
            {hovered && (
              <motion.span
                initial={{
                  opacity: 0,
                  width: 0,
                  marginLeft: 0,
                }}
                animate={{
                  opacity: 1,
                  width: 'auto',
                  marginInlineStart: 12,
                }}
                exit={{
                  opacity: 0,
                  width: 0,
                  marginInlineStart: 0,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="whitespace-nowrap text-sm font-medium"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </Link>
  );
}

export default function AppDesktopTabs() {
  return (
    <aside className="hidden md:flex md:items-start ps-4 w-22">
      <nav className="fixed top-1/2 -translate-y-1/2 flex h-fit w-18.5 flex-col gap-1 rounded-full border bg-background/20 p-2.5 items-start justify-center backdrop-blur-sm z-20">
        {DESKTOP_TABS.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}
      </nav>
    </aside>
  );
}
