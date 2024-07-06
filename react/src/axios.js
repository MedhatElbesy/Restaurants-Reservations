import { decryptData } from "./helpers/cryptoUtils";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

instance.interceptors.request.use(
  (config) => {
    const token = decryptData("token");
    console.log(token)
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
