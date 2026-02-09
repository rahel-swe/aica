import { useState } from "react";
import { Outlet } from "react-router-dom";
import AppSidebar from "@/navigations/app-sidebar";


export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => setCollapsed(!collapsed);

  return (
    <>
      <div className="flex min-h-screen">
        <AppSidebar collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
        <Outlet />
      </div>

    
    </>
  );
}
