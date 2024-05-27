import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

const Customer = () => {
  const token = localStorage.getItem("token");
  const { isAuthenticated, user } = useSelector(state => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && user.role !== 'customer') {
    return <Navigate to="/" replace />
  }


  return <>{!token ? <Navigate to={"/login"} replace /> : <Outlet></Outlet>}</>;
};
export default Customer;
