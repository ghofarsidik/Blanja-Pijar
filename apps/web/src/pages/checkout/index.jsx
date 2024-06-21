import axios from "axios";
import Navbar from "../../components/module/Navbar";
import { useState } from "react";
import useSnap from "../../hooks/useSnap";
import Modal from "react-modal";
import DummyImage from "../../assets/images/dummy/dummy.png";
import GopayImage from "../../assets/images/payment/gopay.png";  // Assume you have this image
import PosIndonesiaImage from "../../assets/images/payment/posindonesia.png";  // Assume you have this image
import MastercardImage from "../../assets/images/payment/mastercard.png";  // Assume you have this image
import "./modal.css";
import API from "../../configs/api";
import { useDispatch } from "react-redux";
import { setTokenPayment } from "../../configs/redux/features/userSlice";
import { setValue } from "../../configs/redux/features/paymentSlice";

Modal.setAppElement("#root");

export default function CheckoutPage() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [data, setData] = useState({
    quantity: 2,
    shipping_address: "Jalan kemana saja",
    product_id: 1,
    payment_method: "transfer",
  });
  const { snapEmbed } = useSnap();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [paymentModalIsOpen, setPaymentModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const openPaymentModal = () => setPaymentModalIsOpen(true);
  const closePaymentModal = () => setPaymentModalIsOpen(false);

  const pay = async () => {
    try {
      const response = await API.post(`/transaction`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      dispatch(setValue(response?.data));
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
        <p className="mt-5 text-gray-700">Shipping Address</p>
        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-2 w-2/3">
            <div className="border border-gray-300 rounded-lg p-4">
              <h2 className="font-semibold">Andreas Jane</h2>
              <p className="text-gray-600">
                Perumahan Sapphire Mediterania, Wiradadi, Kec. Sokaraja, Kabupaten Banyumas, Jawa Tengah, 53181 [Tokopedia Note: blok c 16] Sokaraja, Kab. Banyumas, 53181
              </p>
              <button
                onClick={openModal}
                className="mt-4 border border-gray-500 px-4 py-2 rounded-full"
              >
                Choose another address
              </button>
            </div>
            <div className="border border-gray-300 rounded-lg p-4 flex items-center gap-4">
              <img src={DummyImage} alt="Men's formal suit - Black" className="w-20 h-20 object-cover rounded" />
              <div>
                <h3 className="font-semibold">Men's formal suit - Black</h3>
                <p className="text-gray-500">Zalora Cloth</p>
                <p className="font-semibold">Rp 25.000,00</p>
              </div>
            </div>
            <div className="border border-gray-300 rounded-lg p-4 flex items-center gap-4">
              <img src={DummyImage} alt="Men's Jacket jeans" className="w-20 h-20 object-cover rounded" />
              <div>
                <h3 className="font-semibold">Men's Jacket jeans</h3>
                <p className="text-gray-500">Zalora Cloth</p>
                <p className="font-semibold">Rp 25.000,00</p>
              </div>
            </div>
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
                  <p className="mb-3">Rp 25.000</p>
                  <p className="mb-3">{data?.quantity}</p>
                </div>
              </div>

              <div className="border-t border-gray-300 mt-5">
                <div className="flex justify-between mt-2">
                  <h1>Shopping summary</h1>
                  <p className="text-main-red font-semibold">
                    Rp{data?.quantity * 25000}
                  </p>
                </div>
                <button
                  className="bg-main-red rounded-full w-full text-white py-1 mt-7"
                  onClick={openPaymentModal}
                >
                  Select payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Choose another address"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2 className="font-bold text-2xl mb-4">Choose another address</h2>
        <div className="border border-gray-300 rounded-lg p-4 mb-4 cursor-pointer">
          <h3 className="font-semibold">Add new address</h3>
        </div>
        <div className="border border-red-500 rounded-lg p-4 mb-4">
          <h3 className="font-semibold">Andreas Jane</h3>
          <p className="text-gray-600">
            Perumahan Sapphire Mediterania, Wiradadi, Kec. Sokaraja, Kabupaten Banyumas, Jawa Tengah, 53181 [Tokopedia Note: blok c 16] Sokaraja, Kab. Banyumas, 53181
          </p>
          <button className="mt-4 text-main-red">Change address</button>
        </div>
      </Modal>

      <Modal
        isOpen={paymentModalIsOpen}
        onRequestClose={closePaymentModal}
        contentLabel="Payment"
        className="Modal payment-modal"
        overlayClassName="Overlay"
      >
        <h1 className="font-bold text-2xl mb-4">Payment</h1>
        <h2 className="text-2xl mb-4">Payment method:</h2>
        <div className="payment-method">
          <img src={GopayImage} alt="Gopay" />
          <span>Gopay</span>
          <input type="radio" name="paymentMethod" value="Gopay" />
        </div>
        <div className="payment-method">
          <img src={PosIndonesiaImage} alt="Pos Indonesia" />
          <span>Pos Indonesia</span>
          <input type="radio" name="paymentMethod" value="Pos Indonesia" />
        </div>
        <div className="payment-method">
          <img src={MastercardImage} alt="Mastercard" />
          <span>Mastercard</span>
          <input type="radio" name="paymentMethod" value="Mastercard" />
        </div>
        <div className="payment-summary">
          <div>
            <span>Order</span>
            <span>Rp 50.000,00</span>
          </div>
          <div>
            <span>Delivery</span>
            <span>Rp 5.000,00</span>
          </div>
          <div className="total">
            <span>Shopping summary</span>
            <span>Rp 55.000,00</span>
          </div>
          <button
            className="bg-main-red rounded-full w-full text-white py-1 mt-7"
            onClick={pay}
          >
            Buy
          </button>
        </div>
      </Modal>
    </main>
  );
}
