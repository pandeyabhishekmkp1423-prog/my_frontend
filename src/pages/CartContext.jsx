import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const existing = cart.find((c) => c.service === item.service);
    if (existing) {
      setCart((prev) =>
        prev.map((c) =>
          c.service === item.service ? { ...c, quantity: c.quantity + 1 } : c
        )
      );
    } else {
      setCart((prev) => [...prev, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (service, newQty) => {
    if (newQty <= 0) return removeFromCart(service);
    setCart((prev) =>
      prev.map((c) => (c.service === service ? { ...c, quantity: newQty } : c))
    );
  };

  const removeFromCart = (service) => setCart((prev) => prev.filter((c) => c.service !== service));
  const clearCart = () => setCart([]);
  const getCartTotal = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartTotal,
        cartCount: cart.reduce((t, i) => t + i.quantity, 0),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
