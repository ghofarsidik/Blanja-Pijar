import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tshirt from "../../assets/images/categories/t-shirt.png";
import Shorts from "../../assets/images/categories/shorts.png";
import Pants from "../../assets/images/categories/pants.png";
import Jacket from "../../assets/images/categories/jacket.png";

const categoriesImages = {
  "T-Shirt": Tshirt,
  "Shorts": Shorts,
  "Pants": Pants,
  "Jacket": Jacket,
};

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/cat')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
        //data dummy 
        setCategories([
          { id: 1, name: 'T-Shirt' },
          { id: 2, name: 'Shorts' },
          { id: 3, name: 'Pants' },
          { id: 4, name: 'Jacket' }
        ]);
      });
  }, []);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < categories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="flex h-[360px]">
      <div className="w-[259px] ml-[50px] container:ml-[150px]">
        <h1 className="text-4xl font-bold pt-[50px] font-blanja_metropolis">Category</h1>
        <h2 className="text-xs text-abu pt-1">
          What are you currently looking for
        </h2>
        <div className="flex space-x-6 pt-16">
          <button
            onClick={handlePrev}
            className="w-[52px] h-[52px] flex items-center justify-center bg-gray-300 text-black rounded-full hover:bg-gray-400 focus:outline-none"
            disabled={currentIndex === 0}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="w-[52px] h-[52px] flex items-center justify-center bg-gray-300 text-black rounded-full hover:bg-gray-400 focus:outline-none"
            disabled={currentIndex === categories.length - 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-4 overflow-hidden">
        {categories.slice(currentIndex, currentIndex + 4).map((category, index) => (
          <img
            key={index}
            className="w-[206px] h-[220px]"
            src={categoriesImages[category.name]}
            alt={category.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
