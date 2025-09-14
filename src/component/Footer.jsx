import React from 'react';
import { Link } from 'react-router-dom';
import { CgSmartHomeWashMachine } from "react-icons/cg";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 px-4 md:px-8 mt-auto">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <CgSmartHomeWashMachine className="text-blue-400 h-6 w-6" />
            <span className="font-bold text-lg">Laundry Hamper</span>
          </div>
          <p className="text-gray-400 mb-4">
            Providing premium laundry services with convenience and care since 2023.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/price" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
            <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4">Services</h3>
          <ul className="space-y-2">
            <li><span className="text-gray-400">Wash & Fold</span></li>
            <li><span className="text-gray-400">Dry Cleaning</span></li>
            <li><span className="text-gray-400">Ironing</span></li>
            <li><span className="text-gray-400">Stain Removal</span></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4">Contact Info</h3>
          <address className="not-italic text-gray-400 space-y-2">
            <p>123 Laundry Street</p>
            <p>Clean City, CC 12345</p>
            <p>info@laundryhamper.com</p>
            <p>+1 (555) 123-4567</p>
          </address>
        </div>
      </div>
      
      <div className="container mx-auto border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} Laundry Hamper. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;