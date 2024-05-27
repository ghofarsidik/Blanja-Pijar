import Navbar from "../../components/module/Navbar";
import Dummy from "../../assets/images/dummy/dummy.png";
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

  useEffect(() => {
    // API.get('/products/filter?limit=10&condition=new')
    fetch("http://localhost:3000/v1/products/filter?limit=10&condition=new")
      .then((response) => response.json())
      .then((data) => setNewProducts(data.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    // API.get('/products')
    fetch("http://localhost:3000/v1/products/filter?limit=10&condition=used")
      .then((response) => response.json())
      .then((data) => setUsedProducts(data.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleProductDetail = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      // API.get(`/products/filter?search=${query}`)
      fetch(`http://localhost:3000/v1/products?search=${query}`)
      .then((response) => response.json())
      .then((data) => setSearchResults(data.data))
      .catch((error) => console.error("Error fetching search results:", error));
  } else {
    setSearchResults([]);
  }
  };

  return (
    <div className="container mx-auto mb-10">
      <Navbar onSearch={handleSearch} />
      {searchQuery ? (
        <Recommendation
          title="Search Results"
          desc={`Results for "${searchQuery}"`}
        >
          {searchResults.length > 0 ? (
            searchResults.map((product, index) => (
              <Card
                key={index}
                image={product?.product_image[0]?.image || NoImage}
                product_name={product?.name || ""}
                price={`$${product?.price}` || ""}
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
          <Categories />
          <Recommendation title="New" desc="You've never seen it before!">
            {newProducts.map((product, index) => (
              <Card
                key={index}
                image={product?.product_image[0]?.image || NoImage}
                product_name={product?.name || ""}
                price={`$${product?.price}` || ""}
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
                price={`$${product?.price}` || ""}
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
