import API from "../configs/api";

export const authLogin = async (data) => {
  try {
    const response = await API.post("/auth/login", data);
    return response;
  } catch (error) {
    return error;
  }
};
