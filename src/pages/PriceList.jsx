import React from "react";
import { useCart } from "./CartContext";
import { FaTshirt, FaShoePrints, FaBed, FaCouch, FaHandSparkles, FaShoppingCart } from "react-icons/fa";

const servicesData = [
  {
    category: "Laundry Services",
    id: "laundry",
    items: [
      { service: "Wash & Fold", price: 50, icon: <FaTshirt className="text-blue-600 text-4xl" />, description: "Professional washing and folding." },
      { service: "Ironing", price: 30, icon: <FaTshirt className="text-blue-600 text-4xl" />, description: "Crisp ironing for polished look." },
      { service: "Dry Cleaning", price: 100, icon: <FaHandSparkles className="text-blue-600 text-4xl" />, description: "Expert cleaning for delicate garments." },
      { service: "Stain Removal", price: 70, icon: <FaHandSparkles className="text-blue-600 text-4xl" />, description: "Specialized treatment for tough stains." },
      { service: "Shoe Cleaning", price: 80, icon: <FaShoePrints className="text-blue-600 text-4xl" />, description: "Thorough cleaning and polishing for shoes." },
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
];

const PriceList = () => {
  const { addToCart, updateQuantity, cart } = useCart();

  const getQuantity = (service) => {
    const item = cart.find((c) => c.service === service);
    return item ? item.quantity : 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Premium Services</h1>
      {servicesData.map((category) => (
        <div key={category.id} className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">{category.category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.items.map((item) => (
              <div key={item.service} className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-2 flex flex-col items-center text-center">
                <div className="mb-4">{item.icon}</div>
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
