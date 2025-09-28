// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://laundry-hamper.onrender.com/api", // your backend API URL
});

export default API;
