import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/module/Navbar";
import ProfileCustomerPage from "./customer";
import ProfileSellerPage from "./seller";
import { useEffect } from "react";
import { getActiveUser } from "../../configs/redux/features/userSlice";
import { useResponsive } from "../../hooks/useResponsive";
import { MobileNav } from "../../components/module/MobileNav";
export default function Profile() {
  const { activeUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const isMobile = useResponsive();
  useEffect(() => {
    dispatch(getActiveUser());
  }, []);
  return (
    <main>
      {isMobile ? <MobileNav /> : <Navbar />}
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
