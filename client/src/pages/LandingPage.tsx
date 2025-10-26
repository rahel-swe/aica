import { Outlet } from 'react-router-dom';

const LadingPage = () => {
  return (
    <>
      <h1 className="text-3xl text-center mt-10">Landing Page</h1>
      <Outlet />
    </>
  );
};

export default LadingPage;
