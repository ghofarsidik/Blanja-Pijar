import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/module/Navbar";
import ProfileCustomerPage from "./customer";
import ProfileSellerPage from "./seller";
import { useEffect } from "react";
import { getActiveUser } from "../../configs/redux/features/userSlice";
export default function Profile() {
  const { activeUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getActiveUser());
  }, []);
  return (
    <main>
      <Navbar />
      <div className="flex">
        {activeUser?.role === "customer" ? (
          <ProfileCustomerPage />
        ) : (
          <ProfileSellerPage />
        )}
      </div>
    </main>
  );
}
