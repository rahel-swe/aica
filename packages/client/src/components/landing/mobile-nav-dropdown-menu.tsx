import { navLinks } from '@/components/landing/navbar';
import { ChevronRight, Menu } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import ModeToggle from '../toggle-mode';

const MotionDropdownMenuContent = motion.create(DropdownMenuContent);

const MobileNavDropDownMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger
        asChild
        className="data-open:dark:bg-transparent data-open:bg-transparent"
      >
        <Button
          variant="ghost"
          className="md:hidden dark:hover:bg-transparent hover:bg-transparent"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <Menu className="size-6" />
        </Button>
      </DropdownMenuTrigger>
      <MotionDropdownMenuContent
        className="backdrop-blur-sm inset-e-4 top-4 overflow-hidden md:hidden"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.055 } },
        }}
      >
        {navLinks.map((l) => {
          return (
            <motion.a
              key={l}
              href="#"
              type="button"
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="flex items-center justify-between"
            >
              <DropdownMenuItem className="py-3 px-4 dark:hover:bg-muted rounded-full text-sm font-medium text-muted-foreground cursor-pointer w-full justify-between">
                {l}
                <ChevronRight className="w-4 h-4 opacity-40" />
              </DropdownMenuItem>
            </motion.a>
          );
        })}
        <motion.div
          className="pt-2 flex flex-col gap-2"
          variants={{
            hidden: { opacity: 0, y: 10 },
            show: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <ModeToggle className="mr-0" />

          <Button variant="secondary" className="py-6">
            Sign In
          </Button>
          <Button className="py-6">Get Started Free</Button>
        </motion.div>
      </MotionDropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileNavDropDownMenu;
