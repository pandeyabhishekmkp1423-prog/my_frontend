import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../pages/CartContext";

const CartIcon = () => {
  const { cartCount } = useCart();

  return (
    <Link
      to="/cart"
      className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg z-50 flex items-center justify-center hover:bg-blue-700 transition-colors"
    >
      🛒
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
