import axios from "axios";
import MainRouter from "./configs/router";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActiveUser } from "./configs/redux/features/userSlice";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getActiveUser());
  }, []);
  return (
    <>
      <ToastContainer />
      <MainRouter />
    </>
  );
};

export default App;
