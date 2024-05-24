import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "../../pages/auth/login";
import Register from "../../pages/auth/register";
import Home from "../../pages/home/home";
import Test from "../../components/module/Categories"

const MainRouter = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/test", element: <Test />},
  ]);

  return <RouterProvider router={router} />;
};
export default MainRouter;
