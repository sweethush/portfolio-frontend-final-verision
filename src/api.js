import axios from "axios";

// Axios 实例
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 使用 .env 中的后端 API 地址
});

// 请求拦截器：自动加上 JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
