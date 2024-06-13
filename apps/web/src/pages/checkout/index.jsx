import axios from "axios";
import Navbar from "../../components/module/Navbar";
import { useState } from "react";
import useSnap from "../../hooks/useSnap";

export default function CheckoutPage() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState({
    quantity: 2,
    shipping_address: "Jalan kemana saja",
    product_id: 9,
    payment_method: "transfer",
  });
  const { snapEmbed } = useSnap();

  const pay = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/v1/transaction`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);
      if (response?.status === 200) {
        window.snap.pay(response?.data?.token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <Navbar />
      <div className="px-[10%] py-8">
        <h1 className="font-bold text-3xl">Checkout</h1>
        <p className="mt-5 text-gray-700">Shipping address</p>
        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-2 w-2/3">
            <div className="border border-gray-600 w-full h-[200px]"></div>
            <div className="border border-gray-600 w-full h-[150px]"></div>
            <div className="border border-gray-600 w-full h-[150px]"></div>
          </div>
          <div className="flex flex-col gap-2 w-1/4">
            <div className="border border-gray-600 w-full h-[250px] py-2 px-3">
              <h1 className="font-semibold mb-5">Shopping summary</h1>
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500 mb-3">Price</p>
                  <p className="text-gray-500 mb-3">Quantity</p>
                </div>
                <div className="text-end font-semibold">
                  <p className="mb-3">$1.52</p>
                  <p className="mb-3">{data?.quantity}</p>
                </div>
              </div>

              <div className="border-t border-gray-300 mt-5">
                <div className="flex justify-between mt-2">
                  <h1>Shopping summary</h1>
                  <p className="text-main-red font-semibold">
                    ${data?.quantity * 1.52}
                  </p>
                </div>
                <button
                  className="bg-main-red rounded-full w-full text-white py-1 mt-7"
                  onClick={pay}
                >
                  Select payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
