import React, { useEffect, useState } from "react";
import Navbar from "../../components/module/Navbar";
import { Checkbox } from "@material-tailwind/react";
import DummyProduct from "../../assets/images/dummy/dummyproduct.png";
import noImage from "../../../src/assets/images/logo/noimage.jpg";
import API from "../../configs/api";

const Cart = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedCount, setSelectedCount] = useState(0);

  useEffect(() => {
    const getCardData = async () => {
      try {
        const response = await API.get("/cart")
        console.log("cart data: ", response);
        const data = response.data.data
        console.log("data tampil :", data);
        console.log("data lagi:", data[0].cart_detail);
        
        const cartFormatItems = data[0].cart_detail.map((item) => ({
          ...item,
          isChecked: false,
          quantity: item.quantity,
          price: item.Product.price,
          name: item.Product.name || "no data",
          brand: item.Product.Store.name || "no data",
          image: item.Product.product_image || noImage,
        }));

        setItems(cartFormatItems);

        // setItems(data[0].cart_detail)
      } catch (error) {
        console.log("Error get cart data: ", error);
      }
    };
    getCardData()
  }, []);

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setItems(items.map((item) => ({ ...item, isChecked: newSelectAll })));
  };

  const handleCheckboxChange = (index) => {
    const newItems = [...items];
    newItems[index].isChecked = !newItems[index].isChecked;
    setItems(newItems);
    setSelectAll(newItems.every((item) => item.isChecked));
  };

  const handleDeleteSelected = () => {
    const newItems = items.filter((item) => !item.isChecked);
    setItems(newItems);
    setSelectAll(false); // Reset the select all checkbox
  };


  const handleQuantityChange = (index, delta) => {
    const newItems = [...items];
    newItems[index].quantity += delta;
    if (newItems[index].quantity < 1) {
      newItems[index].quantity = 1; // Prevent quantity from being less than 1
    }
    setItems(newItems);
  };

  useEffect(() => {
    const total = items
      .filter((item) => item.isChecked)
      .reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);

    const count = items.filter((item) => item.isChecked).length;
    setSelectedCount(count);
  }, [items]);

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
            <button
              className="pr-[16px] text-main-red"
              onClick={handleDeleteSelected}
            >
              Delete
            </button>
          </div>
          {items.map((item, index) => (
            <div
              key={index}
              className="mt-[10px] border border-main-abu rounded-md flex items-center p-2"
            >
              <Checkbox
                checked={item.isChecked}
                onChange={() => handleCheckboxChange(index)}
                color="red"
              />
              <img
                src={item.image}
                alt={`Item ${index + 1}`}
                className="w-16 h-16 ml-2"
              />
              <div className="ml-4 flex-grow flex">
                <div className="flex flex-col">
                  <div className="text-xs font-semibold">{item.name}</div>
                  <div className="text-xs font-semibold text-main-abu">
                    {item.brand}
                  </div>
                </div>
              </div>
              <div className="ml-5 flex items-center">
                <button
                  className="bg-main-abu text-white w-6 h-6 rounded-full mr-2 text-[16px] font-bold"
                  onClick={() => handleQuantityChange(index, -1)}
                >
                  {" "}
                  &minus;{" "}
                </button>
                <div className="w-3 text-center">{item.quantity}</div>
                <button
                  className="bg-main-abu text-white w-6 h-6 rounded-full ml-2 text-[16px] font-bold"
                  onClick={() => handleQuantityChange(index, +1)}
                >
                  {" "}
                  +{" "}
                </button>
              </div>
              <div className="ml-5 text-base font-semibold pr-[1%] w-28 text-left">
                Price: {item.quantity * item.price}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-[30px] w-[370px] h-[180px] ml-[50px] border border-main-abu rounded-md py-4 px-[2%] flex flex-col">
          <p className="text-base font-semibold"> Rangkuman belanja</p>
          <div className="flex-grow flex pt-8">
            <p className="flex-grow">Total price</p>
            <div>{totalPrice}</div>
          </div>
          <button className="bg-main-red text-white w-full h-[36px] rounded-full">
            {" "}
            Buy{" "}
          </button> 
        </div>
      </div>
    </div>
  );
};

export default Cart;
