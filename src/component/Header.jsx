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
    { path: "/price", label: "Price List" },
    { path: "/contact", label: "Contact" },
    { path: "/about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="bg-blue-50 h-10 flex items-center justify-center gap-2 px-4">
        <CgSmartHomeWashMachine className="text-blue-600 h-5 w-5" />
        <span className="text-blue-800 text-sm font-medium">
          Hassle-free Laundry at Your Doorstep
        </span>
      </div>

      <div className="container mx-auto px-4 py-4 flex items-center justify-between relative">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg sm:text-xl">
            LH
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold text-lg sm:text-xl md:text-2xl text-gray-800 hover:text-blue-600 transition-colors">
              Laundry Hamper
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">Fresh & Clean</p>
          </div>
        </Link>

        <nav className="hidden md:flex gap-6 font-medium text-gray-700 absolute left-1/2 transform -translate-x-1/2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative hover:text-blue-600 transition-colors ${
                location.pathname === item.path ? "text-blue-600 font-semibold" : ""
              }`}
            >
              {item.label}
              {location.pathname === item.path && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 rounded"></span>
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2 sm:gap-4">
          <Link
            to="/register"
            className="bg-blue-600 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="border border-blue-600 text-blue-600 px-3 sm:px-4 py-1 sm:py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors font-medium"
          >
            Login
          </Link>

          <Link
            to="/cart"
            className="relative px-3 sm:px-4 py-1 sm:py-2 rounded-lg hover:bg-blue-50 transition flex items-center justify-center text-blue-600 font-medium"
          >
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
        </button>
      </div>

      <div
        className={`md:hidden bg-white border-t border-gray-200 transition-transform duration-300 ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav className="flex flex-col gap-2 px-4 py-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors text-center ${
                location.pathname === item.path ? "bg-blue-50 text-blue-600 font-semibold" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}

          <Link
            to="/cart"
            className="relative py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center"
          >
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
            <span className="ml-2 font-medium text-blue-600">Cart</span>
          </Link>

          <div className="flex flex-col sm:flex-row gap-2 mt-3 border-t border-gray-200 pt-3">
            <Link
              to="/register"
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="flex-1 border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors font-medium text-center"
            >
              Login
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
