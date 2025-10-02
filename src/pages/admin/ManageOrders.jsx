// src/pages/admin/ManageOrders.jsx
import React, { useEffect, useState } from "react";
import API from "../../api";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      const res = await API.get("/admin/orders");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch orders.");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await API.put(`/admin/orders/${id}`, { status });
      setOrders(orders.map(o => (o._id === id ? res.data : o)));
    } catch (err) {
      console.error(err);
      alert("Failed to update status.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (error) return <p className="text-red-600 text-center mt-8">{error}</p>;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Orders
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-xl">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="py-3 px-6">User</th>
              <th className="py-3 px-6">Items</th>
              <th className="py-3 px-6">Total</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b">
                <td className="py-3 px-6">{order.userId?.name}</td>
                <td className="py-3 px-6">
                  {order.items.map(i => `${i.service} (${i.quantity})`).join(", ")}
                </td>
                <td className="py-3 px-6">₹{order.total}</td>
                <td className="py-3 px-6">{order.status}</td>
                <td className="py-3 px-6 text-center">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="border px-2 py-1 rounded"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrders;
