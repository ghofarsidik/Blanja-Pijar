import Rating from "../star_rating/star_rating";

const Card = ({image, product_name, price, store }) => {
  return (
    <div className="w-[208px] h-[278px] bg-white border rounded-xl">
      <img className="w-[208px] h-[136px] rounded-t-xl" src={image} alt="" />
      <p className="text-base font-blanja_metropolis font-medium pt-[10px] pl-3">
        {product_name}
      </p>
      <p className="text-base font-blanja_metropolis font-medium text-main-red pl-3">
        {price}
      </p>
      <p className="text-xs font-blanja_metropolis text-main-abu pl-3">
        {store}
      </p>
      <Rating />
    </div>
  );
};

export default Card;
