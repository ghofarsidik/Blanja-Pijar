import Navbar from "../../components/module/Navbar";
import Dummy from "../../assets/images/dummy/dummy.png";
import Cart from "../../components/base/card/card"
import Jumbotron from "../../components/module/Jumbotron";
import Categories from "../../components/module/Categories";


const Home = () => {
  return (
    <div className="container mx-auto">
      <Navbar />
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
    </div>
  );
};

export default Home;
