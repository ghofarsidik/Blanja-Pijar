import { Navigate, Outlet } from "react-router-dom";

const Customer = () => {
  const token = localStorage.getItem("token");

  return <>{!token ? <Navigate to={"/login"} replace /> : <Outlet></Outlet>}</>;
};
export default Customer;
