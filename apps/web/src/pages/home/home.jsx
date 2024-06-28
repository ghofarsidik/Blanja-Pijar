import Navbar from "../../components/module/Navbar";
import NoImage from "../../assets/images/logo/noimage.jpg";
import Card from "../../components/base/card/card";
import Jumbotron from "../../components/module/Jumbotron";
import Categories from "../../components/module/Categories";
import { Recommendation } from "../../components/module/recommendation";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../configs/api";
import { MobileNav } from "../../components/module/MobileNav";

const Home = () => {
  const navigate = useNavigate();
  const [newProducts, setNewProducts] = useState([]);
  const [usedProducts, setUsedProducts] = useState([]);
  const [mobile, setMobile] = useState(false);

  const handleProductDetail = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleCategoryClick = async (category) => {
    navigate(`/search?categories=${category?.name}`);
  };
  useEffect(() => {
    const getUsedData = async () => {
      try {
        const response = await API.get(
          "/products/filter?limit=10&condition=used"
        );
        setUsedProducts(response.data.data);
      } catch (error) {
        console.log("Error fetching used products:", error);
      }
    };
    const getNewData = async () => {
      try {
        const response = await API.get(
          "/products/filter?limit=10&condition=new"
        );
        setNewProducts(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUsedData();
    getNewData();
  }, []);
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

  return (
    <div className="container mx-auto mb-10">
      {mobile ? <MobileNav /> : <Navbar />}
      <Jumbotron />
      <div className="ml-4">
        <Categories
          onCategoryClick={handleCategoryClick}
          categories={Categories}
        />
      </div>
      <Recommendation title="New" desc="You've never seen it before!">
        {newProducts.map((product, index) => (
          <Card
            key={index}
            image={product?.product_image[0]?.image || NoImage}
            product_name={product?.name || ""}
            price={`${product?.price}` || ""}
            store={product?.Store?.name || ""}
            onClick={() => handleProductDetail(product.ID)}
          />
        ))}
      </Recommendation>
      <Recommendation
        title="Used"
        desc="Find clothes that are trending recently"
      >
        {usedProducts.map((product, index) => (
          <Card
            key={index}
            image={product?.product_image[0]?.image || NoImage}
            product_name={product?.name || ""}
            price={`${product?.price}` || ""}
            store={product?.Store?.name || ""}
            onClick={() => handleProductDetail(product.ID)}
          />
        ))}
      </Recommendation>
    </div>
  );
};

export default Home;
