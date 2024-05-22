import Navbar from "../../components/module/Navbar";
import Dummy from "../../assets/images/dummy/dummy.png";
import Categories from "../../components/module/Categories";


const Home = () => {
  return (
    <div className="container mx-auto">
      <Navbar />
      <div className="h-[310px] max-w-[1140px] mx-auto bg-red-600 flex space-x-[30px] pt-[49px] justify-center">
        <div className="w-[456px] h-[180px] bg-purple-500 rounded-lg"></div>
        <div className="w-[456px] h-[180px] hidden lg:block bg-yellow-500 rounded-lg"></div>
      </div>
      <Categories/>
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
