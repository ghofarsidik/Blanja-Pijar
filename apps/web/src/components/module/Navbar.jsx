import Logo from "../../assets/images/logo/blanja.png";
import Search from "../../assets/images/logo/search.png";
import Sort from "../../assets/images/logo/filter.png";
import Cart from "../../assets/images/logo/cart.png";
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const navigate = useNavigate()

  const HandleRegister = () => {
    navigate('/register')
  }
  const HandleLogin = () => {
    navigate('/login')
  }
  return (
    <nav className="w-full h-[100px] mx-auto flex items-center bg-white shadow-md">
      <img className="ml-[50px] container:ml-[150px]" src={Logo} alt="" />

      <div className="flex items-center flex-grow mx-5">
        <div className="flex-grow flex rounded-full bg-white border border-abu overflow-hidden">
          <input
            className="flex-grow h-[40px] text-base focus:outline-none focus:ring-0 placeholder:text-abu px-4"
            type="text"
            placeholder="Search"
          />
          <button className="p-2">
            <img src={Search} alt="Search" />
          </button>
        </div>
        <div className="bg-white h-[40px] w-[40px] border border-abu flex items-center rounded-lg ml-2">
          <img src={Sort} alt="Sort" className="mx-auto" />
        </div>
      </div>

      <div className="flex h-[40px] items-center space-x-[20px] mr-[50px] container:mr-[150px]">
        <div className="flex items-center h-9 w-[44px]">
          <img className="mx-auto" src={Cart} alt="Cart" />
        </div>
        <button onClick={HandleLogin} className="h-9 w-[100px] border border-abu text-sm text-abu rounded-full hover:bg-red-700 hover:text-white hover:border-0">
          Masuk
        </button>
        <button onClick={HandleRegister} className="h-9 w-[100px] border border-abu text-sm text-abu rounded-full hover:bg-red-700 hover:text-white hover:border-0">
          Daftar
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
