import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://productlist-backend.onrender.com/", // Set your base URL here
  // Set a timeout for requests (optional)
  headers: {
    "Content-Type": "application/json", // Set default headers (optional)
    // You can add any other default headers here
  },
});

export default axiosInstance;
