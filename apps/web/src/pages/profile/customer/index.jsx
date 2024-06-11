import user from "../../../assets/images/profile/user 1.svg";
import bag from "../../../assets/images/profile/clipboard 1.svg";
import shipping from "../../../assets/images/profile/clipboard 1.svg";
import { Sidebar } from "../../../components/module/Sidebar";
import { Link, useParams } from "react-router-dom";
import { Dashboard } from "../../../components/module/Dashboard";
import PersonalInformation from "./personal-information";
import ShippingAddress from "./shipping-address";
import { OrderHistory } from "./order-history";
import { useSelector } from "react-redux";
export default function ProfileCustomerPage() {
  const { path } = useParams();
  const { activeUser } = useSelector((state) => state.user);
  const NAVIGATION = [
    {
      path: "account",
      title: "My Account",
      icon: user,
      style: "bg-blue-500 rounded-full p-1",
      component: <PersonalInformation activeUser={activeUser} />,
    },
    {
      path: "address",
      title: "Shipping Address",
      icon: shipping,
      style: "bg-orange-700 rounded-full p-1",
      component: <ShippingAddress activeUser={activeUser} />,
    },
    {
      path: "order-history",
      title: "My Order",
      icon: bag,
      style: "bg-red-400 rounded-full p-1",
      component: <OrderHistory />,
    },
  ];
  return (
    <>
      <Sidebar>
        <div className="w-64 pl-20 mx-auto">
          {NAVIGATION?.map((item, i) => (
            <div key={i} className="flex gap-3 my-4 cursor-pointer">
              <div className={item?.style}>
                <img src={item?.icon} alt="" className="w-5 h-5" />
              </div>
              <Link
                to={`/profile/${item?.path}`}
                className={`${
                  path === item?.path ? "text-black" : "text-gray-500"
                }`}
              >
                {item?.title}
              </Link>
            </div>
          ))}
        </div>
      </Sidebar>
      <Dashboard>
        {NAVIGATION?.map((item) => (
          <div className="relative">
            {item?.path === path && item?.component}
          </div>
        ))}
      </Dashboard>
    </>
  );
}
