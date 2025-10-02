// src/pages/admin/AdminDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <Link
          to="/admin/users"
          className="bg-blue-600 text-white p-6 rounded-xl shadow hover:bg-blue-700 transition text-center font-semibold"
        >
          Manage Users
        </Link>
        <Link
          to="/admin/orders"
          className="bg-green-600 text-white p-6 rounded-xl shadow hover:bg-green-700 transition text-center font-semibold"
        >
          Manage Orders
        </Link>
        <Link
          to="/admin/services"
          className="bg-purple-600 text-white p-6 rounded-xl shadow hover:bg-purple-700 transition text-center font-semibold"
        >
          Manage Services
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
