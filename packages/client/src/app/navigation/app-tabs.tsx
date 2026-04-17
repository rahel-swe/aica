import { Compass, LayoutDashboard, Map, MessageSquareText } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

const tabItems = [
  { label: 'Home', to: '/app/dashboard', icon: LayoutDashboard },
  { label: 'Explore', to: '/app/explore', icon: Compass },
  { label: 'Advisor', to: '/app/advisor', icon: MessageSquareText },
  { label: 'Roadmap', to: '/app/roadmap', icon: Map },
];

export default function AppTabs() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 backdrop-blur lg:hidden">
      <div className="grid grid-cols-4 px-2 py-2">
        {tabItems.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] font-medium text-muted-foreground transition-colors',
                isActive && 'text-primary'
              )
            }
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
