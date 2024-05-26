import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "../../pages/auth/login";
import Register from "../../pages/auth/register";
import Home from "../../pages/home/home";
import Cart from "../../pages/cart/cart";
import Test from "../../pages/test";
import ProductDetailPage from "../../pages/detailProduct/ProductDetailPage";

const MainRouter = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/cart", element: <Cart />},
    { path: "/test", element: <Test />},
    { path: "/detailProduct/:id", element: <ProductDetailPage />}
  ]);

  return <RouterProvider router={router} />;
};
export default MainRouter;
