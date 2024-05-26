import PromotionCard from "../../assets/images/jumbotron/Card Promotion.png";
import { useEffect, useState } from "react";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const jumbotronImage = {
  promotionCard: PromotionCard,
};

const Jumbotron = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "https://fakestoreapi.com/products/categories"
        );
        const fetchedImages = response.data;
        if (fetchedImages && fetchedImages.length > 0) {
          setImages(fetchedImages);
        } else {
          setImages([{ url: "promotionCard", name: "Dummy" }]);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
        setImages([{ url: "promotionCard", name: "Dummy" }]);
      }
    };

    fetchImages();
  }, []);

  function ButtonPrev({ onClick, next }) {
    return (
      <button
        onClick={onClick}
        className={`${
          next ? "rotate-180 left-[1039px] top-10" : "rotate-0"
        } w-[52px] h-[52px] left-[90px] top-[65px] flex items-center justify-center bg-white text-main-abu rounded-full hover:bg-gray-400 focus:outline-none absolute z-10 shadow-md`}
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
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "120px",
    prevArrow: <ButtonPrev next={false} />,
    nextArrow: <ButtonPrev next={true} />,
  };

  return (
    <div className="h-[310px] mx-[10%] mt-12">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div>
            <img
              key={index}
              className="object-cover h-[180px] w-[456px]"
              src={jumbotronImage[image.url] || PromotionCard}
              alt={image.name}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Jumbotron;
