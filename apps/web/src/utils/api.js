import axios from "axios";

// konfigurasi axios instance
const api = axios.create({
  baseURL: import.meta.env.URL_BLANJA,
});

export default api;
