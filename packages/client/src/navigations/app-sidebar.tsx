import { Link, useLocation } from "react-router-dom";
import { Home, MessageCircle, Inbox, Map } from "lucide-react";

type SidebarProps = {
  collapsed: boolean;
  toggleCollapsed: () => void;
};

export default function AppSidebar({
  collapsed,
  toggleCollapsed,
}: SidebarProps) {
  const location = useLocation();

  const items = [
    { title: "Dashboard", url: "/app/dashboard", icon: Home },
    { title: "Chatbot", url: "/app/chatbot", icon: MessageCircle },
    { title: "Inbox", url: "/app/inbox", icon: Inbox },
    { title: "Roadmap", url: "/app/roadmap", icon: Map },
  ];

  return (
   <div className="hidden sm:block">
     <div
      className={`h-screen bg-black text-white flex flex-col justify-between transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* App Name / Logo */}
      <div
        className={`h-16 flex items-center border-b border-white/10 px-3 transition-all ${
          collapsed ? "justify-start" : "justify-center"
        }`}
      >
        <span className="font-bold text-lg">AICA</span>
      </div>

      {/* Page icons - vertically centered */}
      <div className="flex-1 flex flex-col justify-center relative">
        <nav className="flex flex-col p-2 space-y-4">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.url;
            return (
              <div key={item.title} className="relative group">
                <Link
                  to={item.url}
                  className={`flex items-center gap-3 p-2 rounded-lg transition 
                    ${isActive ? "bg-white text-black border-l-4 border-blue-500" : "hover:bg-white/10 hover:shadow-lg"}
                  `}
                >
                  <Icon size={24} />
                  {!collapsed && <span>{item.title}</span>}
                </Link>

                {/* Tooltip for collapsed state */}
                {collapsed && (
                  <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 whitespace-nowrap bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity z-50">
                    {item.title}
                  </span>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom toggle button */}
      <div
        className={`p-2 transition-all ${
          collapsed ? "self-start" : "self-center"
        }`}
      >
        <button
          onClick={toggleCollapsed}
          className="flex items-center justify-center w-14 h-14 rounded-lg hover:bg-white/10 transition relative group"
        >
          {/* Icon changes: + when collapsed, × when expanded */}
          <span className="text-2xl font-bold">{collapsed ? "+" : "×"}</span>

          {/* Tooltip changes */}
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity z-50">
            {collapsed ? "Open" : "Close"}
          </span>
        </button>
      </div>
    </div>
   </div>
  );
}
