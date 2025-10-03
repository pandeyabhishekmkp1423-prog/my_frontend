{/*}
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useCart } from "./CartContext";
import CartIcon from "../component/CartIcon";

const AnimatedCounter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count.toLocaleString()}+</span>;
};

const Dashboard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { cartCount } = useCart();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const sliderImages = useMemo(
    () => [
      { src: "https://cdn.pixabay.com/photo/2014/08/08/20/54/laundry-413688_1280.jpg", alt: "Laundry Basket" },
      { src: "https://tumbledry.in/wp-content/uploads/2022/02/Colorful-Laundry-Clothes.jpg", alt: "Colorful Laundry" },
      { src: "https://laundrikart.com/wp-content/uploads/2024/05/Shoe-Dryclean-Laundrikart.webp", alt: "Shoe Cleaning" },
      { src: "https://5.imimg.com/data5/SELLER/Default/2023/4/298852622/CQ/EG/TK/42726069/t-shirt-dry-cleaning-service.jpg", alt: "Shirt Cleaning" },
      { src: "https://azdrycleaners.co.uk/wp-content/uploads/2024/03/2150773373-jpg.webp", alt: "Trousers Cleaning" },
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsFGKR5NJO3pIZSgsTsyHxwdaE3AI33ZbU4A&s", alt: "Blankets Cleaning" },
    ],
    []
  );

  const services = [
    { title: "Wash & Fold", description: "Professional washing & careful folding", icon: "🧺" },
    { title: "Dry Cleaning", description: "Expert dry cleaning for delicate garments", icon: "👔" },
    { title: "Ironing", description: "Crisp ironing for a polished look", icon: "♨️" },
    { title: "Stain Removal", description: "Specialized treatment for tough stains", icon: "✨" },
    { title: "Shoe Cleaning", description: "Thorough cleaning for shoes & sneakers", icon: "👟" },
    { title: "Curtain Wash", description: "Deep cleaning for curtains & drapes", icon: "🪟" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white relative">
      <CartIcon />

      <section className="py-12 sm:py-16 px-4 md:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
          Welcome to <span className="text-blue-600">Laundry Hamper</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Fresh, clean, and perfectly folded laundry—delivered to your doorstep.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/pickup-form")}
            className="bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-full text-lg font-medium shadow-md hover:bg-blue-700 transition transform hover:scale-105"
          >
            Schedule Pickup
          </button>
          <button
            onClick={() => navigate("/learn-more")}
            className="border border-blue-600 text-blue-600 px-6 sm:px-8 py-3 rounded-full text-lg font-medium hover:bg-blue-600 hover:text-white transition"
          >
            Learn More
          </button>
        </div>
      </section>

   
      <section className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 px-4">
        {services.map((s, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="text-5xl mb-4 animate-bounce">{s.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
            <p className="text-gray-600">{s.description}</p>
          </div>
        ))}
      </section>


      <section className="container mx-auto mb-12 px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Our Work</h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{ 640: { slidesPerView: 2 }, 768: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } }}
          loop
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
        >
          {sliderImages.map((img, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative overflow-hidden rounded-xl group">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                    {img.alt}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {isVisible ? <AnimatedCounter end={10} /> : "0"}+
            </div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div className="p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {isVisible ? <AnimatedCounter end={50} /> : "0"}+
            </div>
            <div className="text-gray-600">Items Cleaned</div>
          </div>
          <div className="p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
            <div className="text-gray-600">Support</div>
          </div>
          <div className="p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {isVisible ? <AnimatedCounter end={98} /> : "0"}%
            </div>
            <div className="text-gray-600">Satisfaction Rate</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
*/}
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FaTshirt, FaShoePrints, FaBed, FaCouch, FaHandSparkles, FaTruck, FaStar, FaCheckCircle, FaFacebook, FaTwitter, FaInstagram, FaMoon, FaSun } from "react-icons/fa";

// Services
const services = [
  { name: "Wash & Fold", icon: <FaTshirt />, description: "Quick and clean laundry services for your clothes." },
  { name: "Shoe Cleaning", icon: <FaShoePrints />, description: "Keep your shoes spotless and fresh." },
  { name: "Bed Linen", icon: <FaBed />, description: "Premium bed cleaning with soft finish." },
  { name: "Sofa Cleaning", icon: <FaCouch />, description: "Deep clean your sofa & furniture." },
  { name: "Ironing & Pressing", icon: <FaHandSparkles />, description: "Perfectly ironed clothes every time." },
];

