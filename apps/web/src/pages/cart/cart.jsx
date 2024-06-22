import React, { useEffect, useState } from "react";
import Navbar from "../../components/module/Navbar";
import { Checkbox } from "@material-tailwind/react";
import { formatCurrency } from "../../utils/formatCurrency";
import { toastify } from "../../components/base/toastify";
import API from "../../configs/api";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [selectAll, setSelectAll] = useState(false);
  const [items, setItems] = useState();
  const [selectedCount, setSelectedCount] = useState(0);

  const getCardData = async () => {
    try {
      const response = await API.get("/cart");
      setItems(response?.data?.data[0]);
      console.log(response);
    } catch (error) {
      console.log("Error get cart data: ", error);
    }
  };
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setItems(items.map((item) => ({ ...item, isChecked: newSelectAll })));
  };

  const handleCheckboxChange = async (id, isCheked) => {
    try {
      if (isCheked === false) {
        const res = await API.put(`/cart-detail/cheked/${id}`, {
          isChecked: true,
        });
        toastify("success", res?.data?.message);
      } else {
        const res = await API.put(`/cart-detail/cheked/${id}`, {
          isChecked: false,
        });
        toastify("success", res?.data?.message);
      }

      getCardData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleIncrementQuantity = async (cartId, currentQuantity) => {
    try {
      let newQuantity = currentQuantity + 1;
      const data = { quantity: newQuantity };
      const res = await API.put(`/cart-detail/update/${cartId}`, data);
      getCardData();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDecrementQuantity = async (cartId, currentQuantity) => {
    try {
      let newQuantity = currentQuantity - 1;
      const data = { quantity: newQuantity };
      const res = await API.put(`/cart-detail/update/${cartId}`, data);
      getCardData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCardData();
  }, []);
  return (
    <div>
      <Navbar />
      <div>
        <p className="text-[34px] font-bold font-blanja_metropolis mx-[10%] mt-[50px]">
          My Bag
        </p>
      </div>
      <div className="flex font-blanja_metropolis">
        <div className="w-[720px] ml-[10%] mt-[30px]">
          <div className="flex items-center border border-main-abu rounded-md p-2">
            <div>
              <Checkbox
                id="select-all"
                checked={selectAll}
                onChange={handleSelectAll}
                color="red"
                label=""
              />
            </div>
            <div className="flex-grow flex gap-x-2">
              {" "}
              <p className="font-semibold">Pilih semua barang</p>{" "}
              <div className="text-main-abu">
                ({selectedCount} barang dipilih)
              </div>
            </div>
            <button className="pr-[16px] text-main-red">Delete</button>
          </div>
          {items?.cart_detail?.map((item) => (
            <div
              key={item?.ID}
              className="mt-[10px] border border-main-abu rounded-md flex items-center p-2"
            >
              <Checkbox
                checked={item?.isChecked === true}
                onChange={() => handleCheckboxChange(item?.ID, item?.isChecked)}
                color="red"
              />
              <img
                src={item.Product?.product_image[0]?.image}
                className="w-16 h-16 ml-2"
              />
              <div className="ml-4 flex-grow flex">
                <div className="flex flex-col">
                  <div className="text-xs font-semibold">
                    {item?.Product?.name}
                  </div>
                  <div className="text-xs font-semibold text-main-abu">
                    {item?.Product?.Store?.name}
                  </div>
                  <div className="flex gap-x-2 items-center">
                    <small className="text-gray-500 text-xs">
                      {" "}
                      Size: {item?.size},{" "}
                    </small>
                    <small className="text-gray-500 text-xs">Color: </small>
                    <span
                      className={`w-3 h-3 inline-block rounded-full`}
                      style={{ backgroundColor: item?.color }}
                    ></span>
                  </div>
                </div>
              </div>
              <div className="ml-5 flex items-center">
                <button
                  onClick={() =>
                    handleDecrementQuantity(item?.ID, item?.quantity)
                  }
                  className={`${
                    item?.quantity <= 1 ? "bg-main-abu" : " bg-main-red"
                  }  text-white w-6 h-6 rounded-full mr-2 text-[16px] font-bold`}
                >
                  {" "}
                  &minus;{" "}
                </button>
                <div className="w-3 text-center">{item.quantity}</div>
                <button
                  onClick={() =>
                    handleIncrementQuantity(item?.ID, item?.quantity)
                  }
                  className={
                    "bg-main-red text-white w-6 h-6 rounded-full ml-2 text-[16px] font-bold"
                  }
                >
                  {" "}
                  +{" "}
                </button>
              </div>
              <div className="ml-5 text-base font-semibold pr-[1%] w-28 text-left">
                {formatCurrency(item?.total_price)}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-[30px] w-[370px] h-[180px] ml-[50px] border border-main-abu rounded-md py-4 px-[2%] flex flex-col">
          <p className="text-base font-semibold"> Rangkuman belanja</p>
          <div className="flex-grow flex pt-8">
            <p className="flex-grow">Total price</p>
            <div>
              {items?.total_amout
                ? formatCurrency(items?.total_amout)
                : formatCurrency(0)}
            </div>
          </div>
          <button
            className="bg-main-red text-white w-full h-[36px] rounded-full"
            onClick={() => navigate("/checkout")}
          >
            {" "}
            Buy{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
