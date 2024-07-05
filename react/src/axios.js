import { decryptData } from "./helpers/cryptoUtils";
import axios from "axios";

const secretKey = import.meta.env.VITE_REACT_APP_SECRET_KEY;

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

instance.interceptors.request.use(
  (config) => {
    const encryptedToken = sessionStorage.getItem("token");
    if (encryptedToken) {
      const token = decryptData(encryptedToken);
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
