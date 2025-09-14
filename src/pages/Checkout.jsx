import React, { useState } from "react";
import { useCart } from "./PriceList";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for your order, ${formData.name}!`);
    clearCart();
    navigate("/");
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <ul className="mb-4">
        {cartItems.map((item) => (
          <li key={item.id} className="flex justify-between border p-2 rounded mb-2">
            <span>{item.name} x {item.quantity}</span>
            <span>${item.price * item.quantity}</span>
          </li>
        ))}
      </ul>
      <p className="text-xl font-bold mb-4">Total: ${totalPrice()}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          name="address"
          placeholder="Delivery Address"
          required
          value={formData.address}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
