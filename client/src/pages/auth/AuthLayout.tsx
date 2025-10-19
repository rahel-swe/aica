import { Outlet } from 'react-router-dom';
import { SignupForm } from './SignupForm';

const AuthLayout = () => {
  return (
    <div>
      <h2>Auth Layout Page</h2>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
