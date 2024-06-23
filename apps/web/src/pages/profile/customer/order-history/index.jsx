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
import API from "../../../../configs/api";

export function OrderHistory() {
  const [transaction, setTransaction] = useState([]);

  const getTransactionUser = async (params) => {
    try {
      const res = await API.get(`/transaction/user`, {
        params: params,
      });
      setTransaction(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [activeTab, setActiveTab] = useState("waiting payment");

  const data = [
    {
      label: "Not yet paid",
      value: "waiting payment",
      desc: transaction,
    },
    {
      label: "Packed",
      value: "packed",
      desc: transaction,
    },
    {
      label: "Order cancel",
      value: "canceled",
      desc: transaction,
    },
  ];
  useEffect(() => {
    getTransactionUser({
      status: "waiting payment",
      limit: 5,
    });
  }, []);
  console.log(transaction);
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
              onClick={() => {
                setActiveTab(value);
                getTransactionUser({
                  status: value,
                });
              }}
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
              {desc?.map((items) => (
                <div key={items?.ID}>
                  {items?.Details?.map((item) => (
                    <div
                      className="flex gap-x-24 py-2 items-center"
                      key={item?.ID}
                    >
                      <div className="flex gap-x-3 items-center">
                        <img
                          src={item?.Product?.product_image[0]?.image}
                          alt=""
                          className="w-10 h-10 rounded shadow-lg"
                        />
                        <div>
                          <p className="font-semibold">{item?.Product.name}</p>
                          <div className="flex gap-1 items-center">
                            <p className="text-gray-500 text-sm">
                              {item?.product_quantity} X
                            </p>
                            <p className="text-gray-500 text-sm">
                              {formatCurrency(item?.Product.price)}
                            </p>
                          </div>
                          {/* <p>{console.log(item)}</p> */}
                        </div>
                      </div>
                      <p className="text-main-red font-bold">
                        {formatCurrency(items?.total_amount)}
                      </p>
                      <p className="-ml-4 inline-block min-w-[160px]">
                        {items?.payment_method}
                      </p>
                      <p
                        className={`${
                          items?.status === "packed"
                            ? "text-green-500"
                            : item?.status === "payment expired"
                            ? "text-main-red"
                            : "text-yellow-900"
                        } text-sm font-semibold`}
                      >
                        {items?.status}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </>
  );
}
