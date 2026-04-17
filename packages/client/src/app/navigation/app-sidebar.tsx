import {
  Compass,
  LayoutDashboard,
  Map,
  MessageSquareText,
  Sparkles,
  User,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Dashboard', to: '/app/dashboard', icon: LayoutDashboard },
  { label: 'Explore', to: '/app/explore', icon: Compass },
  { label: 'Recommendations', to: '/app/recommendations', icon: Sparkles },
  { label: 'Advisor', to: '/app/advisor', icon: MessageSquareText },
  { label: 'Roadmap', to: '/app/roadmap', icon: Map },
  { label: 'Profile', to: '/app/profile', icon: User },
];

export default function AppSidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r bg-sidebar/70 backdrop-blur lg:block">
      <div className="flex h-full flex-col px-4 py-6">
        <div className="px-3">
          <p className="text-sm font-semibold tracking-[0.18em] text-primary">
            AICA
          </p>
          <h1 className="mt-2 text-xl font-semibold text-foreground">
            AI Career Alignment
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Guided faculty and career discovery with clear recommendations and
            next steps.
          </p>
        </div>
        <nav className="mt-8 flex flex-1 flex-col gap-1">
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
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="rounded-2xl border bg-card p-4 text-sm text-card-foreground">
          <p className="font-medium">Next milestone</p>
          <p className="mt-1 text-muted-foreground">
            Finish onboarding to unlock clearer recommendations and a stronger
            roadmap.
          </p>
        </div>
      </div>
    </aside>
  );
}
