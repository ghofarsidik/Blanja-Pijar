import axios from "axios";
console.log(import.meta.env.VITE_URL_BLANJA);
const API = axios.create({
  baseURL: "http://localhost:3000/v1",
});

API.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default API;
