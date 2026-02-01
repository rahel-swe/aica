import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <main>
      <Outlet />
      <div>
        <h1>Root LayOut</h1>
      </div>
    </main>
  );
};

export default RootLayout;
