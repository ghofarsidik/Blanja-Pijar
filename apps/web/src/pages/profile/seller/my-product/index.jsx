import { Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Table } from "../../../../components/module/Table";
import { useSelector } from "react-redux";
import API from "../../../../configs/api";

const TABLE_HEAD = ["Product Name", "Price", "Stock", ""];

export default function MyProduct() {
  const { activeUser } = useSelector((state) => state.user);
  const [product, setProduct] = useState();
  const [activeTable, setActiveTable] = useState("All items");
  const getProductStore = async () => {
    try {
      const res = await API.get(`/store/${activeUser?.store[0]?.ID}`);
      setProduct(res?.data?.product);
    } catch (error) {
      console.log(error);
    }
  };
  const TABLE = [
    { route: "", title: "All items" },
    { route: "", title: "Sold out" },
    { route: "", title: "Archived" },
  ];
  useEffect(() => {
    getProductStore();
  }, []);
  return (
    <>
      <main className="lg:px-5">
        <div>
          <h1 className="lg:font-semibold lg:text-xl">My Product</h1>
          <div className="border-b border-gray-300 flex gap-x-10">
            {TABLE?.map((item) => (
              <button
                onClick={() => setActiveTable(item?.title)}
                className={`${
                  activeTable === item?.title
                    ? "text-main-red border-b-4 border-main-red py-3"
                    : "text-gray-500 border-b-4 border-transparent py-3"
                } font-semibold lg:text-lg transition-all duration-300`}
              >
                {item?.title}
              </button>
            ))}
          </div>
          <div className="lg:mt-6 lg:w-[300px]">
            <Input
              className="border border-gray-300"
              color="gray"
              label="Search"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              }
            />
          </div>
          <Table TABLE_HEAD={TABLE_HEAD} TABLE_ROWS={product} />
        </div>
      </main>
    </>
  );
}
