import { SidebarMenuItem } from '@/components/ui/sidebar';

function SidebarLogo() {
  return (
    <div className="flex items-center gap-3 cursor-pointer ml-1 mt-2">
      <div className="bg-sidebar-primary flex aspect-square size-7 items-center justify-center rounded-md">
        <span className="text-xl pb-1">⌘</span>
      </div>
      <span className="truncate font-bold">Academ AI</span>
    </div>
  );
}

export default SidebarLogo;
