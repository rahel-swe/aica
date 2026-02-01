
import { Outlet } from 'react-router-dom'

const AuthLayout = () =>  {
  return (
   <>
    <div>auth-layout</div>
    <div>
       <Outlet /> 
    </div>
   </>
  );
};

export default AuthLayout;

