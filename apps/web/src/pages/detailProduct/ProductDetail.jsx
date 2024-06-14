import React, { useEffect, useState } from "react";
import Dummy from "../../assets/images/dummy/dummy.png";
import Cart from "../../components/base/card/card";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import product1Image from "../../assets/images/detailProduuct/product-1.jpg";
import product2Image from "../../assets/images/detailProduuct/product-2.jpg";
import product3Image from "../../assets/images/detailProduuct/product-3.jpg";
import product4Image from "../../assets/images/detailProduuct/product-4.jpg";
import { Text, Heading, Button } from "../../components/DetailProductC";

const defaultData = [
  { thumbnailImage: product1Image },
  { thumbnailImage: product2Image },
  { thumbnailImage: product3Image },
  { thumbnailImage: product4Image },
  { thumbnailImage: product1Image },
];

const defaultColors = [
  { color: "#ffff" },
  { color: "#d74141" },
  { color: "#418fd7" },
  { color: "#41d76b" },
];

const ProductDetail = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [myStore, setMyStore] = useState();
  const [selectedColor, setSelectedColor] = useState(null);
  const [purchaseAmount, setPurchaseAmount] = useState(1);
  const [mainImage, setMainImage] = useState(product?.product_image?.[0]?.image || defaultData[0].thumbnailImage);
  const navigate = useNavigate();

  const getStore = async () => {
    try {
      const response = await axios.get(
        `https://blanja-kelompok-1-production.up.railway.app/v1/store/${product?.store_id}`
      );
      setMyStore(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const formattedPrice = product?.price
    ? new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(product.price)
    : "RP 0";

  const condition = product?.condition?.toUpperCase() || "";

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

  const handleClick = () => {
    navigate('/');
  };

  const productImages = product?.product_image?.length > 0 ? product.product_image : defaultData.map(item => ({ image: item.thumbnailImage }));
  const productColors = product?.colors?.length > 0 ? product.colors : defaultColors.map(item => item.color);

  return (
    <div className="w-full bg-[#ffffff]">
      <div className="flex flex-col items-center gap-[55px] sm:gap-[27px]">
        <div className="container-xs md:p-5">
          <div className="flex flex-col items-start">
            <div className="p-5 mx-[10%]">
              <Link onClick={handleClick}>
                <Text size="s" as="p">
                  <span className="text-[#9b9b9b]">Home &gt; category &gt; &nbsp;</span>
                  <span className="font-semibold text-[#9b9b9b] ">T-Shirt</span>
                </Text>
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
                    {productImages.map((image, index) => (
                      <div key={index}>
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
                    <Heading as="h1">{product?.name}</Heading>
                    <Text className="text-gray-500 py-2">{myStore?.name}</Text>
                    <div className="flex items-center mt-2">
                      {Array.from({ length: 5 }, (_, index) => (
                        <span key={index} className="text-yellow-500 text-3xl">★</span>
                      ))}
                      <Text size="xs" as="p" className="self-end !font-normal">
                        (10)
                      </Text>
                    </div>
                    <Text as="p" className="mt-[29px]">
                      Harga:
                    </Text>
                    <p className="text-red-500 text-3xl">{formattedPrice}</p>

                    <div className="mt-4">
                      <Heading size="xs" as="h4">
                        Size
                      </Heading>
                      <div className="flex space-x-2">
                        {["S", "M", "L", "XL"].map((size) => (
                          <button
                            key={size}
                            className={`w-16 border p-2 ${selectedSize === size ? "bg-red-500 text-white" : ""
                              }`}
                            onClick={() => handleSizeSelection(size)}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4">
                      <Heading size="xs" as="h3" className="ml-[5px] mt-[41px] md:ml-0">
                        Color
                      </Heading>
                      <div className="flex space-x-2">
                        {productColors.map((color, index) => (
                          <button
                            key={index}
                            className={`w-8 h-8 rounded-full ${selectedColor === color ? "ring-2 ring-[red]" : ""
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
                    <div className="mt-[47px] flex gap-2.5 flex-wrap self-stretch ">
                      <Button className="flex h-[48px] min-w-[80px] flex-row items-center justify-center rounded-[24px] border border-solid border-[#222222] px-[35px] text-center text-sm font-medium text-[#222222]  sm:px-5">
                        Chat
                      </Button>
                      <Button className="flex h-[48px] min-w-[80px] flex-row items-center justify-center rounded-[24px] border border-solid border-[#222222] px-[35px] text-center text-sm font-medium text-[#222222] sm:px-5">
                        Add bag
                      </Button>
                      <Button className="flex h-[48px] flex-grow flex-row items-center justify-center rounded-[24px] bg-[#db3022] px-[35px] text-center text-sm font-medium text-[#ffffff] sm:px-5">
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Heading as="h6" className="mt-[35px]">Informasi Produk</Heading>
                <Heading size="s" as="h5" className="mt-10">Condition</Heading>
                <p className="text-red-500">{condition}</p>
                <Heading size="s" as="h5" className="mt-10">Description</Heading>
                <p>{product?.description}</p>
              </div>
              <div className="mt-8">
                <Heading as="h3">Product review</Heading>
                <div className="flex items-center">
                  <div className="mr-4">
                    <div className="flex flex-wrap items-center">
                      <Text size="xl" as="p" className="!text-[#222222]">5</Text>
                      <Text size="lg" as="p" className="mb-1.5 self-end !font-normal">/5</Text>
                    </div>
                    <div className="flex mt-2">
                      {Array.from(new Array(5), (_, index) => (
                        <span key={index} className="text-yellow-500 text-3xl">★</span>
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
              <div className="border-t border-gray-200 w-full my-10 shadow-black"></div>
              <Cart
                image={Dummy}
                product_name="Men's formal suit - Black & White"
                price="$ 40.0"
                store="Zalora Cloth"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
