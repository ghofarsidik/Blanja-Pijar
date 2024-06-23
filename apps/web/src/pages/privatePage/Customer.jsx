import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const Customer = () => {
  const token = localStorage.getItem("token");
  const { activeUser } = useSelector((state) => state.user);
  return (
    <>
      {!token ? (
        <Navigate to={"/login"} replace />
      ) : activeUser?.role !== "customer" ? (
        <>
          {/* {toastify("error", "Anda login sebagai perekrut")} */}
          <Navigate to={"/"} replace />
        </>
      ) : (
        <Outlet></Outlet>
      )}
    </>
  );
};
export default Customer;
