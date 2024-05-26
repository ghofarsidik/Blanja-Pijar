import Logo from "../../assets/images/logo/blanja.png";
import Search from "../../assets/images/logo/search.png";
import Sort from "../../assets/images/logo/filter.png";
import Cart from "../../assets/images/logo/cart.png";
import Mail from "../../assets/images/logo/mail.png";
import Bell from "../../assets/images/logo/bell.png";
import Profile from "../../assets/images/dummy/dummyProfile.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const HandleRegister = () => {
    navigate("/register");
  };
  const HandleLogin = () => {
    navigate("/login");
  };

  const token = localStorage.getItem("token");
  console.log(token);
  
  return (
    <nav className="w-full h-[100px] mx-auto flex items-center bg-white">
      <img className="ml-[10%]" src={Logo} alt="" />

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
        <button className="bg-white h-[40px] w-[40px] border border-abu flex items-center rounded-lg ml-2">
          <img src={Sort} alt="Sort" className="mx-auto" />
        </button>
      </div>

      <div className="flex h-[40px] items-center space-x-[20px] mr-[10%]">
        <button className="flex items-center h-9 w-[44px]">
          <img className="mx-auto" src={Cart} alt="Cart" />
        </button>
        {token ? (
          <>
        <button className="flex items-center h-9 w-[44px]">
          <img className="mx-auto" src={Bell} alt="Cart" />
        </button>
        <button className="flex items-center h-9 w-[44px]">
          <img className="mx-auto" src={Mail} alt="Cart" />
        </button>
        <button className="flex items-center h-9 w-[44px]">
          <img className="mx-auto" src={Profile} alt="Cart" />
        </button>
        </>
      ) : (
      <>
      <button onClick={HandleLogin} className="h-9 w-[100px] border-0 hover:border-main-abu text-sm bg-red-700 text-white rounded-full hover:bg-white hover:text-black hover:border">
          Masuk
        </button>
        <button onClick={HandleRegister} className="h-9 w-[100px] border border-abu text-sm text-abu rounded-full hover:bg-red-700 hover:text-white hover:border-0">
          Daftar
        </button>
        </>
        )
        }
      </div>
    </nav>
  );
};

export default Navbar;
