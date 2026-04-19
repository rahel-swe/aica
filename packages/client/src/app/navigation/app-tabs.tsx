import { cn } from '@/lib/utils';
import { Compass, House, Map, MessageSquareText } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const tabItems = [
  { label: 'Home', to: '/app/dashboard', icon: House },
  { label: 'Explore', to: '/app/explore', icon: Compass },
  { label: 'Advisor', to: '/app/advisor', icon: MessageSquareText },
  { label: 'Roadmap', to: '/app/roadmap', icon: Map },
];

export default function AppTabs() {
  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 backdrop-blur-md mx-auto rounded-full mb-2 w-min h-16 flex items-center bg-input/65 md:hidden'
      )}
    >
      <div className="flex flex-items justify-evenly gap-x-4 px-2 py-1 w-full">
        {tabItems.map(({ to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center p-3.5 rounded-full text-xs font-medium text-muted-foreground transition-colors',
                isActive && 'text-primary bg-background'
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
