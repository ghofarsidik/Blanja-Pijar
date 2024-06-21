import React, { useEffect, useState } from "react";
import Dummy from "../../assets/images/dummy/dummy.png";
import Cart from "../../components/base/card/card";
import axios from "axios";
import API from "../../configs/api";
import { toastify } from "../../components/base/toastify";

const ProductDetail = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [myStore, setMyStore] = useState();
  const [selectedColor, setSelectedColor] = useState(null);
  const [purchaseAmount, setPurchaseAmount] = useState(1);
  const [mainImage, setMainImage] = useState(product?.product_image[0]?.image);

  console.log("Product detail:", myStore);

  const addToCart = async () => {
    try {
      const res = await API.post("/cart", {
        product_id: product.ID,
        quantity: purchaseAmount,
        size: selectedSize,
        color: selectedColor,
      });
      toastify("success", res?.data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(product);

  const getStore = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/v1/store/${product?.store_id}`
      );
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

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };
  useEffect(() => {
    getStore();
  }, []);
  return (
    <div className="p-5 mx-[10%]">
      <div className="flex justify-between w-full">
        <div className="w-[30%] flex flex-col items-center">
          <img
            src={mainImage}
            alt={product.title}
            className="w-[500px] object-cover max-h-[350px] rounded"
          />
          <div className="flex mt-2 space-x-2">
            {product?.product_image?.map((image, index) => (
              <div>
                <img
                  key={index}
                  src={image?.image}
                  alt={`Thumbnail ${index}`}
                  className="max-w-20 max-h-20 object-cover cursor-pointer"
                  onClick={() => handleThumbnailClick(image?.image)}
                />
                {console.log(image)}
              </div>
            ))}
          </div>
        </div>
        <div className="">
          <h1 className="text-3xl mb-4">{product?.name}</h1>
          <h1 className="text-black">Store:</h1>
          <p className="text-gray-500">{myStore?.name}</p>
          <h1>Rating:</h1>
          <div className="flex items-center mt-2">
            {Array.from({ length: 4 }, (_, index) => (
              <span key={index} className="text-yellow-500 text-3xl">
                ★
              </span>
            ))}
          </div>
          <h1 className="text-black">Harga:</h1>
          <p className="text-red-500 text-3xl">${product.price}</p>

          <div className="mt-4">
            <h3 className="text-lg">Size</h3>
            <div className="flex space-x-2">
              {product?.product_size.map(({ size }) => (
                <button
                  key={size}
                  className={`w-16 border p-2 ${
                    selectedSize === size ? "bg-red-500 text-white" : ""
                  }`}
                  onClick={() => handleSizeSelection(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-lg">Color</h3>
            <div className="flex space-x-2">
              {product.product_color.map(({ color }) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full border border-gray-700 ${
                    selectedColor === color ? "ring-2 ring-green-500" : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorSelection(color)}
                ></button>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-lg">Jumlah</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleDecrease}
                className="border w-10 h-10 bg-gray-200 rounded-full border-black"
              >
                -
              </button>
              <span>{purchaseAmount}</span>
              <button
                onClick={handleIncrease}
                className="border w-10 h-10 border-black rounded-full"
              >
                +
              </button>
            </div>
          </div>
          <div className="mt-4">
            <button className="text-black py-2 px-4 mr-2 rounded-full border-2 border-black w-40">
              Chat
            </button>
            <button
              className="text-black py-2 px-4 mr-2 rounded-full border-2 border-black w-40"
              onClick={addToCart}
            >
              Add to Bag
            </button>
            <button className="bg-red-500 text-white py-2 px-4 mr-2 rounded-full w-80">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl">Product Information</h2>
        <h1>
          <strong>Condition:</strong>
        </h1>
        <p className="text-red-500">{product.condition}</p>
        <h1>
          <strong>Description:</strong>
        </h1>
        <p>{product.description}</p>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl my-2">
          <strong>Product Review</strong>
        </h2>
        <div className="flex items-center">
          <div className="mr-4">
            <div className="flex items-center">
              <span className="text-6xl font-bold ">{product.reviewScore}</span>
              <span className="text-6x1 text-gray-500 ">/5</span>
            </div>
            <div className="flex mt-2">
              {/* {Array.from(new Array(5), (_, index) => (
                <span key={index} className="text-yellow-500 text-3xl">
                  ★
                </span>
              ))} */}
            </div>
          </div>
          {/* <div>
            <div className="flex items-center">
              <span className="text-yellow-500">★</span>
              <span className="ml-2">5</span>
              <div className="w-24 h-2 bg-red-500 ml-2 rounded-full"></div>
              <span className="ml-2">{product.reviewCount[5]}</span>
            </div>
            <div className="flex items-center">
              <span className="text-yellow-500">★</span>
              <span className="ml-2">4</span>
              <div className="w-24 h-2 bg-red-500 ml-2 rounded-full"></div>
              <span className="ml-2">{product.reviewCount[4]}</span>
            </div>
            <div className="flex items-center">
              <span className="text-yellow-500">★</span>
              <span className="ml-2">3</span>
              <div className="w-24 h-2 bg-red-500 ml-2 rounded-full"></div>
              <span className="ml-2">{product.reviewCount[3]}</span>
            </div>
            <div className="flex items-center">
              <span className="text-yellow-500">★</span>
              <span className="ml-2">2</span>
              <div className="w-24 h-2 bg-red-500 ml-2 rounded-full"></div>
              <span className="ml-2">{product.reviewCount[2]}</span>
            </div>
            <div className="flex items-center">
              <span className="text-yellow-500 ">★</span>
              <span className="ml-2">1</span>
              <div className="w-24 h-2 bg-red-500 ml-2 rounded-full"></div>
              <span className="ml-2">{product.reviewCount[1]}</span>
            </div>
          </div> */}
        </div>
      </div>
      <div className="border-t border-gray-200 w-full my-10 shadow-black"></div>
      <Cart
        image={Dummy}
        product_name="Men's formal suit - Black & White"
        price="$ 40.0"
        store="Zalora Cloth"
      />
    </div>
  );
};

export default ProductDetail;
