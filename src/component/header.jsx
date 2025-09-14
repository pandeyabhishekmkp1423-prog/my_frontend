// src/component/Header.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { CgSmartHomeWashMachine } from "react-icons/cg";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { useCart } from "../pages/PriceListContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { cartCount } = useCart();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/contact", label: "Contact" },
    { path: "/price", label: "Price List" },
    { path: "/about", label: "About" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Tagline */}
      <div className="bg-blue-50 h-10 flex items-center justify-center gap-2">
        <CgSmartHomeWashMachine className="text-blue-600 h-5 w-5" />
        <h1 className="text-blue-800 text-sm md:text-base font-medium">
          We will return your items – no hassle, no fuss!
        </h1>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between relative">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            LH
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold text-lg tracking-tight group-hover:text-blue-600 transition-colors">
              Laundry Hamper
            </h1>
            <p className="text-xs text-gray-500">Fresh & Clean</p>
          </div>
        </Link>

        {/* Centered Navigation */}
        <nav className="hidden md:flex gap-6 text-gray-700 font-medium absolute left-1/2 transform -translate-x-1/2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`hover:text-blue-600 transition-colors ${
                location.pathname === item.path ? "text-blue-600 font-bold" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Side: Register, Login, Cart */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/register"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors font-medium"
          >
            Login
          </Link>
          <Link
            to="/cart"
            className="relative flex items-center text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition"
          >
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-700"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3">
          <nav className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors ${
                  location.pathname === item.path
                    ? "bg-blue-50 text-blue-600 font-bold"
                    : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <Link
              to="/cart"
              className="relative py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              <span className="ml-2 font-medium text-blue-600">Cart</span>
            </Link>

            <div className="flex gap-3 pt-3 border-t border-gray-200 mt-3">
              <Link
                to="/register"
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
              <Link
                to="/login"
                className="flex-1 border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors font-medium text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
