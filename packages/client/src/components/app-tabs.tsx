import { cn } from '@/lib/utils';
import { Compass, House, Map, MessageSquareText, Sparkles } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const tabItems = [
  { label: 'Home', to: '/app/dashboard', icon: House },
  { label: 'Recommendations', to: '/app/recommendations', icon: Sparkles },
  { label: 'Explore', to: '/app/explore', icon: Compass },
  { label: 'Advisor', to: '/app/advisor', icon: MessageSquareText },
  { label: 'Roadmap', to: '/app/roadmap', icon: Map },
];

export default function AppTabs() {
  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-2 max-w-70 rounded-full input/70 backdrop-blur-md z-40 mx-auto w-full h-16 flex items-center border md:hidden'
      )}
    >
      <div className="flex flex-items justify-evenly  px-2.5 py-1 w-full">
        {tabItems.map(({ to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center p-3.5 rounded-full text-xs font-medium text-muted-foreground transition-colors',
                isActive && 'text-white bg-primary'
              )
            }
          >
            <Icon className="" size={24} />
            {/* <span>{label}</span> */}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
