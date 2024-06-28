import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import product1Image from "../../assets/images/detailProduuct/product-1.jpg";
import product2Image from "../../assets/images/detailProduuct/product-2.jpg";
import product3Image from "../../assets/images/detailProduuct/product-3.jpg";
import product4Image from "../../assets/images/detailProduuct/product-4.jpg";
import ProductDetail from "../detailProduct/ProductDetail";
import Navbar from "../../components/module/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import API from "../../configs/api";

const products = [
  {
    id: 1,
    title: "Baju muslim pria",
    mainImage: product1Image,
    images: [product2Image, product3Image, product4Image, product1Image],
    store: "Zalora Cloth",
    price: 20.0,
    rating: 4,
    colors: ["black", "blue", "red", "green"],
    condition: "NEW",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.

    Donec non magna rutrum, pellentesque augue eu, sagittis velit. Phasellus quis laoreet dolor. Fusce nec pharetra quam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent sed enim vel turpis blandit imperdiet ac ac felis. Etiam tincidunt tristique placerat. Pellentesque a consequat mauris, vel suscipit ipsum. 
    Donec ac mauris vitae diam commodo vehicula. Donec quam elit, sollicitudin eu nisl at, ornare suscipit magna.
    
    Donec non magna rutrum, pellentesque augue eu, sagittis velit. Phasellus quis laoreet dolor. Fusce nec pharetra quam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent sed enim vel turpis blandit imperdiet ac ac felis.
    
    In ultricies rutrum tempus. Mauris vel molestie orci.`,
    quantity: 10,
    reviewScore: 5.0,
    reviewCount: {
      5: 3,
      4: 4,
      3: 2,
      2: 1,
      1: 2,
    },
  },
];

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  console.log(product);
  const getDetailProduct = async () => {
    try {
      const response = await API.get(`/product/${id}`);
      setProduct(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetailProduct();
  }, [id]);

  return (
    <div>
      <Navbar />
      {product ? <ProductDetail product={product} /> : <p>Product not found</p>}
    </div>
  );
};

export default ProductDetailPage;
