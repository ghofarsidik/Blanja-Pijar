import { Sidebar } from "../../../components/module/Sidebar";
import home from "../../../assets/images/profile/seller/home (2) 1.svg";
import product from "../../../assets/images/profile/seller/package 1.svg";
import order from "../../../assets/images/profile/seller/shopping-cart (3) 1.svg";
import PersonalInformation from "../customer/personal-information";
import ShippingAddress from "../customer/shipping-address";
import { OrderHistory } from "../customer/order-history";
import { Dashboard } from "../../../components/module/Dashboard";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import StoreInformation from "./store-information";
import MyProduct from "./my-product";
import AddProduct from "./add-product";
export default function ProfileSellerPage() {
  const { path } = useParams();
  const { activeUser } = useSelector((state) => state.user);
  const [openChild, setOpenChild] = useState(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const NAVIGATION = [
    {
      path: "mystore",
      title: "Store",
      child: [
        {
          path: "mystore",
          title: "Store profile",
          component: (
            <StoreInformation
              activeUser={activeUser}
              handleOpenMenu={handleOpen}
              openMenu={open}
            />
          ),
        },
      ],
      icon: home,
      style: "bg-blue-500 rounded-full p-1",
    },
    {
      path: "myproduct",
      title: "Product",
      child: [
        {
          path: "myproduct",
          title: "My product",
          component: <MyProduct />,
        },
        { path: "addproduct", title: "Add product", component: <AddProduct /> },
      ],
      icon: product,
      style: "bg-orange-800 rounded-full p-1",
    },
    {
      path: "myorder",
      title: "Order",
      child: [
        {
          path: "myorder",
          title: "My order",
          component: (
            <OrderHistory handleOpenMenu={handleOpen} openMenu={open} />
          ),
        },
        { path: "order-cancel", title: "Order cancel" },
      ],
      icon: order,
      style: "bg-red-400 rounded-full p-1",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="hidden lg:block lg:w-[400px]">
        <Sidebar>
          <div className="lg:w-full lg:pl-36 lg:mx-auto ml-64 w-52">
            {NAVIGATION?.map((item, i) => (
              <>
                <div
                  key={i}
                  className="flex gap-3 my-4 cursor-pointer"
                  onClick={() => setOpenChild(i)}
                >
                  <div className={item?.style}>
                    <img src={item?.icon} alt="" className="w-5 h-5" />
                  </div>
                  <Link
                    to={`/profile/${item?.path}`}
                    className={`${
                      openChild === i ? "text-black" : "text-gray-500"
                    } flex gap-5 justify-between w-full lg:pr-28`}
                  >
                    {item?.title}{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={`${
                        openChild === i ? "rotate-180" : ""
                      } transition-all duration-300 size-4`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </Link>
                </div>
                {item?.child?.map((item) => (
                  <div
                    key={item?.path}
                    className={`${
                      openChild === i ? "" : "hidden"
                    } lg:ml-8 lg:text-sm lg:my-2`}
                  >
                    <Link
                      to={`/profile/${item?.path}`}
                      className={`${
                        path === item?.path ? "" : "text-gray-500"
                      }`}
                    >
                      {item?.title}
                    </Link>
                  </div>
                ))}
              </>
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
                } flex gap-5 justify-between w-full pr-32 lg:pr-28`}
              >
                {item?.title}{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`${
                    path === item?.path ? "rotate-180" : ""
                  } transition-all duration-300 size-4`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Dashboard>
        {NAVIGATION?.map((item) =>
          item?.child?.map((item) => (
            <div className="lg:relative static container">
              {item?.path === path && item?.component}
            </div>
          ))
        )}
      </Dashboard>
    </div>
  );
}
