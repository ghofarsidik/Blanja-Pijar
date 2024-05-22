import Navbar from "../../components/module/Navbar";
import Tshirt from "../../components/images/categories/t-shirt.png"
import Shorts from "../../components/images/categories/shorts.png";
import Pants from "../../components/images/categories/pants.png";
import Jacket from "../../components/images/categories/jacket.png";
import Dummy from "../../components/images/dummy/dummy.png";

const Home = () => {
  return (
    <div className="container mx-auto">
      <Navbar />
      <div className="h-[310px] max-w-[1140px] mx-auto bg-red-600 flex space-x-[30px] pt-[49px] justify-center">
        <div className="w-[456px] h-[180px] bg-purple-500 rounded-lg"></div>
        <div className="w-[456px] h-[180px] hidden lg:block bg-yellow-500 rounded-lg"></div>
      </div>

      <div className="flex h-[360px]">
        <div className="w-[259px] ml-[50px] container:ml-[150px]">
          <h1 className="text-4xl font-bold pt-[50px] font-blanja_metropolis">category</h1>
          <h2 className="text-xs text-abu pt-1">
            What are you currently looking for
          </h2>
          <div className="flex space-x-6 pt-16">
            <button className="w-[52px] h-[52px] flex items-center justify-center bg-gray-300 text-black rounded-full hover:bg-gray-400 focus:outline-none">
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
            <button className="w-[52px] h-[52px] flex items-center justify-center bg-gray-300 text-black rounded-full hover:bg-gray-400 focus:outline-none">
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <img className="w-[206px] h-[220px]" src={Tshirt} alt="" />
          <img className="w-[206px] h-[220px]" src={Shorts} alt="" />
          <img className="w-[206px] h-[220px]" src={Pants} alt="" />
          <img className="w-[206px] h-[220px] hidden dekstop:block" src={Jacket} alt="" />
        </div>
      </div>

      <div className="h-[310px] max-w-[1140px] mx-auto bg-blue-800">
        <h1>content new</h1>
        <div className="w-[208px] h-[278px]">
        <img className="" src={Dummy} alt="" />
        </div>
        <h1>content popular</h1>
        
      </div>
    </div>
  );
};

export default Home;
