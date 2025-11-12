import axios from "axios";
import { useAuthStore } from "@/store/authStore";

// This is a standard check to see if the code is running on the server or in the browser.
const isServer = typeof window === "undefined";

// If running on the server, use the internal Docker service name.
// If running in the browser, use a relative path that Nginx will intercept.
const baseURL = isServer ? "http://shopverse-server:5000/api" : "/api";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
