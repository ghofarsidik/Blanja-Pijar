import axios from "axios";

export const authLogin = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/v1/auth/login",
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};
