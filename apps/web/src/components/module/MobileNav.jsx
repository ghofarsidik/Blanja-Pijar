import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo/bag-logo.png";
import Sort from "../../assets/images/logo/filter.png";
import { useState } from "react";
import { Filter } from "./Filter";
import { useEffect } from "react";
import API from "../../configs/api";
import { useSelector } from "react-redux";
export const MobileNav = () => {
  const { activeUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [filter, setFilter] = useState({
    color: [],
    size: [],
    category: "",
    store: "",
  });
  const [color, setColor] = useState();
  const [sizes, setSize] = useState();
  const [categories, setCategories] = useState();
  const [stores, setStores] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const handleOpen = () => setOpen(!open);
  const handleOpenFilter = () => setOpenFilter(!openFilter);
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      navigate(`/search?products=${searchQuery}&page=1`);
    }
  };
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleFilter = () => {
    const queryParams = new URLSearchParams();

    if (filter.color.length > 0) {
      queryParams.append("color", filter.color.join(","));
    }
    if (filter.size.length > 0) {
      queryParams.append("size", filter.size.join(","));
    }
    if (filter.category) {
      queryParams.append("category", filter.category);
    }
    if (filter.store) {
      queryParams.append("store", filter.store);
    }

    navigate(`/search?${queryParams.toString()}`);
    handleOpenFilter();
  };
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    const stores = async () => {
      try {
        const res = await API.get("/stores");
        setStores(res?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    const colors = async () => {
      try {
        const res = await API.get("/color");
        setColor(res?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    const size = async () => {
      try {
        const res = await API.get("/sizes");
        setSize(res?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    const categories = async () => {
      try {
        const res = await API.get("/categories");
        setCategories(res?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    stores();
    colors();
    size();
    categories();
  }, []);
  const handleColorClick = (color) => {
    setFilter((prevFilter) => {
      const newColors = prevFilter.color.includes(color)
        ? prevFilter.color.filter((c) => c !== color)
        : [...prevFilter.color, color];
      return { ...prevFilter, color: newColors };
    });
  };

  const handleSizeClick = (size) => {
    setFilter((prevFilter) => {
      const newSize = prevFilter.size.includes(size)
        ? prevFilter.size.filter((c) => c !== size)
        : [...prevFilter.size, size];
      return { ...prevFilter, size: newSize };
    });
  };

  const uniqueColors = [
    ...new Map(color?.map((item) => [item?.color, item])).values(),
  ];
  const uniqueSize = [
    ...new Map(sizes?.map((item) => [item?.size, item])).values(),
  ];
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <nav className="relative flex justify-around items-center px-[7%] pb-1 pt-5">
      <a href="/">
        <img src={Logo} alt="" className="w-10 h-10" />
      </a>
      <input
        type="text"
        className="border border-gray-500 rounded-full px-5 w-[160px]"
        placeholder="Search"
        onChange={(e) => handleInputChange(e)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="bg-white h-[40px] w-[40px] border border-abu flex items-center rounded-lg ml-2"
        onClick={() => setOpenFilter(true)}
      >
        <img src={Sort} alt="Sort" className="mx-auto" />
      </button>
      <Filter
        categories={categories}
        filter={filter}
        handleColorClick={handleColorClick}
        handleFilter={handleFilter}
        handleOpen={handleOpenFilter}
        handleSizeClick={handleSizeClick}
        open={openFilter}
        stores={stores}
        uniqueColors={uniqueColors}
        uniqueSize={uniqueSize}
        setFilter={setFilter}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
        onClick={handleOpen}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
      <div
        className={`${
          open
            ? "w-2/3 bg-white h-[1500px] absolute z-20 right-0 top-0"
            : "w-0 h-0 absolute overflow-hidden right-0 top-0 -z-20"
        } transition-all duration-300`}
      >
        <div className="flex gap-x-5 py-7 px-5 items-center border-b border-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
            onClick={handleOpen}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
          <p className="text-black text-lg">Menu</p>
        </div>
        {!token ? (
          <div className="flex flex-col px-10 gap-y-2 pt-5">
            <button
              onClick={() => navigate("/login")}
              className="h-9 w-full border-0 hover:border-main-abu text-sm bg-red-700 text-white rounded-lg hover:bg-white hover:text-black hover:border"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="h-9 w-full border-0 hover:border-main-abu text-sm bg-blue-700 text-white rounded-lg hover:bg-white hover:text-black hover:border"
            >
              Register
            </button>
          </div>
        ) : (
          <div>
            <div
              className="flex px-5 items-center gap-x-5 py-5 mb-5"
              onClick={() =>
                navigate(
                  `/profile/${
                    activeUser?.role !== "customer" ? "mystore" : "profile"
                  }`
                )
              }
            >
              <img src={activeUser?.image} alt="" className="w-14 h-14" />
              <p className="text-xl font-semibold text-gray-500">My Profile</p>
            </div>
            <div
              className="flex items-center gap-x-5 px-5 border-t border-gray-300 py-3"
              onClick={() => navigate("/cart")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              <p className="text-xl font-semibold text-gray-500">My Bag</p>
            </div>
            <div className="px-5 mt-5">
              <button
                onClick={handleLogout}
                className="h-9 w-full border-0 hover:border-main-abu text-sm bg-blue-700 text-white rounded-lg hover:bg-white hover:text-black hover:border"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
