import { formatCurrency } from "../../../utils/formatCurrency";
import Rating from "../star_rating/star_rating";

const Card = ({ image, product_name, price, store, onClick }) => {
  return (
    <div
      className="w-[280px] p-2 lg:p-0 h-full lg:w-[208px] lg:h-[278px] bg-white border rounded-xl cursor-pointer"
      onClick={onClick}
    >
      <img
        className="w-full lg:w-[208px] lg:h-[136px] rounded-t-xl object-contain"
        src={image}
        alt=""
      />
      <p className="text-2xl lg:text-base font-blanja_metropolis font-medium pt-[10px] pl-3">
        {product_name}
      </p>
      <p className="text-xl lg:text-base font-blanja_metropolis font-medium text-main-red pl-3">
        {
          formatCurrency(price)
          // price
        }
      </p>
      <p className="text-lg lg:text-xs font-blanja_metropolis text-main-abu pl-3">
        {store}
      </p>
      <Rating />
    </div>
  );
};

export default Card;
