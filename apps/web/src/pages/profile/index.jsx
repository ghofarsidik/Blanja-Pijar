import Navbar from "../../components/module/Navbar";
import ProfileCustomerPage from "./customer";
import ProfileSellerPage from "./seller";
export default function Profile() {
  const role = "customer";
  return (
    <main>
      <Navbar />
      <div className="flex">
        {role === "customer" ? <ProfileCustomerPage /> : <ProfileSellerPage />}
      </div>
    </main>
  );
}
