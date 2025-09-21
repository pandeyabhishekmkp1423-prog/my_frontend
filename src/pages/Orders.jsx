import React, { useContext } from "react";
import { OrdersContext } from "./OrdersContext";

const Orders = () => {
  const { orders } = useContext(OrdersContext);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Your Orders</h1>
      {orders.length === 0 ? (
        <p className="text-center text-gray-600">You have no orders yet.</p>
      ) : (
        <div className="max-w-4xl mx-auto grid gap-6">
          {orders.map((order, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-md">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Name:</strong> {order.name}</p>
              <p><strong>Email:</strong> {order.email}</p>
              <p><strong>Pickup Address:</strong> {order.address}</p>
              <p><strong>Date:</strong> {order.date}</p>
              <p><strong>Items:</strong> {order.items?.join(", ") || "None"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
