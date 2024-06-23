import PromotionCard from "../../assets/images/jumbotron/Card Promotion.png";
import PromotionCard2 from "../../assets/images/jumbotron/Card Promotion 2.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const jumbotronImage = [PromotionCard, PromotionCard2];

const Jumbotron = () => {
  function ButtonPrev({ onClick, next }) {
    return (
      <div
        className={`${
          next
            ? "rotate-180 left-[1070px] -top-[88px]"
            : "rotate-0 left-[90px] top-[95px]"
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
        {jumbotronImage.map((item, idx) => (
          <div>
            <img
              key={idx}
              className="object-cover h-[180px] w-[456px]"
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
