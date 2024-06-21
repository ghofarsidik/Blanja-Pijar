import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../../configs/api";
import { toastify } from "../../components/base/toastify";
import { useNavigate } from "react-router-dom";

const ProductDetail = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [myStore, setMyStore] = useState();
  const [selectedColor, setSelectedColor] = useState(null);
  const [purchaseAmount, setPurchaseAmount] = useState(1);
  const [mainImage, setMainImage] = useState(
    product?.product_image?.[0]?.image || defaultData[0].thumbnailImage
  );
  const navigate = useNavigate();

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

  const handleProductDetail = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  useEffect(() => {
    getStore();
  }, []);

  const handleClick = () => {
    navigate("/");
  };

  const productImages =
    product?.product_image?.length > 0
      ? product.product_image
      : defaultData.map((item) => ({ image: item.thumbnailImage }));
  const productColors =
    product?.colors?.length > 0
      ? product.colors
      : defaultColors.map((item) => item.color);

  return (
    <div className="w-full bg-[#ffffff]">
      <div className="flex flex-col items-center gap-[55px] sm:gap-[27px]">
        <div className="container-xs md:p-5">
          <div className="flex flex-col items-start">
            <div className="p-5 mx-[10%]">
              <Link onClick={handleClick}>
                <Text size="s" as="p">
                  <span className="text-[#9b9b9b]">
                    Home &gt; category &gt; &nbsp;
                  </span>
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
                        <span key={index} className="text-yellow-500 text-3xl">
                          ★
                        </span>
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
              </div>
              <div className="mt-8">
                <Heading as="h6" className="mt-[35px]">
                  Informasi Produk
                </Heading>
                <Heading size="s" as="h5" className="mt-10">
                  Condition
                </Heading>
                <p className="text-red-500">{condition}</p>
                <Heading size="s" as="h5" className="mt-10">
                  Description
                </Heading>
                <p>{product?.description}</p>
              </div>
              <div className="mt-8">
                <Heading as="h3">Product review</Heading>
                <div className="flex items-center">
                  <div className="mr-4">
                    <div className="flex flex-wrap items-center">
                      <Text size="xl" as="p" className="!text-[#222222]">
                        5
                      </Text>
                      <Text
                        size="lg"
                        as="p"
                        className="mb-1.5 self-end !font-normal"
                      >
                        /5
                      </Text>
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
              <div className="border-t border-gray-200 w-full my-10 shadow-black"></div>
              <Card
                key={product?.ID}
                image={product?.product_image[0]?.image || NoImage}
                product_name={product?.name || ""}
                price={`${product?.price}` || ""}
                store={product?.Store?.name || ""}
                onClick={() => handleProductDetail(product?.ID)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
