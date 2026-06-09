import { cn } from '@/lib/utils';
import { Lightbulb } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { advisorPrompts, type AdvisorPrompt } from './advisor-ui-data';

type PromptDropDownMenuProps = {
  onPromptSelect: (prompt: AdvisorPrompt) => void;
};

const SUGGESTED_PROMPTS = [
  {
    label: 'Why this pathway?',
    prompt: 'Why does my recommended pathway match my profile?',
  },
  {
    label: 'What to focus on',
    prompt: 'What should I focus on this week based on my roadmap?',
  },
  {
    label: 'Unsure about direction',
    prompt:
      "I'm not sure my current pathway is the right fit — can we talk through it?",
  },
  {
    label: 'Compare my options',
    prompt: 'Can you compare my top pathway recommendations?',
  },
] as const;

const PromptDropDownMenu = ({ onPromptSelect }: PromptDropDownMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'secondary'} className="self-start py-0 px-2">
          <Lightbulb strokeWidth={2.7} />
          Prompt
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full py-4 my-1">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.055 } },
          }}
          className="flex flex-col items-start gap-4"
        >
          {advisorPrompts.map((prompt) => {
            const { id, icon: Icon, tone, title } = prompt;

            return (
              <DropdownMenuItem className="dark:hover:bg-transparent  dark:focus-visible:bg-transparent py-0">
                <motion.button
                  key={id}
                  type="button"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    show: { opacity: 1, y: 0 },
                  }}
                  // whileHover={{ y: -2 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  onClick={() => onPromptSelect(prompt)}
                  className="shrink-0 group transition-colors h-min"
                >
                  <div className="flex items-center gap-3 text-sm">
                    <Icon className={cn('size-4.5', tone)} />
                    <p className="capitalize text-muted-foreground">
                      {/* {mode.replace('_', ' ')} */}
                      {title}
                    </p>
                  </div>
                </motion.button>
              </DropdownMenuItem>
            );
          })}
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PromptDropDownMenu;
