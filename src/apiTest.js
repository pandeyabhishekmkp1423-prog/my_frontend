// src/apiTest.js
import API from "./api"; // ✅ import the API instance, not itself

export const testLogin = async () => {
  try {
    const res = await API.post("/login", { email: "test@example.com", password: "123456" });
    console.log("Login Response:", res.data);
  } catch (err) {
    console.error("Login Error:", err.response?.data || err.message);
  }
};

export const testRegister = async () => {
  try {
    const res = await API.post("/register", { name: "Test User", email: "test@example.com", password: "123456" });
    console.log("Register Response:", res.data);
  } catch (err) {
    console.error("Register Error:", err.response?.data || err.message);
  }
};

// Other test functions...
