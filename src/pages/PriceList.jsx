// src/pages/PriceList.jsx
import React, { useEffect, useState } from "react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

const PriceList = () => {
  const [cart, setCart] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")); // logged-in user
  const userId = user?._id;

  // Services organized by category
  const servicesByCategory = {
    Clothing: [
      { name: "Shirt (Wash & Iron)", price: 50, popular: false },
      { name: "Trousers (Wash & Iron)", price: 60, popular: false },
      { name: "Jacket Dry Cleaning", price: 120, popular: true },
    ],
    "Home Appliances": [
      { name: "Curtains Cleaning", price: 200, popular: false },
      { name: "Sofa Cleaning", price: 300, popular: true },
    ],
    Blankets: [
      { name: "Bedsheet (Double)", price: 100, popular: true },
      { name: "Blanket Cleaning", price: 150, popular: true },
      { name: "Pillow Cover", price: 30, popular: false },
    ],
    Shoes: [
      { name: "Shoe Cleaning", price: 80, popular: false },
      { name: "Sneaker Wash", price: 100, popular: true },
    ],
  };

  // Fetch cart from backend
  const fetchCart = async () => {
    if (!userId) return;
    const res = await fetch(`http://localhost:5000/api/cart/${userId}`);
    const data = await res.json();
    setCart(data);
  };

  useEffect(() => {
    fetchCart();
  }, [userId]);

  const addToCart = async (item) => {
    if (!userId) return alert("Please login first");
    await fetch(`http://localhost:5000/api/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, service: item.name, price: item.price, quantity: 1 }),
    });
    fetchCart();
  };

  const removeFromCart = async (service) => {
    if (!userId) return;
    await fetch(`http://localhost:5000/api/cart/${userId}/${service}`, {
      method: "DELETE",
    });
    fetchCart();
  };

  const updateQuantity = async (service, quantity) => {
    if (!userId) return;
    // Remove item if quantity < 1
    if (quantity < 1) return removeFromCart(service);

    // Update quantity via POST (simpler approach)
    await fetch(`http://localhost:5000/api/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, service, price: cart.find(c => c.service === service).price, quantity: quantity - cart.find(c => c.service === service).quantity }),
    });
    fetchCart();
  };

  const getCartTotal = () =>
    cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Price List
      </h1>

      {Object.entries(servicesByCategory).map(([category, services]) => (
        <section key={category} className="mb-12">
          <h2 className="text-3xl font-semibold mb-8 text-blue-600 border-b-2 border-blue-100 pb-2">
            {category}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((item) => {
              const inCart = cart.find((c) => c.service === item.name);

              return (
                <div
                  key={item.name}
                  className="relative bg-white rounded-2xl shadow-lg p-6 pt-12 hover:shadow-2xl transition-shadow duration-300"
                >
                  {item.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-md">
                      Popular
                    </span>
                  )}

                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-xl">{item.name}</h3>
                    <span className="text-blue-600 font-bold text-lg">₹{item.price}</span>
                  </div>

                  {inCart ? (
                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() => updateQuantity(item.name, inCart.quantity - 1)}
                        className="bg-gray-200 p-2 rounded hover:bg-gray-300 transition"
                      >
                        <FaMinus />
                      </button>
                      <span className="text-lg font-medium">{inCart.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.name, inCart.quantity + 1)}
                        className="bg-gray-200 p-2 rounded hover:bg-gray-300 transition"
                      >
                        <FaPlus />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.name)}
                        className="ml-auto text-red-500 hover:text-red-700 transition"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(item)}
                      className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {cart.length > 0 && (
        <div className="fixed bottom-6 right-6 bg-blue-600 text-white border shadow-lg p-6 rounded-xl w-80 z-50">
          <h3 className="font-bold text-lg mb-4">Cart Summary</h3>
          <ul className="space-y-2 max-h-48 overflow-y-auto">
            {cart.map((item) => (
              <li key={item.service} className="flex justify-between items-center">
                <span>
                  {item.service} x {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-blue-400 mt-4 pt-2 font-bold flex justify-between">
            <span>Total</span>
            <span>₹{getCartTotal()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceList;
