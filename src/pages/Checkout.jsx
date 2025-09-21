// src/pages/Checkout.jsx
import React, { useState } from "react";
import { useCart } from "./CartContext";
import { Link, useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  if (cart.length === 0)
    return (
      <div className="text-center mt-10 text-gray-700">
        <p>Your cart is empty.</p>
        <Link
          to="/price"
          className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Browse Services
        </Link>
      </div>
    );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
    clearCart();
    navigate("/");
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Checkout</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Billing Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md space-y-4"
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Billing Information
          </h3>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 transition"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 transition"
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
            className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 transition"
          />
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            required
            className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 transition resize-none"
            rows={4}
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition transform hover:scale-105 font-medium"
          >
            Place Order
          </button>
        </form>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Order Summary
          </h3>
          <ul className="space-y-2 max-h-72 overflow-y-auto">
            {cart.map((item) => (
              <li
                key={item.service}
                className="flex justify-between items-center border-b pb-2"
              >
                <span>{item.service} x {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-300 pt-2 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{getCartTotal()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
