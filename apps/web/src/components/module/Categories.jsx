import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CategoriesComponent from "./CategoriesCard";

const Categories = ({ onCategoryClick }) => {
  const [categories, setCategories] = useState([]);

  return (
    <div className="flex flex-col lg:flex-row lg:h-[360px] bg-white lg:bg-[#F0F1F9] mx-[10%]">
      <div className="text-start lg:text-start lg:w-[259px] lg:ml-[50px] container:ml-[150px]">
        <h1 className="text-4xl font-bold pt-[50px] font-blanja_metropolis">
          Category
        </h1>
        <h2 className="text-base lg:text-xs text-gray-500 pt-1">
          What are you currently looking for
        </h2>
        <div className="hidden lg:flex space-x-6 pt-16"></div>
      </div>
      <div className="w-[300px] lg:w-[900px] lg:pt-16">
        <CategoriesComponent
          onCategoryClick={onCategoryClick}
          categories={categories}
        />
      </div>
    </div>
  );
};

export default Categories;
