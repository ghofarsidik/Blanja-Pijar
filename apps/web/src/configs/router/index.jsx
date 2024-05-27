import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "../../pages/auth/login";
import Register from "../../pages/auth/register";
import Home from "../../pages/home/home";
import Cart from "../../pages/cart/cart";
import Test from "../../pages/test";
import ProductDetailPage from "../../pages/detailProduct/ProductDetailPage";
import Customer from "../../pages/privatePage/Customer";

const MainRouter = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { element: <Customer />, children: [{ path: "/cart", element: <Cart /> }] },
    { path: "/test", element: <Test /> },
    { path: "/product/:id", element: <ProductDetailPage /> },
  ]);

  return <RouterProvider router={router} />;
};
export default MainRouter;
