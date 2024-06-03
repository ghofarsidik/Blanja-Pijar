import React, { useState, useEffect } from 'react';
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
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CategoriesComponent from "./CategoriesCard"


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
    return (
    <div className="flex h-[360px] bg-[#F0F1F9] mx-[10%]">
      <div className="w-[259px] ml-[50px] container:ml-[150px]">
        <h1 className="text-4xl font-bold pt-[50px] font-blanja_metropolis">Category</h1>
        <h2 className="text-xs text-abu pt-1">
          What are you currently looking for
        </h2>
        <div className="flex space-x-6 pt-16">
        </div>
      </div>
      <div className=' w-[900px] pt-16'>
      <CategoriesComponent />
      </div>
    </div>
  );
};

export default Categories;
