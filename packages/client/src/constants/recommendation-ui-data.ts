export const rankedButtonColor = [
  'bg-blue-200/70 dark:bg-blue-200',
  'bg-green-200/70 dark:bg-green-200',
  'bg-yellow-200/70 dark:bg-yellow-200',
] as const;

export const cardbgColors = [
  'bg-blue-100 dark:bg-blue-200 text-gray-900 dark:text-gray-900',
  'bg-green-100 dark:bg-green-200 text-gray-900 dark:text-gray-900',
  'bg-yellow-200/70 dark:bg-yellow-200 text-gray-900 dark:text-gray-900',
  'bg-pink-200/70 dark:bg-pink-200 text-gray-900 dark:text-gray-900',
  'bg-yellow-200/70 dark:bg-yellow-200 text-gray-900 dark:text-gray-900',
  'bg-yellow-200/70 dark:bg-yellow-200 text-gray-900 dark:text-gray-900',
] as const;

export const backdropShapeVariants = [
  // Triangle
  'w-0 h-0 border-l-[50px] border-r-[50px] border-b-[100px] border-l-transparent border-r-transparent border-b-sky-400 rotate-25',

  // Circle
  'w-24 h-24 bg-pink-400 rounded-full',

  // Rounded square
  'w-24 h-24 bg-red-400 rounded-3xl rotate-12',

  'w-0 h-0 border-l-[50px] border-r-[50px] border-t-[100px] border-l-transparent border-r-transparent border-t-sky-400 rounded-t-full',

  // Diamond
  'w-20 h-20 bg-violet-400 rotate-45 rounded-2xl',

  // Half circle
  'w-24 h-24 bg-blue-400 rounded-l-full',

  // Soft blob
  'w-28 h-28 bg-emerald-400 rounded-[40%_60%_70%_30%/40%_40%_60%_50%]',

  // Capsule
  'w-32 h-16 bg-amber-400 rounded-full rotate-12',

  // Star using clip-path
  'w-24 h-24 bg-yellow-400 [clip-path:polygon(50%_0%,61%_35%,98%_35%,68%_57%,79%_91%,50%_70%,21%_91%,32%_57%,2%_35%,39%_35%)]',

  // Pentagon
  'w-24 h-24 bg-cyan-400 [clip-path:polygon(50%_0%,100%_38%,82%_100%,18%_100%,0%_38%)]',

  // Hexagon
  'w-28 h-24 bg-fuchsia-400 [clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)]',

  // Arch shape
  'w-24 h-24 bg-orange-400 rounded-t-full rounded-b-2xl',

  // Tilted card
  'w-24 h-24 bg-lime-400 rounded-xl rotate-[25deg]',

  // Egg shape
  'w-24 h-32 bg-rose-400 rounded-[50%_50%_45%_45%/60%_60%_40%_40%]',

  // Burst shape
  'w-24 h-24 bg-indigo-400 [clip-path:polygon(50%_0%,60%_35%,100%_50%,60%_65%,50%_100%,40%_65%,0%_50%,40%_35%)]',

  // Parallelogram
  'w-28 h-20 bg-teal-400 skew-x-12 rounded-lg',
];

export const backdropShapePositions = [
  { top: '8%', left: '12%' },
  { top: '18%', left: '72%' },
  { top: '36%', left: '18%' },
  { top: '52%', left: '78%' },
  { top: '68%', left: '10%' },
  { top: '14%', left: '48%' },
  { top: '42%', left: '58%' },
  { top: '76%', left: '36%' },
  { top: '84%', left: '70%' },
];

export const recommendationSurfaceColors = [
  'bg-blue-200/60 dark:bg-blue-200 text-gray-900',
  'bg-green-200/60 dark:bg-green-200  text-gray-900',
  'bg-yellow-200/70 dark:bg-yellow-200  text-gray-900',
] as const;
