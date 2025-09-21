// src/pages/PriceList.jsx
import React from "react";
import { useCart } from "./PriceListContext";
import { FaTshirt, FaShoePrints, FaBed, FaCouch, FaHandSparkles, FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";

const servicesData = [
  {
    category: "Laundry Services",
    id: "laundry",
    items: [
      { service: "Wash & Fold", price: 50, icon: <FaTshirt className="text-blue-600 text-4xl" />, description: "Professional washing and folding." },
      { service: "Ironing", price: 30, icon: <FaTshirt className="text-blue-600 text-4xl" />, description: "Crisp ironing for polished look." },
      { service: "Dry Cleaning", price: 100, icon: <FaHandSparkles className="text-blue-600 text-4xl" />, description: "Expert cleaning for delicate garments." },
      { service: "Stain Removal", price: 70, icon: <FaHandSparkles className="text-blue-600 text-4xl" />, description: "Specialized treatment for tough stains." },
    ],
  },
  {
    category: "Home Textiles",
    id: "home",
    items: [
      { service: "Bed Sheet Wash", price: 120, icon: <FaBed className="text-blue-600 text-4xl" />, description: "Deep wash and fresh fold for bed sheets." },
      { service: "Sofa Cleaning", price: 350, icon: <FaCouch className="text-blue-600 text-4xl" />, description: "Expert cleaning for sofas and upholstery." },
    ],
  },
  {
    category: "Shoe & Accessories",
    id: "shoes",
    items: [
      { service: "Shoe Cleaning", price: 80, icon: <FaShoePrints className="text-blue-600 text-4xl" />, description: "Thorough cleaning and polishing for shoes." },
    ],
  },
];

const PriceList = () => {
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Premium Services</h1>

      {servicesData.map((category) => (
        <div key={category.id} className="mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800">{category.category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.items.map((item, idx) => (
              <motion.div
                key={item.service}
                className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-center hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl md:text-2xl font-semibold mb-2">{item.service}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex items-center justify-between w-full mt-auto">
                  <span className="text-lg md:text-xl font-bold text-blue-600">₹{item.price}</span>
                  <motion.button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToCart({ ...item, quantity: 1 })}
                  >
                    <FaShoppingCart /> Add
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PriceList;
