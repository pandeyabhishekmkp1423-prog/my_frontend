// src/component/PriceList.jsx
import React, { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import API from "../api"; 
import { FaTshirt, FaShoePrints, FaBed, FaCouch, FaHandSparkles } from "react-icons/fa";

const PriceList = () => {
  const { addToCart, updateQuantity, cart } = useCart();
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchServices = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await API.get("/services");
      setServicesData(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch services:", err);
      setError("⚠️ Couldn’t load services. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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

  // 🔹 Skeleton Loader Component
  const SkeletonCard = () => (
    <div className="bg-white p-6 rounded-xl shadow animate-pulse flex flex-col items-center text-center">
      <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
      <div className="h-4 w-32 bg-gray-200 mb-2 rounded"></div>
      <div className="h-3 w-20 bg-gray-200 mb-4 rounded"></div>
      <div className="flex items-center gap-2 mt-auto">
        <div className="h-8 w-8 bg-gray-200 rounded"></div>
        <div className="h-6 w-10 bg-gray-200 rounded"></div>
        <div className="h-8 w-8 bg-gray-200 rounded"></div>
        <div className="h-4 w-12 bg-gray-200 rounded"></div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Our Premium Services</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6).fill(0).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <p className="text-red-600 font-semibold mb-4">{error}</p>
        <button
          onClick={fetchServices}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          🔄 Retry
        </button>
      </div>
    );
  }

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
