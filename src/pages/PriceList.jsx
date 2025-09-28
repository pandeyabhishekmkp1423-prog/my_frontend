// src/component/PriceList.jsx
import React, { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import API from "../api"; // ensure your api.js exports axios with baseURL
import { FaTshirt, FaShoePrints, FaBed, FaCouch, FaHandSparkles } from "react-icons/fa";

const PriceList = () => {
  const { addToCart, updateQuantity, cart } = useCart();
  const [servicesData, setServicesData] = useState([]);
  const [error, setError] = useState("");

  // Fetch services from backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await API.get("/services"); // fetch from backend
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

  const getServiceIcon = (serviceName) => {
    if (serviceName.includes("Wash")) return <FaTshirt className="text-blue-600 text-4xl" />;
    if (serviceName.includes("Shoe")) return <FaShoePrints className="text-blue-600 text-4xl" />;
    if (serviceName.includes("Bed")) return <FaBed className="text-blue-600 text-4xl" />;
    if (serviceName.includes("Sofa")) return <FaCouch className="text-blue-600 text-4xl" />;
    return <FaHandSparkles className="text-blue-600 text-4xl" />;
  };

  if (error) {
    return <p className="text-center text-red-600 mt-8">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Premium Services</h1>
      {servicesData.map((category) => (
        <div key={category.id} className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">{category.category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.items.map((item) => (
              <div
                key={item.service}
                className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-2 flex flex-col items-center text-center"
              >
                <div className="mb-4">{getServiceIcon(item.service)}</div>
                <h3 className="text-xl font-semibold mb-2">{item.service}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex items-center gap-2 mt-auto">
                  <button
                    className="bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300"
                    onClick={() => {
                      const qty = getQuantity(item.service);
                      if (qty > 0) updateQuantity(item.service, qty - 1);
                    }}
                  >
                    -
                  </button>
                  <span className="px-2">{getQuantity(item.service)}</span>
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                    onClick={() => addToCart(item)}
                  >
                    +
                  </button>
                  <span className="ml-2 font-bold text-blue-600">₹{item.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PriceList;
