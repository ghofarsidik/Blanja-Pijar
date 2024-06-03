import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tshirt from "../../assets/images/categories/t-shirt.png";
import Shorts from "../../assets/images/categories/shorts.png";
import Pants from "../../assets/images/categories/pants.png";
import Jacket from "../../assets/images/categories/jacket.png";
import Accessories from "../../assets/images/categories/accessories.png";
import Bagpack from "../../assets/images/categories/bagpack.png";
import Cap from "../../assets/images/categories/cap.png";
import Dress from "../../assets/images/categories/dress.png";
import FormalSuit from "../../assets/images/categories/formalsuit.png";
import Glasses from "../../assets/images/categories/glasses.png";
import Handbag from "../../assets/images/categories/handbag.png";
import HighHeels from "../../assets/images/categories/highheels.png";
import Shoes from "../../assets/images/categories/shoes.png";
import Socks from "../../assets/images/categories/socks.png";
import Tie from "../../assets/images/categories/tie.png";
import WristWatch from "../../assets/images/categories/wristwatch.png";
import "./Categories.css"

const categoriesImages = {
  "T-Shirt": Tshirt,
  "Shorts": Shorts,
  "Pants": Pants,
  "Jacket": Jacket,
  "Accessories": Accessories,
  "Bagpack": Bagpack,
  "Cap" : Cap,
  "Dress" : Dress,
  "FormalSuits": FormalSuit,
  "Glasses": Glasses,
  "Handbag": Handbag,
  "HighHeels": HighHeels,
  "Shoes": Shoes,
  "Socks": Socks,
  "Tie": Tie,
  "WristWatch": WristWatch
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
          { id: 4, name: 'Jacket' },
          { id: 5, name: 'Accessories' },
          { id: 6, name: 'Bagpack' },
          { id: 7, name: 'Cap' },
          { id: 8, name: 'Dress' },
          { id: 9, name: 'FormalSuits' },
          { id: 10, name: 'Glasses' },
          { id: 11, name: 'Handbag' },
          { id: 12, name: 'HighHeels' },
          { id: 13, name: 'Shoes' },
          { id: 14, name: 'Socks' },
          { id: 15, name: 'Tie' },
          { id: 16, name: 'WristWatch' }
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
    <div className="flex h-[360px] bg-[#F0F1F9] mx-[10%]">
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
            disabled={currentIndex === categories.length - 5}
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
