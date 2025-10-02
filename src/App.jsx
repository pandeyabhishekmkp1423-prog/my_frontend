// src/App.jsx
import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Header from "./component/Header";
import Footer from "./component/Footer";
import LoadingSpinner from "./component/LoadingSpinner";
import CartIcon from "./component/CartIcon";

// Pages
import Dashboard from "./pages/Dashboard";
import PriceList from "./pages/PriceList";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageOrders from "./pages/admin/ManageOrders";
import ManageServices from "./pages/admin/ManageServices";

// Contexts
import { CartProvider } from "./pages/CartContext";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Header />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/price" element={<PriceList />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/orders" element={<ManageOrders />} />
            <Route path="/admin/services" element={<ManageServices />} />

            {/* Fallback */}
            <Route path="*" element={<div className="p-8 text-center">Page Not Found</div>} />
          </Routes>
        </Suspense>
        <CartIcon />
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
