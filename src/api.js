import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://laundry-hamper.onrender.com/api",
});

export default API;
