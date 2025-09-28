// src/component/PickupInfo.jsx
import React, { useState } from "react";
import API from "../api"; // Make sure api.js has baseURL = "https://laundry-hamper.onrender.com/api"

const PickupInfo = () => {
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    date: "",
    time: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await API.post("/pickup", form);
      if (res.status === 201 || res.status === 200) {
        setMessage("✅ Pickup scheduled successfully!");
        setForm({ name: "", address: "", phone: "", date: "", time: "" });
      } else {
        setMessage("❌ Failed to schedule pickup. Try again.");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Cannot connect to backend.");
    }
  };

  return (
    <section className="bg-blue-50 py-12 px-4 md:px-8 rounded-xl shadow-md max-w-4xl mx-auto my-12">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Schedule a Pickup
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Fill in the details below and our team will pick up your laundry at your convenience.
      </p>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none w-full"
        />
        <input
          type="text"
          name="address"
          placeholder="Pickup Address"
          value={form.address}
          onChange={handleChange}
          required
          className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none w-full"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
          className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none w-full"
        />
        <div className="flex gap-2">
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none w-1/2"
          />
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
            className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none w-1/2"
          />
        </div>

        <button
          type="submit"
          className="md:col-span-2 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition transform hover:scale-105"
        >
          Schedule Pickup
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-green-600 font-medium">{message}</p>
      )}
    </section>
  );
};

export default PickupInfo;
