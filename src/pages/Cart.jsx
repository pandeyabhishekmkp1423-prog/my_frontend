// src/pages/CartPage.jsx
import React from "react";
import { useCart } from "./PriceListContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();

  if (cart.length === 0)
    return (
      <div className="text-center mt-16 text-gray-700">
        <p className="text-xl mb-4">Your cart is empty.</p>
        <Link
          to="/price"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors transform hover:scale-105"
        >
          Browse Services
        </Link>
      </div>
    );

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Your Cart</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-blue-50">
            <tr>
              <th className="py-3 px-6 text-left">Service</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Quantity</th>
              <th className="py-3 px-6 text-left">Subtotal</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.service} className="border-b hover:bg-gray-50 transition-all">
                <td className="py-3 px-6 text-gray-800 font-medium">{item.service}</td>
                <td className="py-3 px-6 text-gray-600">₹{item.price}</td>
                <td className="py-3 px-6">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.service, parseInt(e.target.value))
                    }
                    className="border rounded px-2 w-20 text-center focus:ring-2 focus:ring-blue-400"
                  />
                </td>
                <td className="py-3 px-6 font-semibold text-gray-800">
                  ₹{item.price * item.quantity}
                </td>
                <td className="py-3 px-6">
                  <button
                    onClick={() => removeFromCart(item.service)}
                    className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transform hover:scale-105 transition-all"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <h3 className="text-2xl font-bold text-gray-800">
          Total: ₹{getCartTotal()}
        </h3>
        <div className="flex gap-4">
          <button
            onClick={clearCart}
            className="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600 transform hover:scale-105 transition-all"
          >
            Clear Cart
          </button>
          <Link
            to="/checkout"
            className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transform hover:scale-105 transition-all"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
