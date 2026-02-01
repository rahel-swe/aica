import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <main>
      <div>
        <h1>Root LayOut</h1>
      </div>

      <Outlet />
    </main>
  );
};

export default RootLayout;
