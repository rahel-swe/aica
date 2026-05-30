import {
  GraduationCap,
  PlayCircle,
  FileText,
  FolderKanban,
  Wrench,
  LayoutGrid,
} from 'lucide-react';

export const resourceMeta = {
  course: {
    label: 'Course',
    icon: GraduationCap,
    accent: 'text-blue-600 bg-card ring-border',
  },
  video: {
    label: 'Video',
    icon: PlayCircle,
    accent: 'text-rose-600 bg-card ring-border',
  },
  article: {
    label: 'Article',
    icon: FileText,
    accent: 'text-emerald-500 bg-card ring-border',
  },
  project: {
    label: 'Project',
    icon: FolderKanban,
    accent: 'text-violet-600 bg-card ring-border',
  },
  tool: {
    label: 'Tool',
    icon: Wrench,
    accent: 'text-amber-500 bg-card ring-border',
  },
  other: {
    label: 'Resource',
    icon: LayoutGrid,
    accent: 'text-slate-500 bg-card ring-border',
  },
} as const;
