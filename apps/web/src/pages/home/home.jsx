import Navbar from "../../components/module/Navbar";
<<<<<<< HEAD
import Tshirt from "../../assets/images/categories/t-shirt.png";
import Shorts from "../../assets/images/categories/shorts.png";
import Pants from "../../assets/images/categories/pants.png";
import Jacket from "../../assets/images/categories/jacket.png";
import Dummy from "../../assets/images/dummy/dummy.png";
import Cart from "../../components/base/card/card";
import { Recommendation } from "../../components/module/recommendation";
=======
import Dummy from "../../assets/images/dummy/dummy.png";
import Cart from "../../components/base/card/card"
import Jumbotron from "../../components/module/Jumbotron";
import Categories from "../../components/module/Categories";

>>>>>>> a6823e4c285866e88cb176631e1177cbe141087a

const Home = () => {
  const items = [
    {title: "new", desc:"You've never seen it before!", children: (
      <Cart
            image={Dummy}
            product_name="Men's formal suit - Black & White"
            price="$ 40.0"
            store="Zalora Cloth"
          />
    ) }, 
    {title: "Popular", desc:"Find clothes that are trending recently", children: (
      <Cart
            image={Dummy}
            product_name="Men's formal suit - Black & White"
            price="$ 40.0"
            store="Zalora Cloth"
          />
    ) }
  ]
  return (
    <div className="container mx-auto">
      <Navbar />
<<<<<<< HEAD
      <div className="h-[310px] max-w-[1140px] mx-auto bg-red-600 flex space-x-[30px] pt-[49px] justify-center">
        <div className="w-[456px] h-[180px] bg-purple-500 rounded-lg"></div>
        <div className="w-[456px] h-[180px] hidden lg:block bg-yellow-500 rounded-lg"></div>
      </div>

      <div className="max-w-screen-dekstop mx-auto flex h-[360px]">
        <div className="w-[259px] ml-[50px] container2:ml-[150px]">
          <h1 className="text-4xl font-bold pt-[50px] font-blanja_metropolis">
            category
          </h1>
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
          <img
            className="w-[206px] h-[220px] hidden dekstop:block"
            src={Jacket}
            alt=""
          />
        </div>
      </div>

      {items.map((items, idx) => (
        <div key={idx}>
        <Recommendation title={items.title} desc={items.desc} >
          {Array.from(new Array(10)).map((_ , idx) => (
            items.children
          ))}
        </Recommendation>
        </div>
      ))}
=======
      <Jumbotron/>
      <Categories/>
      <div className="h-[310px] max-w-[1140px] mx-auto mt-[50px]">
        <p className="text-[34px] font-bold font-blanja_metropolis h-[40px]">New</p>
        <p className="text-xs font-blanja_metropolis mt-[4px]">You've never seen it before!</p>
        <div className="grid grid-cols-5 place-items-center gap-y-[25px] mt-[25px]">
        <Cart image={Dummy} product_name= "Men's formal suit - Black & White" price="$ 40.0" store="Zalora Cloth" />
        <Cart image={Dummy} product_name= "Men's formal suit - Black & White" price="$ 40.0" store="Zalora Cloth" />
        <Cart image={Dummy} product_name= "Men's formal suit - Black & White" price="$ 40.0" store="Zalora Cloth" />
        <Cart image={Dummy} product_name= "Men's formal suit - Black & White" price="$ 40.0" store="Zalora Cloth" />
        <Cart image={Dummy} product_name= "Men's formal suit - Black & White" price="$ 40.0" store="Zalora Cloth" />
        <Cart image={Dummy} product_name= "Men's formal suit - Black & White" price="$ 40.0" store="Zalora Cloth" />
        <Cart image={Dummy} product_name= "Men's formal suit - Black & White" price="$ 40.0" store="Zalora Cloth" />
        <Cart image={Dummy} product_name= "Men's formal suit - Black & White" price="$ 40.0" store="Zalora Cloth" />
        <Cart image={Dummy} product_name= "Men's formal suit - Black & White" price="$ 40.0" store="Zalora Cloth" />
        <Cart image={Dummy} product_name= "Men's formal suit - Black & White" price="$ 40.0" store="Zalora Cloth" />
        </div>
        <p className="text-[34px] font-bold font-blanja_metropolis h-[40px] mt-[50px]">Popular</p>
        <p className="text-xs font-blanja_metropolis mt-[4px]">Find clothes that are trending recently</p>
        <div className="grid grid-cols-5 place-items-center gap-y-[25px] mt-[25px]">
        <Cart image={Dummy} product_name= "Men's formal suit - Black & White" price="$ 40.0" store="Zalora Cloth" />
        <Cart image={Dummy} product_name= "Men's formal suit - Black & White" price="$ 40.0" store="Zalora Cloth" />
        <Cart image={Dummy} product_name= "Men's formal suit - Black & White" price="$ 40.0" store="Zalora Cloth" />
        <Cart image={Dummy} product_name= "Men's formal suit - Black & White" price="$ 40.0" store="Zalora Cloth" />
        <Cart image={Dummy} product_name= "Men's formal suit - Black & White" price="$ 40.0" store="Zalora Cloth" />
        <Cart image={Dummy} product_name= "Men's formal suit - Black & White" price="$ 40.0" store="Zalora Cloth" />
        <Cart image={Dummy} product_name= "Men's formal suit - Black & White" price="$ 40.0" store="Zalora Cloth" />
        <Cart image={Dummy} product_name= "Men's formal suit - Black & White" price="$ 40.0" store="Zalora Cloth" />
        <Cart image={Dummy} product_name= "Men's formal suit - Black & White" price="$ 40.0" store="Zalora Cloth" />
        <Cart image={Dummy} product_name= "Men's formal suit - Black & White" price="$ 40.0" store="Zalora Cloth" />
        </div>
        <h1>content popular</h1>
      </div>
>>>>>>> a6823e4c285866e88cb176631e1177cbe141087a
    </div>
  );
};

export default Home;
