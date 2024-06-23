import React, { useState, useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CategoriesComponent from "./CategoriesCard"
import axios from 'axios';


const Categories = ({onCategoryClick}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/cat")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        //data dummy
        setCategories([
          { id: 1, name: "T-Shirt" },
          { id: 2, name: "Shorts" },
          { id: 3, name: "Pants" },
          { id: 4, name: "Jacket" },
          { id: 5, name: "Accessories" },
          { id: 6, name: "Bagpack" },
          { id: 7, name: "Cap" },
          { id: 8, name: "Dress" },
          { id: 9, name: "FormalSuits" },
          { id: 10, name: "Glasses" },
          { id: 11, name: "Handbag" },
          { id: 12, name: "HighHeels" },
          { id: 13, name: "Shoes" },
          { id: 14, name: "Socks" },
          { id: 15, name: "Tie" },
          { id: 16, name: "WristWatch" },
        ]);
      });
  }, []);

    return (
    <div className="flex h-[360px] bg-[#F0F1F9] mx-[10%]">
      <div className="w-[259px] ml-[50px] container:ml-[150px]">
        <h1 className="text-4xl font-bold pt-[50px] font-blanja_metropolis">Category</h1>
        <h2 className="text-xs text-gray-500 pt-1">
          What are you currently looking for
        </h2>
        <div className="flex space-x-6 pt-16">
        </div>
      </div>
      <div className='w-[900px] pt-16 flex-grow'>
      <CategoriesComponent onCategoryClick={onCategoryClick} categories={categories} />
      </div>
    </div>
  );
};

export default Categories;
