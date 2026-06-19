import {
  Building2,
  Cog,
  Cpu,
  FlaskConical,
  Hammer,
  Landmark,
  Palette,
  Scale,
  Stethoscope,
} from 'lucide-react';

export const rankedButtonColor = [
  'bg-blue-200/70 dark:bg-blue-200',
  'bg-green-200/70 dark:bg-green-200',
  'bg-yellow-200/70 dark:bg-yellow-200',
] as const;

export const DOMAIN_ICONS = {
  technology: Cpu,
  healthcare: Stethoscope,
  business: Building2,
  finance: Landmark,
  'creative-arts': Palette,
  sciences: FlaskConical,
  'social-sciences-and-law': Scale,
  engineering: Cog,
  'trades-vocational-and-emerging': Hammer,
} as const;

export type DomainSlug = keyof typeof DOMAIN_ICONS;
