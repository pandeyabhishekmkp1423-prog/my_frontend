import API from "./api"; // your updated api.js

// Test login
export const testLogin = async () => {
  try {
    const res = await API.post("/login", { email: "test@example.com", password: "123456" });
    console.log("Login Response:", res.data);
  } catch (err) {
    console.error("Login Error:", err.response?.data || err.message);
  }
};

// Test register
export const testRegister = async () => {
  try {
    const res = await API.post("/register", { name: "Test User", email: "test@example.com", password: "123456" });
    console.log("Register Response:", res.data);
  } catch (err) {
    console.error("Register Error:", err.response?.data || err.message);
  }
};

// Test cart for a user
export const testCart = async () => {
  try {
    const userId = "123"; // replace with actual user ID
    const res = await API.get(`/cart/${userId}`);
    console.log("Cart Response:", res.data);
  } catch (err) {
    console.error("Cart Error:", err.response?.data || err.message);
  }
};

// Test price list
export const testPriceList = async () => {
  try {
    const res = await API.get("/services");
    console.log("Price List Response:", res.data);
  } catch (err) {
    console.error("Price List Error:", err.response?.data || err.message);
  }
};

// Test pick form submission (example)
export const testPickForm = async () => {
  try {
    const res = await API.post("/orders", {
      userId: "123",
      address: "123 Street",
      pickupDate: "2025-09-29",
      items: [{ service: "Wash", quantity: 2, price: 50 }],
    });
    console.log("Pick Form Response:", res.data);
  } catch (err) {
    console.error("Pick Form Error:", err.response?.data || err.message);
  }
};

// Run all tests
const runTests = async () => {
  await testRegister();
  await testLogin();
  await testPriceList();
  await testCart();
  await testPickForm();
};

runTests();
