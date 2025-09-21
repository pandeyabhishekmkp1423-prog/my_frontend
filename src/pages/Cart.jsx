import React from "react";
import { useCart } from "./CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } =
    useCart();

  if (!cart || cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-700">
        <p className="text-xl mb-4">🛒 Your cart is empty.</p>
        <Link
          to="/price"
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all transform hover:scale-105"
        >
          Browse Services
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Your Cart
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-50">
            <tr>
              <th className="py-3 px-4 text-left">Service</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-center">Quantity</th>
              <th className="py-3 px-4 text-left">Subtotal</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr
                key={item.service}
                className="border-b hover:bg-gray-50 transition-all"
              >
                <td className="py-3 px-4 font-medium text-gray-800">
                  {item.service}
                </td>
                <td className="py-3 px-4 text-gray-600">₹{item.price}</td>
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.service, item.quantity - 1)
                      }
                      className="bg-gray-200 text-gray-800 px-2 rounded-full hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.service, item.quantity + 1)
                      }
                      className="bg-gray-200 text-gray-800 px-2 rounded-full hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="py-3 px-4 font-semibold text-gray-800">
                  ₹{item.price * item.quantity}
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => removeFromCart(item.service)}
                    className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition-all"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <h3 className="text-2xl font-bold text-gray-800">
          Total: ₹{getCartTotal()}
        </h3>
        <div className="flex gap-4">
          <button
            onClick={clearCart}
            className="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600 transition-all"
          >
            Clear Cart
          </button>
          <Link
            to="/checkout"
            className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-all"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
