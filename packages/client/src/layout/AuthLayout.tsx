import { FieldDescription } from '@/components/ui/field';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="m-4">
      <Outlet />
      <FieldDescription className="px-6 py-4 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{' '}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
};

export default AuthLayout;
