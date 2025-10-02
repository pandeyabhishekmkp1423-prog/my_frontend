// src/component/PriceList.jsx
import React, { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import API from "../api"; 
import { FaTshirt, FaShoePrints, FaBed, FaCouch, FaHandSparkles } from "react-icons/fa";

const PriceList = () => {
  const { addToCart, updateQuantity, cart } = useCart();
  const [servicesData, setServicesData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await API.get("/services"); // ✅ goes to /api/services
        setServicesData(res.data); 
      } catch (err) {
        console.error("❌ Failed to fetch services:", err);
        setError("Failed to load services. Please try again later.");
      }
    };
    fetchServices();
  }, []);

  const getQuantity = (service) => {
    const item = cart.find((c) => c.service === service);
    return item ? item.quantity : 0;
  };

  const getServiceIcon = (name) => {
    if (name.includes("Wash")) return <FaTshirt className="text-blue-600 text-4xl" />;
    if (name.includes("Shoe")) return <FaShoePrints className="text-blue-600 text-4xl" />;
    if (name.includes("Bed")) return <FaBed className="text-blue-600 text-4xl" />;
    if (name.includes("Sofa")) return <FaCouch className="text-blue-600 text-4xl" />;
    return <FaHandSparkles className="text-blue-600 text-4xl" />;
  };

  if (error) return <p className="text-center text-red-600 mt-8">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Premium Services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesData.map((item) => (
          <div
            key={item._id}
            className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-2 flex flex-col items-center text-center"
          >
            <div className="mb-4">{getServiceIcon(item.name)}</div>
            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <div className="flex items-center gap-2 mt-auto">
              <button
                className="bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300"
                onClick={() => {
                  const qty = getQuantity(item.name);
                  if (qty > 0) updateQuantity(item.name, qty - 1);
                }}
              >
                -
              </button>
              <span className="px-2">{getQuantity(item.name)}</span>
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                onClick={() => addToCart({ service: item.name, price: item.price })}
              >
                +
              </button>
              <span className="ml-2 font-bold text-blue-600">₹{item.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceList;
