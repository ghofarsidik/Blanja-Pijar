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
import { useState } from "react";
export default function ProfileCustomerPage() {
  const { path } = useParams();
  const { activeUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const NAVIGATION = [
    {
      path: "account",
      title: "My Account",
      icon: user,
      style: "bg-blue-500 rounded-full p-1",
      component: (
        <PersonalInformation
          activeUser={activeUser}
          handleOpenMenu={handleOpen}
          openMenu={open}
        />
      ),
    },
    {
      path: "address",
      title: "Shipping Address",
      icon: shipping,
      style: "bg-orange-700 rounded-full p-1",
      component: (
        <ShippingAddress
          activeUser={activeUser}
          handleOpenMenu={handleOpen}
          openMenu={open}
        />
      ),
    },
    {
      path: "order-history",
      title: "My Order",
      icon: bag,
      style: "bg-red-400 rounded-full p-1",
      component: <OrderHistory handleOpenMenu={handleOpen} openMenu={open} />,
    },
  ];
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="hidden lg:block lg:w-[400px]">
        <Sidebar>
          <div className="lg:w-full lg:pl-36 lg:mx-auto ml-64 w-52">
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
      </div>
      <div
        className={`overflow-hidden lg:hidden transition-all duration-300 ${
          open ? "bg-gray-100 h-[200px]" : "h-0"
        }`}
      >
        <div
          className={`transition-transform transform ${
            open ? "translate-y-0" : "translate-y-full"
          } flex flex-col justify-center px-10 h-full`}
        >
          {NAVIGATION?.map((item, i) => (
            <div
              key={i}
              className="flex gap-3 my-4 cursor-pointer"
              onClick={handleOpen}
            >
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
      </div>
      <Dashboard>
        {NAVIGATION?.map((item) => (
          <div className="lg:relative static container">
            {item?.path === path && item?.component}
          </div>
        ))}
      </Dashboard>
    </div>
  );
}
