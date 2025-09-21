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
    setIsMenuOpen(false); // close mobile menu on route change
  }, [location]);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/price", label: "Price List" },
    { path: "/contact", label: "Contact" },
    { path: "/about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Info Bar */}
      <div className="bg-blue-50 h-8 flex items-center justify-center text-xs md:text-sm text-blue-800">
        <CgSmartHomeWashMachine className="text-blue-600 h-4 w-4 mr-1" />
        Hassle-free Laundry at Your Doorstep
      </div>

      {/* Main Header */}
      <div className="container mx-auto flex items-center justify-between py-3 px-4 md:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg md:text-xl">
            LH
          </div>
          <div className="flex flex-col">
            <h1 className="text-base md:text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
              Laundry Hamper
            </h1>
            <p className="text-xs md:text-sm text-gray-500">Fresh & Clean</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 font-medium text-gray-700">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative hover:text-blue-600 transition-colors ${
                location.pathname === item.path ? "text-blue-600 font-semibold" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Auth & Cart (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/register"
            className="bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 text-sm md:text-base"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="border border-blue-600 text-blue-600 px-3 py-1.5 rounded-md hover:bg-blue-600 hover:text-white text-sm md:text-base"
          >
            Login
          </Link>
          <Link
            to="/cart"
            className="relative px-3 py-1.5 rounded-md hover:bg-blue-50 text-blue-600 font-medium flex items-center justify-center"
          >
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="flex flex-col px-4 py-4 gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`py-2 px-3 rounded-md hover:bg-blue-50 text-gray-700 ${
                  location.pathname === item.path ? "bg-blue-50 text-blue-600 font-semibold" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}

            <div className="flex flex-col gap-2 mt-3">
              <Link
                to="/register"
                className="w-full bg-blue-600 text-white py-2 rounded-md text-center"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="w-full border border-blue-600 text-blue-600 py-2 rounded-md text-center hover:bg-blue-600 hover:text-white"
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
