import { useSelector } from "react-redux";
import Navbar from "../../components/module/Navbar";
import ProfileCustomerPage from "./customer";
import ProfileSellerPage from "./seller";
export default function Profile() {
  const { activeUser } = useSelector((state) => state.user);
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
