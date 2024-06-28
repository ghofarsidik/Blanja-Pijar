import API from "../configs/api";
export const authRegister = async (data) => {
  try {
    const response = await API.post("/auth/register", data);
    return response;
  } catch (error) {
    return error;
  }
};
