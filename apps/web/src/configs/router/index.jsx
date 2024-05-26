import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "../../pages/auth/login";
import Register from "../../pages/auth/register";
import Home from "../../pages/home/home";
import Test from "../../components/module/Categories"
import ProductDetail from "../../pages/detailProduct/ProductDetailPage";

const MainRouter = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/test", element: <Test />},
    { path: "/detailProduct/:id", element: <ProductDetail />},
  ]);

  return <RouterProvider router={router} />;
};
export default MainRouter;
