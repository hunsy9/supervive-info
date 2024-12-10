import axios, { AxiosInstance } from "axios";

const apiInstance: AxiosInstance = axios.create({
  baseURL: `http://localhost:8000/api/`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export default apiInstance;
