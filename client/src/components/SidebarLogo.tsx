import { Link } from 'react-router-dom';

function SidebarHeaderLogo() {
  return (
    <div className="flex items-center gap-3 cursor-pointer my-2">
      <div className="flex aspect-square size-8 items-center justify-center rounded-md hover:bg-accent">
        <Link to="/" className="text-[1.8rem] pb-0.5">
          ⌘
        </Link>
      </div>
      <span className="truncate font-semibold">Academ AI</span>
    </div>
  );
}

export default SidebarHeaderLogo;
