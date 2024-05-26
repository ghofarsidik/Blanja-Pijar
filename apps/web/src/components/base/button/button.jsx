const Button = ({ name, className, onClick, type }) => {
  return (
    <button
      type={type}
      className={`bg-red-500 w-96 h-12 py-2 text-white text-lg font-semibold border rounded-full cursor-pointer hover:bg-[#DB3022] ${className}`}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default Button;
