import Navbar from "../../components/module/Navbar";
import Dummy from "../../assets/images/dummy/dummy.png";
import Card from "../../components/base/card/card";
import Jumbotron from "../../components/module/Jumbotron";
import Categories from "../../components/module/Categories";
import { Recommendation } from "../../components/module/recommendation";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const items = [
    {
      title: "new",
      desc: "You've never seen it before!",
      children: (
        <Card
          image={Dummy}
          product_name="Men's formal suit - Black & White"
          price="$ 40.0"
          store="Zalora Cloth"
        />
      ),
    },
    {
      title: "Popular",
      desc: "Find clothes that are trending recently",
      children: (
        <Card
          image={Dummy}
          product_name="Men's formal suit - Black & White"
          price="$ 40.0"
          store="Zalora Cloth"
        />
      ),
    },
  ];
  return (
    <div className="container mx-auto">
      <Navbar />
      <Jumbotron />
      <Categories />
      {items.map((items, idx) => (
        <div key={idx}>
          <Recommendation title={items.title} desc={items.desc}>
            {Array.from(new Array(10)).map((_, idx) => (
              <div
                key={idx}
                onClick={() => navigate(`/product/${idx}`)}
                className="cursor-pointer"
              >
                {items.children}
              </div>
            ))}
          </Recommendation>
        </div>
      ))}
    </div>
  );
};

export default Home;
