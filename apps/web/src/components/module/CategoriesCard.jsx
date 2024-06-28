import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import API from "../../configs/api";
import { useMediaQuery } from "react-responsive";

const CategoriesCard = ({ onCategoryClick }) => {
  const [categories, setCategories] = useState([]);
  // const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    API.get("/categories")
      .then((response) => {
        setCategories(response.data?.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  function ButtonPrev({ onClick, next }) {
    return (
      <div
        className={`${
          next
            ? "rotate-180 left-[300px] -top-[110px] lg:-left-[110px] lg:-top-[120px]"
            : "rotate-0 -left-[10px] top-[120px] lg:-left-[241px] lg:top-[102px]"
        } relative h-6 w-6 z-10 lg:z-0`}
      >
        <button
          onClick={onClick}
          className={` w-[52px] h-[52px] flex items-center justify-center bg-white text-main-abu rounded-full hover:bg-gray-400 focus:outline-none absolute`}
          // disabled={currentIndex === 0}
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
      </div>
    );
  }

  const [show, setShow] = useState(1);
  const [padding, setPading] = useState("10px");
  const settings = {
    // dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2000,
    slidesToShow: show,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: padding,
    prevArrow: <ButtonPrev next={false} />,
    nextArrow: <ButtonPrev next={true} />,
  };
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1200px)");
    const tablet = window.matchMedia("(min-width: 800px)");
    const handleResize = () => {
      if (desktop.matches === true) {
        setShow(4);
        setPading("0px");
      } else if (tablet.matches === true) {
        setShow(3);
        setPading("5px");
      } else {
        setShow(1);
        setPading("0px");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [show]);
  return (
    <Slider {...settings}>
      {categories.map((category, index) => (
        <div key={index} onClick={() => onCategoryClick(category)}>
          <img
            key={category?.ID}
            className="w-[250px] h-[220px] lg:w-[180px] lg:h-[220px] cursor-pointer ml-7 lg:ml-0"
            src={category?.image}
            alt={category.name}
          />
        </div>
      ))}
    </Slider>
  );
};

export default CategoriesCard;
