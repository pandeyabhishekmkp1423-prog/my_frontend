// src/pages/CartPage.jsx
import React from "react";
import { useCart } from "./PriceListContext";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();

  if (cart.length === 0)
    return <p className="text-center mt-10 text-gray-700">Your cart is empty.</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Service</th>
            <th className="text-left py-2">Price</th>
            <th className="text-left py-2">Quantity</th>
            <th className="text-left py-2">Subtotal</th>
            <th className="text-left py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => {
            const priceNum = parseInt(item.price.replace("₹", ""));
            return (
              <tr key={item.service} className="border-b">
                <td className="py-2">{item.service}</td>
                <td className="py-2">{item.price}</td>
                <td className="py-2">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.service, parseInt(e.target.value))
                    }
                    className="border rounded px-2 w-16"
                  />
                </td>
                <td className="py-2">₹{priceNum * item.quantity}</td>
                <td className="py-2">
                  <button
                    onClick={() => removeFromCart(item.service)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between items-center">
        <h3 className="text-xl font-bold">Total: ₹{getCartTotal()}</h3>
        <div className="flex gap-2">
          <button
            onClick={clearCart}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Clear Cart
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
