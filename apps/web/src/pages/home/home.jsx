import Navbar from "../../components/module/Navbar";
import NoImage from "../../assets/images/logo/noimage.jpg";
import Card from "../../components/base/card/card";
import Jumbotron from "../../components/module/Jumbotron";
import Categories from "../../components/module/Categories";
import { Recommendation } from "../../components/module/recommendation";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../configs/api";

const Home = () => {
  const navigate = useNavigate();
  const [newProducts, setNewProducts] = useState([]);
  const [usedProducts, setUsedProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const getNewData = async () => {
    try {
      const response = await API.get("/products/filter?limit=10&condition=new");
      setNewProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNewData();
  }, []);

  useEffect(() => {
    const getUsedData = async () => {
      try {
        const response = await API.get(
          "/products/filter?limit=10&condition=used"
        );
        // console.log("used data: ", response);
        setUsedProducts(response.data.data);
      } catch (error) {
        console.log("Error fetching used products:", error);
      }
    };

    getUsedData();
  }, []);

  const handleProductDetail = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedCategory(null);
    if (query) {
      const getSearchResult = async () => {
        const response = await API.get(`/products?search=${query}`);
        console.log("search data: ", response);
        setSearchResults(response.data.data);
      };

      getSearchResult();
    } else {
      setSearchResults([]);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    // console.log(category.name);
    const getCategoryData = async () => {
      const response = await API.get(`/category/${category.ID}`);
      console.log("category data: ", response);
      setSearchResults(response.data.data.product);
    };

    getCategoryData();
  };

  return (
    <div className="container mx-auto mb-10">
      <Navbar onSearch={handleSearch} />
      {searchQuery || selectedCategory ? (
        <Recommendation
          title={
            searchQuery
              ? `Search Results for "${searchQuery}"`
              : selectedCategory
              ? `Category Results for "${selectedCategory.name}"`
              : "Category Results"
          }
        >
          {searchResults.length > 0 ? (
            searchResults.map((product, index) => (
              <Card
                key={index}
                image={product?.product_image[0]?.image || NoImage}
                product_name={product?.name || ""}
                price={`${product?.price}` || ""}
                store={product?.Store?.name || ""}
                onClick={() => handleProductDetail(product.ID)}
              />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </Recommendation>
      ) : (
        <>
          <Jumbotron />
          <Categories
            onCategoryClick={handleCategoryClick}
            categories={Categories}
          />
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
        </>
      )}
    </div>
  );
};

export default Home;
