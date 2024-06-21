import { useEffect, useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../../../utils/formatCurrency";

export function OrderHistory() {
  const { activeUser } = useSelector((state) => state.user);
  const payment = useSelector((state) => state.payment);
  const [transaction, setTransaction] = useState([]);

  const [activeTab, setActiveTab] = useState("all");
  const handleClick = (value) => {
    if (value === "all") {
      setTransaction(activeUser?.transaction);
    } else if (value === "pending") {
      const data = activeUser?.transaction?.filter(
        (item) => item?.status === "waiting payment"
      );
      setTransaction(data);
    } else if (value === "packed") {
      const data = activeUser?.transaction?.filter(
        (item) => item?.status === "packed"
      );
      setTransaction(data);
    } else {
      const data = activeUser?.transaction?.filter(
        (item) => item?.status === "payment expired"
      );
      setTransaction(data);
    }
    setActiveTab(value);
  };
  const data = [
    {
      label: "All items",
      value: "all",
      desc: transaction,
    },
    {
      label: "Not yet paid",
      value: "pending",
      desc: transaction,
    },
    {
      label: "Packed",
      value: "packed",
      desc: transaction,
    },
    {
      label: "Order cancel",
      value: "cancel",
      desc: transaction,
    },
  ];
  console.log(transaction);
  useEffect(() => {
    setTransaction(activeUser?.transaction);
  }, []);
  return (
    <>
      <div className="py-3">
        <h1 className="font-semibold text-2xl leading-relaxed">My order</h1>
      </div>
      <Tabs value={activeTab}>
        <TabsHeader
          className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
          indicatorProps={{
            className:
              "bg-transparent border-b-4 border-main-red shadow-none rounded-none",
          }}
        >
          {data.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              onClick={() => handleClick(value)}
              className={
                activeTab === value
                  ? "text-main-red font-semibold"
                  : "text-gray-500"
              }
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, desc }) => (
            <TabPanel
              key={value}
              value={value}
              className="overflow-y-scroll h-[450px]"
            >
              <div className="flex gap-24 font-semibold text-gray-500 -ml-1 pb-3">
                <p>Detail Product</p>
                <p>Total payment</p>
                <p>Payment method</p>
                <p className="ml-20">Status</p>
              </div>
              {desc?.map((item) => (
                <div key={item?.ID}>
                  <div className="flex gap-x-32 items-center">
                    <div>
                      <p className="font-semibold">{item?.Product.name}</p>
                      <div className="flex gap-1 items-center">
                        <p className="text-gray-500 text-sm">
                          {item?.quantity} X
                        </p>
                        <p className="text-gray-500 text-sm">
                          {formatCurrency(item?.Product.price)}
                        </p>
                      </div>
                    </div>
                    <p className="text-main-red font-bold">
                      {formatCurrency(item?.total_amount)}
                    </p>
                    <p className="-ml-4 inline-block min-w-[160px]">
                      {item?.payment_method}
                    </p>
                    <p
                      className={`${
                        item?.status === "packed"
                          ? "text-green-500"
                          : item?.status === "payment expired"
                          ? "text-main-red"
                          : "text-yellow-900"
                      } text-sm font-semibold`}
                    >
                      {item?.status}
                    </p>
                  </div>
                </div>
              ))}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </>
  );
}
