import { cn } from '@/lib/utils';
import { useState } from 'react';
import AppLogo from '../app-logo';
import { Button } from '../ui/button';
import { ChevronRight } from 'lucide-react';
import MobileNavDropDownMenu from './mobile-nav-dropdown-menu';
import ModeToggle from '../toggle-mode';
import { Link } from 'react-router-dom';
import { navLinks } from '@/constants/app-tabs-data';

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
        'fixed inset-x-0 top-0 z-50 transition-all mx-2 mt-2 rounded-full border border-border/0 duration-700 w-full md:w-min px-5 md:mx-auto',
        scrolled ? '' : 'bg-transparent'
      )}
    >
      <div className="md:w-min mx-auto h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 group shrink-0 md:fixed inset-s-6 top-6"
        >
          <AppLogo />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.to}
              className="text-sm  text-muted-foreground hover:text-foreground transition-colors font-heading bg-popover/45 rounded-4xl backdrop-blur-sm border  py-2 px-4 text-nowrap"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-2">
          <ModeToggle className="mr-0" />
          <Button asChild variant="secondary" className="py-6 px-6">
            <Link to="/auth/sign-in" viewTransition>
              Sign In
            </Link>
          </Button>
          <Button asChild className="rounded-full px-4 py-6 gap-1.5">
            <Link to="/auth/sign-up" viewTransition>
              Get Started <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>

        {/* Mobile Nav Dropwdown Menu */}
        <MobileNavDropDownMenu />
      </div>
    </header>
  );
}
