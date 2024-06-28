import Logo from "../../assets/images/logo/blanja.png";
import Search from "../../assets/images/logo/search.png";
import Sort from "../../assets/images/logo/filter.png";
import Cart from "../../assets/images/logo/cart.png";
import Mail from "../../assets/images/logo/mail.png";
import Bell from "../../assets/images/logo/bell.png";
import Close from "../../assets/images/navbar/add.svg";
import noPhoto from "../../assets/images/logo/noPhoto.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "../../configs/api";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Option,
  Select,
} from "@material-tailwind/react";

const Navbar = () => {
  const { activeUser } = useSelector((state) => state.user);
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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const token = localStorage.getItem("token");

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    navigate(`/search?products=${searchQuery}&page=1`);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      navigate(`/search?products=${searchQuery}&page=1`);
    }
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
    handleOpen();
  };
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
  return (
    <>
      <nav className="w-full h-[100px] mx-auto flex items-center">
        <a href="/" className="lg:ml-[10%]">
          <img src={Logo} alt="" />
        </a>

        <div className="flex items-center flex-grow mx-5">
          <div className="flex-grow flex rounded-full bg-white border border-abu overflow-hidden">
            <input
              className="rounded-l-full flex-grow h-[40px] text-base border focus:outline-none focus:ring-0 placeholder:text-abu px-4"
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Search"
            />
            <button className="p-2" type="submit" onClick={handleSearchClick}>
              <img src={Search} alt="Search" />
            </button>
          </div>
          <button
            className="bg-white h-[40px] w-[40px] border border-abu flex items-center rounded-lg ml-2"
            onClick={() => setOpen(true)}
          >
            <img src={Sort} alt="Sort" className="mx-auto" />
          </button>
        </div>
        <Dialog open={open} handler={handleOpen} size="sm">
          <DialogHeader>
            <div className="flex gap-2 items-center">
              <button onClick={handleOpen}>
                <img src={Close} alt="" />
              </button>
              <p>Filter</p>
            </div>
          </DialogHeader>
          <DialogBody>
            <div className="border-t-2 border-gray-300 pt-3 pb-1">
              <h1 className="font-semibold pb-8 text-[#222222] text-lg">
                Colors
              </h1>
              <div className="flex gap-x-2">
                {uniqueColors?.map(({ color }) => (
                  <div
                    key={color}
                    onClick={() => handleColorClick(color)}
                    style={{ backgroundColor: color }}
                    className={`${
                      filter?.color?.includes(color)
                        ? "ring-2 ring-gray-700"
                        : ""
                    } w-9 h-9 rounded-full border border-gray-300 shadow-xl cursor-pointer`}
                  ></div>
                ))}
              </div>
            </div>
            <div className="border-t-2 border-gray-300 mt-3 py-3">
              <h1 className="font-semibold pb-8 text-[#222222] text-lg">
                Size
              </h1>
              <div className="flex gap-x-2">
                {uniqueSize?.map(({ size }) => (
                  <div
                    onClick={() => handleSizeClick(size)}
                    className={`${
                      filter?.size?.includes(size)
                        ? "bg-main-red text-white"
                        : ""
                    } w-10 h-10 rounded-lg border border-gray-300 shadow-xl cursor-pointer flex justify-center items-center`}
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t-2 border-gray-300 mt-3 py-3">
              <h1 className="font-semibold pb-8 text-[#222222] text-lg">
                Category
              </h1>
              <div className="grid grid-cols-3 gap-x-2 gap-y-3 pr-20">
                {categories?.map(({ name }) => (
                  <div
                    onClick={() => setFilter({ ...filter, category: name })}
                    className={`${
                      filter?.category === name ? "bg-main-red text-white" : ""
                    } w-28 h-10 rounded-lg border border-gray-300 shadow-xl cursor-pointer flex justify-center items-center`}
                  >
                    {name}
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t-2 border-gray-300 mt-3 py-3">
              <h1 className="font-semibold text-[#222222] text-lg pb-1">
                Store
              </h1>
              <Select
                variant="standard"
                label="Select store"
                value={filter?.store}
                onChange={(val) => setFilter({ ...filter, store: val })}
              >
                {stores?.map(({ name }) => (
                  <Option key={name} value={name}>
                    {name}
                  </Option>
                ))}
              </Select>
            </div>
          </DialogBody>
          <div className="flex gap-x-8 justify-center py-2">
            <button
              onClick={handleOpen}
              className="bg-white w-1/3 text-center py-2 px-10 text-black border border-gray-500 rounded-full"
            >
              Discard
            </button>
            <button
              onClick={handleFilter}
              className="bg-main-red  w-1/3 text-center py-2 px-10 text-white font-semibold rounded-full"
            >
              Apply
            </button>
          </div>
        </Dialog>

        <div className="flex h-[40px] items-center space-x-[20px] mr-[10%]">
          <button
            className="flex items-center h-9 w-[44px]"
            onClick={() => navigate("/cart")}
          >
            <img className="mx-auto" src={Cart} alt="Cart" />
          </button>
          <div className="hidden lg:flex lg:gap-x-3">
            {token ? (
              <>
                <button className="flex items-center h-9 w-[44px]">
                  <img className="mx-auto" src={Bell} alt="Cart" />
                </button>
                <button className="flex items-center h-9 w-[44px]">
                  <img className="mx-auto" src={Mail} alt="Cart" />
                </button>

                <button
                  className="flex items-center h-9 w-[44px]"
                  onClick={() =>
                    navigate(
                      `/profile/${
                        activeUser?.role !== "customer" ? "mystore" : "profile"
                      }`
                    )
                  }
                >
                  <img
                    className="mx-auto rounded-full"
                    src={activeUser?.image || noPhoto}
                    alt={activeUser?.name}
                  />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="h-9 w-[100px] border-0 hover:border-main-abu text-sm bg-red-700 text-white rounded-full hover:bg-white hover:text-black hover:border"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="h-9 w-[100px] border border-abu text-sm text-abu rounded-full hover:bg-red-700 hover:text-white hover:border-0"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
