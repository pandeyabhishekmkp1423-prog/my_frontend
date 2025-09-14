import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // make sure this matches your backend
});

export default API;
