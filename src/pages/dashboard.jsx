// src/pages/Dashboard.jsx
import React, { useState, useEffect, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="py-16 px-4 md:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
          Welcome to <span className="text-blue-600">Laundry Hamper</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Fresh, clean, and perfectly folded laundry—delivered to your doorstep.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium shadow-md hover:bg-blue-700 transition transform hover:scale-105">
            Schedule Pickup
          </button>
          <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-full text-lg font-medium hover:bg-blue-600 hover:text-white transition">
            Learn More
          </button>
        </div>
      </section>

      {/* Services */}
      <section className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 px-4">
        {services.map((s, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 motion-reduce:transition-none"
          >
            <div className="text-5xl mb-4 animate-bounce">{s.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
            <p className="text-gray-600">{s.description}</p>
          </div>
        ))}
      </section>

      {/* Image Slider */}
      <section className="container mx-auto mb-12 px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Our Work</h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay, A11y]}
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

      {/* Stats */}
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
