import axios from "axios";
export const authRegister = async (data) => {
  try {
    const response = await axios.post(
      "https://blanja-kelompok-1-production.up.railway.app/v1/auth/register",
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};
