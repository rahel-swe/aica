import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <div>app-layout</div>
      <Outlet />
    </>
  );
};

export default AppLayout;
