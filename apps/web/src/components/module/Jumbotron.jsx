import PromotionCard from "../../assets/images/jumbotron/Card Promotion.png";
import PromotionCard2 from "../../assets/images/jumbotron/Card Promotion 2.png";
import PromotionCard3 from "../../assets/images/jumbotron/promotion 3.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState } from "react";
import { useEffect } from "react";

const jumbotronImage = [PromotionCard, PromotionCard2];

const Jumbotron = () => {
  function ButtonPrev({ onClick, next }) {
    return (
      <div
        className={`${
          next
            ? "rotate-180 left-[340px] -top-[98px] lg:left-[1070px] lg:-top-[88px]"
            : "rotate-0 -left-6 top-[80px] lg:left-[90px] lg:top-[95px]"
        } relative h-6 w-6 z-10`}
      >
        <button
          onClick={onClick}
          className={` w-[52px] h-[52px] flex items-center justify-center bg-white text-main-abu rounded-full hover:bg-gray-400 focus:outline-none absolute shadow-md`}
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
    cssEase: "linear",
    prevArrow: <ButtonPrev next={false} />,
    nextArrow: <ButtonPrev next={true} />,
  };
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1200px)");
    const tablet = window.matchMedia("(min-width: 800px)");
    const handleResize = () => {
      if (desktop.matches === true) {
        setShow(2);
        setPading("160px");
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
    <div className="lg:h-[310px] mx-[10%] lg:mt-12">
      <Slider {...settings}>
        {jumbotronImage.map((item, idx) => (
          <div>
            <img
              key={idx}
              className="object-cover ml-3 lg:ml-0 w-[320px] h-[180px] lg:h-[200px] lg:w-[450px] rounded"
              src={item}
              // alt={image.name}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Jumbotron;
