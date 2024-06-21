import axios from 'axios';

// konfigurasi axios instance
const api = axios.create({
  baseURL: 'https://blanja-kelompok-1-production.up.railway.app/v1',
});

export default api;
