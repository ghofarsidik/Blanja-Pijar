import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../../components/module/Navbar";
import { useEffect, useState } from "react";
import API from "../../configs/api";
import Card from "../../components/base/card/card";
import { MobileNav } from "../../components/module/MobileNav";

export default function SearchPage() {
  const [data, setData] = useState();
  const [currentPage, setCurrenPage] = useState();
  const [mobile, setMobile] = useState(false);
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const categories = query.get("categories");
  const products = query.get("products");
  const stores = query.get("stores");
  const category = query.get("category");
  const size = query.get("size");
  const store = query.get("store");
  const color = query.get("color");
  const getCategory = async () => {
    try {
      const response = await API.get(`/category?name=${categories}`);
      setData(response?.data?.data?.product);
    } catch (error) {
      console.log(error);
    }
  };
  const getProduct = async () => {
    try {
      const response = await API.get(`/products?search=${products}`);
      setData(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getStore = async () => {
    try {
      const response = await API.get(`/store/${stores}`);
      setData(response?.data?.product);
    } catch (error) {
      console.log(error);
    }
  };
  const filterProduct = async () => {
    try {
      const params = new URLSearchParams();
      if (category) {
        params.append("category", category);
      }
      if (size) {
        params.append("size", size);
      }
      if (store) {
        params.append("store", store);
      }
      if (color) {
        params.append("color", color);
      }
      const response = await API.get(`/products/filter?${params.toString()}`);
      setData(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (categories) {
      getCategory();
    } else if (products) {
      getProduct();
    } else if (stores) {
      getStore();
    } else {
      filterProduct();
    }
  }, [products, categories, category, color, size, store]);
  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 800px)");
    const handleResize = () => {
      if (mobile.matches === true) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const uniqueData = [
    ...new Map(data?.map((item) => [item?.name, item])).values(),
  ];

  return (
    <>
      {mobile ? <MobileNav /> : <Navbar />}
      <div className="grid grid-cols-1 gap-y-10 lg:gap-y-0 lg:grid-cols-5 px-[10%] py-5">
        {data?.length > 0 ? (
          uniqueData?.map((item) => (
            <Card
              image={item?.product_image[0]?.image}
              key={item?.ID}
              price={item?.price}
              product_name={item?.name}
              store={item?.Store?.name}
              onClick={() => navigate(`/product/${item?.ID}`)}
            />
          ))
        ) : (
          <p>Product not found</p>
        )}
      </div>
    </>
  );
}
