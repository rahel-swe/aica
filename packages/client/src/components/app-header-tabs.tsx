import { cn } from '@/lib/utils';
import { Compass, House, Map, MessageSquareText, Sparkles } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', to: '/app/dashboard', icon: House },
  { label: 'Explore', to: '/app/explore', icon: Compass },
  { label: 'Recommendations', to: '/app/recommendations', icon: Sparkles },
  { label: 'Advisor', to: '/app/advisor', icon: MessageSquareText },
  { label: 'Roadmap', to: '/app/roadmap', icon: Map },
];

export default function AppHeaderTabs() {
  return (
    <nav className="gap-1 hidden md:flex border p-2 rounded-full mx-auto">
      {navItems.map(({ label, to, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors',
              'hover:bg-accent hover:text-accent-foreground',
              isActive &&
                'bg-primary text-primary-foreground shadow-sm hover:bg-primary hover:text-primary-foreground'
            )
          }
        >
          <Icon className="size-5 lg:hidden" />
          <span className="hidden lg:block">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
