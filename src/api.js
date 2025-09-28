import axios from "axios";

const API = axios.create({
  baseURL: "https://laundry-hamper.onrender.com/api",
});

export default API;
