import React, { useEffect, useState } from "react";
import Navbar from "../../components/module/Navbar";
import { Checkbox } from "@material-tailwind/react";
import { formatCurrency } from "../../utils/formatCurrency";
import { toastify } from "../../components/base/toastify";
import API from "../../configs/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCheckout } from "../../configs/redux/features/chekoutSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectAll, setSelectAll] = useState(false);
  const [data, setData] = useState();
  const [items, setItems] = useState();
  const [selectedCount, setSelectedCount] = useState(0);
  const getCardData = async () => {
    try {
      const response = await API.get("/cart");
      console.log(response?.data?.data[0]?.cart_detail);
      setItems(response?.data?.data[0]);
      setData(response?.data?.data);
      const active = response?.data?.data?.map(({ cart_detail }) => {
        return cart_detail?.filter((item) => item?.isChecked == true);
      });
      dispatch(setCheckout(active));
      setSelectedCount(active[0]?.length);
      if (
        response?.data?.data[0]?.cart_detail?.length === active[0]?.length &&
        response?.data?.data[0]?.cart_detail
      ) {
        setSelectAll(true);
      } else {
        setSelectAll(false);
      }
    } catch (error) {
      console.log("Error get cart data: ", error);
    }
  };
  const handleSelectAll = async (check) => {
    const allIDs = [];
    data?.forEach(({ cart_detail }) => {
      cart_detail.forEach(({ ID }) => {
        allIDs.push(ID);
      });
    });
    const req = {
      id: allIDs,
      checked: check,
    };
    try {
      await API.put("/cart-detail/allcheked", req);
      getCardData();
    } catch (error) {
      console.log(error);
    }
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
        console.log(res);
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
      if (currentQuantity === 1) {
        const res = await API.delete(`/cart-detail/${cartId}`);
      } else {
        let newQuantity = currentQuantity - 1;
        const data = { quantity: newQuantity };
        const res = await API.put(`/cart-detail/update/${cartId}`, data);
      }
      getCardData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCardData();
  }, []);
  useEffect(() => {
    const deleteCart = async () => {
      if (items?.cart_detail?.length < 1) {
        try {
          await API.delete(`/cart/${items?.ID}`);
        } catch (error) {
          console.error("Failed to delete cart:", error);
        }
      }
    };

    deleteCart();
  }, [items?.cart_detail?.length]);
  return (
    <div>
      <Navbar />
      <div>
        <p className="text-[34px] font-bold font-blanja_metropolis mx-[10%] mt-[50px]">
          My Bag
        </p>
      </div>
      <div className="flex flex-col px-5 lg:px-0 lg:flex-row font-blanja_metropolis">
        <div className="w-[550px] lg:w-[720px] lg:ml-[10%] lg:mt-[30px]">
          <div className="flex items-center border border-main-abu rounded-md p-2">
            <div>
              <Checkbox
                id="select-all"
                checked={selectAll}
                onChange={(e) => handleSelectAll(e?.target?.checked)}
                color="red"
                label=""
              />
            </div>
            <div className="flex-grow flex gap-x-2">
              {" "}
              <p className="font-semibold">Select all items</p>{" "}
              <div className="text-main-abu">
                ({selectedCount} items selected)
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
                src={
                  item?.Product?.product_image &&
                  item.Product?.product_image[0]?.image
                }
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
        <div className="w-[550px] fixed bottom-10 lg:static lg:mt-[30px] lg:w-[370px] h-[180px] lg:ml-[150px] border border-main-abu rounded-md py-4 px-[2%] flex flex-col">
          <p className="text-base font-semibold">Shopping summary</p>
          <div className="flex-grow flex pt-8">
            <p className="flex-grow">Total price</p>
            <div>
              {items?.total_amout
                ? formatCurrency(items?.total_amout)
                : formatCurrency(0)}
            </div>
          </div>
          <button
            disabled={
              items?.total_amout === 0 && items?.total_amout === undefined
            }
            className={`${
              items?.total_amout === 0 || items?.total_amout === undefined
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-main-red cursor-pointer"
            } text-white w-full h-[36px] rounded-full`}
            onClick={() => navigate("/checkout")}
          >
            {console.log(items?.total_amout)}
            Buy{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
