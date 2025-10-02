// src/component/AdminLayout.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const AdminLayout = () => {
  const adminLinks = [
    { path: "/admin", label: "Dashboard" },
    { path: "/admin/orders", label: "Orders" },
    { path: "/admin/users", label: "Users" },
    { path: "/admin/services", label: "Services" },
    { path: "/admin/analytics", label: "Analytics" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 border-r p-6 hidden md:block">
          <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
          <nav className="flex flex-col gap-4">
            {adminLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
