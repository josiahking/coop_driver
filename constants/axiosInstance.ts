import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://driverscoopbackend.com",
  headers: {
    "X-Custom-Origin": "driver-coop",
  },
});

export { axiosInstance };
