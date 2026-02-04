import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://wger.de/api/v2",
  timeout: 10000,
});

export default axiosInstance;
