import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "../../pages/auth/login";
import Register from "../../pages/auth/register";
import Home from "../../pages/home/home";
import Cart from "../../pages/cart/cart";
import ProductDetailPage from "../../pages/detailProduct/ProductDetailPage";
import Customer from "../../pages/privatePage/Customer";
import Profile from "../../pages/profile";
import CheckoutPage from "../../pages/checkout";
import VerifyEmail from "../../pages/verifyEmail";
import SearchPage from "../../pages/search";

const MainRouter = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/verify/:token", element: <VerifyEmail /> },
    { path: "/search", element: <SearchPage /> },
    {
      element: <Customer />,
      children: [
        { path: "/cart", element: <Cart /> },
        { path: "/checkout", element: <CheckoutPage /> },
        { path: "/profile/:path", element: <Profile /> },
      ],
    },
    { path: "/product/:id", element: <ProductDetailPage /> },
  ]);

  return <RouterProvider router={router} />;
};
export default MainRouter;
