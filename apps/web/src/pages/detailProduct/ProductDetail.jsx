import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../../configs/api";
import { toastify } from "../../components/base/toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "../../components/base/card/card";
import { formatCurrency } from "../../utils/formatCurrency";
import { useDispatch, useSelector } from "react-redux";
import { setCheckout } from "../../configs/redux/features/chekoutSlice";

const ProductDetail = ({ product }) => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [selectedSize, setSelectedSize] = useState(null);
  const [myStore, setMyStore] = useState();
  const [selectedColor, setSelectedColor] = useState(null);
  const [purchaseAmount, setPurchaseAmount] = useState(1);
  const dispatch = useDispatch();
  const [mainImage, setMainImage] = useState();
  const navigate = useNavigate();

  const addToCart = async () => {
    if (!token) {
      toastify("error", "You must be logged in first");
      navigate("/login");
      return;
    }
    try {
      const res = await API.post(
        "/cart",
        {
          product_id: product.ID,
          quantity: purchaseAmount,
          size: selectedSize,
          color: selectedColor,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toastify("success", res?.data?.message);
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const handleBuyNow = async () => {
    try {
      const addToCartResponse = await addToCart();
      if (addToCartResponse?.status === 200) {
        const res = await API.get("/cart-detail/active");
        const cartDetails = res?.data?.data;
        if (Array.isArray(cartDetails) && cartDetails.length > 0) {
          const firstItem = cartDetails[0];
          dispatch(setCheckout([[firstItem]]));
          if (firstItem) {
            navigate("/checkout");
          }
        } else {
          dispatch(setCheckout([res?.data?.data]));
          console.log(res?.data?.length);
          if (res?.data?.data?.length > 0) {
            navigate("/checkout");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getStore = async () => {
    try {
      const response = await API.get(`/store/${product?.store_id}`);
      setMyStore(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };

  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };

  const handleIncrease = () => {
    setPurchaseAmount((prevPurchaseAmount) => prevPurchaseAmount + 1);
  };

  const handleDecrease = () => {
    setPurchaseAmount((prevPurchaseAmount) =>
      prevPurchaseAmount > 1 ? prevPurchaseAmount - 1 : 1
    );
  };

  const handleProductDetail = (productId) => {
    navigate(`/product/${productId}`);
    window.location.reload();
  };

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  useEffect(() => {
    getStore();
  }, []);
  useEffect(() => {
    if (product) setMainImage(product?.product_image?.[0]?.image);
  }, [id]);

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="w-full bg-[#ffffff]">
      {/* <div className="flex flex-col items-center gap-[55px] sm:gap-[27px]"></div> */}
      <div className="container md:p-5">
        <div className="flex flex-col items-start">
          <div className="px-[10%]">
            <Link onClick={handleClick}>
              <p size="s" as="p">
                <span className="text-[#9b9b9b]">
                  Home &gt; category &gt; &nbsp;
                </span>
                <span className="font-semibold text-[#9b9b9b] ">
                  {product?.Category?.name}
                </span>
              </p>
            </Link>
            <div className="flex flex-col lg:flex-row mt-[54px] w-[96%] items-start gap-10">
              {/* Image Section */}
              <div className="w-full lg:w-1/2 flex flex-col gap-[17px] md:w-full">
                <img
                  src={mainImage}
                  alt={"Main image"}
                  className="h-[500px] rounded-lg object-cover"
                />
                <div className="flex gap-2.5 md:flex-row lg:flex-row">
                  {product?.product_image?.map((image, index) => (
                    <div key={image?.ID}>
                      <img
                        src={image.image}
                        alt={"content image"}
                        className="h-[90px] rounded-lg object-cover cursor-pointer"
                        onClick={() => handleThumbnailClick(image.image)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Details Section */}
              <div className="w-full lg:w-1/2 md:w-full mt-8 lg:mt-0">
                <div className="flex flex-col items-start">
                  <h1 as="h1">{product?.name}</h1>
                  <p className="text-gray-500 py-2">{myStore?.name}</p>
                  <div className="flex items-center mt-2">
                    {Array.from({ length: 5 }, (_, index) => (
                      <span key={index} className="text-[#FFBA49] text-3xl">
                        ★
                      </span>
                    ))}
                    <p size="xs" as="p" className="self-end !font-normal">
                      (10)
                    </p>
                  </div>
                  <p as="p" className="mt-[29px]">
                    Harga:
                  </p>
                  <p className="text-red-500 text-3xl">
                    {formatCurrency(product?.price)}
                  </p>
                  <p className="text-gray-500">Stock: {product?.stock} pcs</p>
                  <div className="mt-4">
                    <h3 className="text-lg">Color</h3>
                    <div className="flex space-x-2">
                      {product.product_color.map(({ color }) => (
                        <button
                          key={color}
                          className={`w-8 h-8 rounded-full border border-gray-700 ${
                            selectedColor === color
                              ? "ring-2 ring-green-500"
                              : ""
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => handleColorSelection(color)}
                        ></button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-10 mt-5">
                    <div className="mt-4">
                      <h3 className="text-lg">Size</h3>
                      <div className="flex space-x-2">
                        {product?.product_size.map(({ size }) => (
                          <button
                            key={size}
                            className={`w-16 border p-2 ${
                              selectedSize === size
                                ? "bg-red-500 text-white"
                                : ""
                            }`}
                            onClick={() => handleSizeSelection(size)}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg">Jumlah</h3>
                      <div className="flex items-center space-x-2">
                        <button
                          disabled={purchaseAmount <= 1}
                          onClick={handleDecrease}
                          className={` ${
                            purchaseAmount >= 2
                              ? "bg-main-red text-white border gray-200"
                              : "bg-gray-200 border-black"
                          } border w-10 h-10 rounded-full`}
                        >
                          -
                        </button>
                        <span>{purchaseAmount}</span>
                        <button
                          disabled={purchaseAmount == product?.stock}
                          onClick={handleIncrease}
                          className={` ${
                            purchaseAmount < product?.stock
                              ? "bg-main-red text-white border gray-200"
                              : "bg-gray-200 border-black"
                          } border w-10 h-10 rounded-full`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 w-[700px]">
                    <button className="text-black py-2 px-4 mr-2 rounded-full border-2 border-black w-40">
                      Chat
                    </button>
                    <button
                      className="text-black py-2 px-4 mr-2 rounded-full border-2 border-black w-40"
                      onClick={addToCart}
                    >
                      Add to Bag
                    </button>
                    <button
                      className="bg-red-500 text-white py-2 px-4 mr-2 rounded-full w-80"
                      onClick={handleBuyNow}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h1 className="mt-[35px] font-bold text-xl">
                Product Information
              </h1>
              <p className="mt-8 font-bold text-md">Condition</p>
              <p className="text-red-500">{product?.condition}</p>
              <p className="mt-6 font-bold text-md">Description</p>
              <p className="text-gray-500 text-sm">{product?.description}</p>
            </div>
            <div className="mt-8">
              <h1 as="h3">Product review</h1>
              <div className="flex items-center">
                <div className="mr-4">
                  <div className="flex flex-wrap items-center">
                    <p size="xl" as="p" className="!text-[#222222]">
                      5
                    </p>
                    <p
                      size="lg"
                      as="p"
                      className="mb-1.5 self-end !font-normal"
                    >
                      /5
                    </p>
                  </div>
                  <div className="flex mt-2">
                    {Array.from(new Array(5), (_, index) => (
                      <span key={index} className="text-yellow-500 text-3xl">
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center">
                    <div className=" px-2">
                      <span className="text-yellow-500 text-2xl">★</span>
                      <span className="ml-2">5</span>
                    </div>
                    <div className="w-32 h-2 bg-red-500 ml-2 rounded-full"></div>
                    <span className="ml-2 px-2">5</span>
                  </div>
                  <div className="flex items-center">
                    <div className=" px-2">
                      <span className="text-yellow-500 text-2xl">★</span>
                      <span className="ml-2">4</span>
                    </div>
                    <div className="w-32 h-2 bg-white ml-2 rounded-full"></div>
                    <span className="ml-2 px-2">0</span>
                  </div>
                  <div className="flex items-center">
                    <div className=" px-2">
                      <span className="text-yellow-500 text-2xl">★</span>
                      <span className="ml-2">3</span>
                    </div>
                    <div className="w-32 h-2 bg-white ml-2 rounded-full"></div>
                    <span className="ml-2 px-2">0</span>
                  </div>
                  <div className="flex items-center">
                    <div className=" px-2">
                      <span className="text-yellow-500 text-2xl">★</span>
                      <span className="ml-2">2</span>
                    </div>
                    <div className="w-32 h-2 bg-white ml-2 rounded-full"></div>
                    <span className="ml-2 px-2">0</span>
                  </div>
                  <div className="flex items-center">
                    <div className=" px-2">
                      <span className="text-yellow-500 text-2xl">★</span>
                      <span className="ml-2">1</span>
                    </div>
                    <div className="w-32 h-2  ml-2 bg-white rounded-full"></div>
                    <span className="ml-2 px-2">0</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 w-full mt-10 shadow-black"></div>
            <h1 className="font-bold my-10 text-xl">
              Other products in{" "}
              <span className="text-main-red">{myStore?.name}</span>
            </h1>
            {console.log(myStore)}
            <div className="flex gap-x-3">
              {myStore?.product?.map((item) => (
                <Card
                  key={item?.ID}
                  image={item?.product_image[0]?.image}
                  product_name={item?.name || ""}
                  price={`${item?.price}` || ""}
                  store={item?.Store?.name || ""}
                  onClick={() => handleProductDetail(item?.ID)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