// How It Works Steps
const steps = [
  { title: "Schedule Pickup", icon: <FaTruck />, desc: "Pick a convenient time for laundry pickup." },
  { title: "We Clean", icon: <FaCheckCircle />, desc: "Premium cleaning & stain removal." },
  { title: "Fast Delivery", icon: <FaStar />, desc: "Get your fresh laundry delivered on time." },
];

// Testimonials
const testimonials = [
  { name: "Rohit Sharma", text: "Best laundry service ever! Clothes come fresh and on time." },
  { name: "Anjali Mehta", text: "Easy to schedule pickups and really professional cleaning." },
  { name: "Rahul Verma", text: "Highly recommend! My clothes never looked so good." },
];

// Promotions
const promotions = [
  { title: "First Order 20% Off", desc: "Enjoy 20% discount on your first laundry order." },
  { title: "Weekly Laundry Saver", desc: "Schedule weekly pickups and save more!" },
  { title: "Referral Bonus", desc: "Invite friends and earn extra discounts." },
];

// Stats
const statsData = [
  { label: "Orders Processed", value: 1200 },
  { label: "Happy Customers", value: 980 },
  { label: "Cities Covered", value: 12 },
];

const Dashboard = () => {
  const [stats, setStats] = useState(statsData.map(() => 0));
  const [darkMode, setDarkMode] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Animated counters
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => prev.map((v,i) => v < statsData[i].value ? v + Math.ceil(statsData[i].value/50) : statsData[i].value));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Testimonials auto-slide
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setTestimonialIndex(prev => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className={darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"}>

      {/* Dark Mode Toggle */}
      <button 
        onClick={() => setDarkMode(!darkMode)} 
        className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white shadow-lg z-50">
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>

      {/* Floating Schedule Pickup */}
      <Link to="/schedule" className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-105">
        Schedule Pickup
      </Link>

      {/* Hero Section */}
      <section className={`relative h-screen flex flex-col justify-center items-center text-center px-4 md:px-0 ${darkMode ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white' : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'}`}>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">Laundry Hamper</h1>
        <p className="text-xl md:text-2xl mb-8">Fast, Premium, & Hassle-Free Laundry at Your Doorstep</p>
        <div className="flex gap-4">
          <Link to="/schedule" className="bg-white text-blue-700 font-bold px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition transform">Schedule Pickup</Link>
          <Link to="/learnmore" className="bg-blue-800 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition transform">Learn More</Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-around items-center gap-8">
          {statsData.map((s, idx) => (
            <div key={idx} className="text-center">
              <p className="text-4xl font-bold text-blue-600">{stats[idx]}</p>
              <p className="font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {services.map((s, idx) => (
            <div key={idx} className={`flex flex-col items-center text-center p-6 rounded-xl shadow-lg transition transform hover:-translate-y-2 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="text-blue-600 text-5xl mb-4">{s.icon}</div>
              <h3 className="font-semibold mb-2">{s.name}</h3>
              <p className="text-sm">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-blue-50 to-blue-100">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-6xl mx-auto">
          {steps.map((step, idx) => (
            <div key={idx} className={`flex flex-col items-center text-center p-6 rounded-xl shadow-lg transition transform hover:-translate-y-2 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="text-blue-600 text-5xl mb-4">{step.icon}</div>
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Customers Say</h2>
        <div className="max-w-5xl mx-auto relative">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center text-center">
            <p className="text-gray-700 dark:text-gray-300 mb-4">"{testimonials[testimonialIndex].text}"</p>
            <h4 className="font-semibold text-blue-600">{testimonials[testimonialIndex].name}</h4>
          </div>
        </div>
      </section>

      {/* Promotions */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-indigo-50 to-indigo-100">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Special Promotions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {promotions.map((p, idx) => (
            <div key={idx} className={`p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 text-center`}>
              <FaStar className="text-red-500 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section with Leaflet Map */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-blue-50 to-blue-100">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Contact Us</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <form className={`p-6 rounded-xl shadow-md space-y-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
            <input type="text" placeholder="Full Name" className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 transition bg-transparent" />
            <input type="email" placeholder="Email" className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 transition bg-transparent" />
            <textarea placeholder="Message" rows={4} className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 transition bg-transparent resize-none"></textarea>
            <button type="submit" className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition transform hover:scale-105">Send Message</button>
          </form>
          <div className="h-64 w-full rounded-xl shadow-md overflow-hidden">
            <MapContainer center={[28.6139, 77.209]} zoom={12} style={{ height: "100%", width: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              <Marker position={[28.6139, 77.209]}>
                <Popup>Laundry Hamper Location</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Dashboard;
