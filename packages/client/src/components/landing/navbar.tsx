import { cn } from '@/lib/utils';
import { useState } from 'react';
import AppLogo from '../app-logo';
import { Button } from '../ui/button';
import { ChevronRight } from 'lucide-react';
import MobileNavDropDownMenu from './mobile-nav-dropdown-menu';
import ModeToggle from '../toggle-mode';

export const navLinks = ['Features', 'How It Works', 'For You', 'About'];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => setScrolled(window.scrollY > 20), {
      passive: true,
    });
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all mx-2 mt-2 rounded-full border border-border/0 duration-700 w-full px-5',
        scrolled
          ? 'bg-popover/45 backdrop-blur-xl md:pe-2 border-border max-w-4xl md:mx-auto'
          : 'bg-transparent'
      )}
    >
      <div className="w-full mx-auto h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group shrink-0">
          <AppLogo />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => (
            <a
              key={l}
              href="#"
              className="text-base font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              {l}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-2">
          <ModeToggle className="mr-0" />
          <Button variant="secondary" className="py-6 px-6">
            Sign In
          </Button>
          <Button className="rounded-full px-4 py-6 gap-1.5">
            Get Started <ChevronRight className="w-3.5 h-3.5" />
          </Button>
        </div>

        {/* Mobile Nav Dropwdown Menu */}
        <MobileNavDropDownMenu />
      </div>
    </header>
  );
}
