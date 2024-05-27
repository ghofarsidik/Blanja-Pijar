import axios from "axios";
export const authRegister = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/v1/auth/register",
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};
