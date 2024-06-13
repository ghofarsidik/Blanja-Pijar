import Rating from "../star_rating/star_rating";

const Card = ({image, product_name, price, store, onClick }) => {
  return (
    <div className="w-[208px] h-[278px] bg-white border rounded-xl" onClick={onClick}>
      <img className="w-[208px] h-[136px] rounded-t-xl object-contain" src={image} alt="" />
      <p className="text-base font-blanja_metropolis font-medium pt-[10px] pl-3">
        {product_name}
      </p>
      <p className="text-base font-blanja_metropolis font-medium text-main-red pl-3">
        {
        Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(price)
    // price
  } 
      </p>
      <p className="text-xs font-blanja_metropolis text-main-abu pl-3">
        {store}
      </p>
      <Rating />
    </div>
  );
};

export default Card;
