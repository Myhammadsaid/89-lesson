import axios from "axios";

const baseURL = axios.create({
  baseURL: "https://market.ilyosbekdev.uz",
});

baseURL.interceptors.request.use((res) => {
  const token = localStorage.getItem("x-auth-token");
  if (token) {
    res.headers.Authorization = `Bearer ${token}`;
  }
  return res;
});

export default baseURL;
