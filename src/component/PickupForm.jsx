import React, { useState } from "react";

const PickupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    date: "",
    items: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!formData.name || !formData.email || !formData.address || !formData.date || !formData.items) {
      setMessage("❌ Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("https://laundry-hamper.onrender.com/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          items: formData.items.split(",").map((item) => item.trim())
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ " + data.message);
        setFormData({ name: "", email: "", address: "", date: "", items: "" });
      } else {
        setMessage("❌ " + data.message);
      }
    } catch (err) {
      setMessage("❌ Cannot connect to backend");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
        Schedule a Pickup
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md sm:max-w-lg mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-md space-y-4 sm:space-y-6"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="w-full p-3 sm:p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
          className="w-full p-3 sm:p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Pickup Address"
          required
          className="w-full p-3 sm:p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full p-3 sm:p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="items"
          value={formData.items}
          onChange={handleChange}
          placeholder="Items (comma separated)"
          required
          className="w-full p-3 sm:p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 sm:py-4 rounded-full hover:bg-blue-700 transition text-lg sm:text-xl font-medium"
        >
          Place Order
        </button>

        {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
      </form>
    </div>
  );
};

export default PickupForm;
