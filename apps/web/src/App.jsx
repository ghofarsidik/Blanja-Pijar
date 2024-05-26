import axios from "axios";
import MainRouter from "./configs/router";
import { useEffect } from "react";

const App = () => {
  const keepLogin = async () => {
    try {
      const response = await axios.get("http://localhost:3000/v1/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    keepLogin();
  }, []);
  return <MainRouter />;
};

export default App;
