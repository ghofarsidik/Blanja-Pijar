import { Sidebar } from "../../../components/module/Sidebar";
import home from "../../../assets/images/profile/seller/home (2) 1.svg";
import product from "../../../assets/images/profile/seller/package 1.svg";
import order from "../../../assets/images/profile/seller/package 1.svg";
import Profile from "..";
export default function ProfileSellerPage() {
  const NAVIGATION = [
    {
      path: "",
      title: "Store",
      icon: home,
      style: "bg-blue-500 rounded-full p-1",
    },
    {
      path: "",
      title: "Product",
      icon: product,
      style: "bg-orange-800 rounded-full p-1",
    },
    {
      path: "",
      title: "Order",
      icon: order,
      style: "bg-red-400 rounded-full p-1",
    },
  ];
  return (
    <>
      <Sidebar>
        <div className="w-64 pl-20 mx-auto">
          {NAVIGATION?.map((item, i) => (
            <div key={i} className="flex gap-3 my-4">
              <div className={item?.style}>
                <img src={item?.icon} alt="" className="w-5 h-5" />
              </div>
              <p>{item?.title}</p>
            </div>
          ))}
        </div>
      </Sidebar>
    </>
  );
}
