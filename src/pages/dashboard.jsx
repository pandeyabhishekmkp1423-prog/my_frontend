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
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
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
      { src: "https://eu-images.contentstack.com/v3/assets/blte6b9e99033a702bd/blt7e5c15dd5c6fb1a3/67cacb6c91d4b6c9af49e7e3/Top_Shape_1.jpg", alt: "Laundry Service" },
      { src: "https://tumbledry.in/wp-content/uploads/2022/02/Colorful-Laundry-Clothes.jpg", alt: "Colorful Laundry" },
      { src: "https://hips.hearstapps.com/hmg-prod/images/gh-closet-organization-1583437747.png", alt: "Organized Closet" },
      { src: "https://cdn.pixabay.com/photo/2014/08/08/20/54/laundry-413688_1280.jpg", alt: "Laundry Basket" },
      { src: "https://i.pinimg.com/736x/0a/bf/b9/0abfb9a5e38519cd908dcc4a4392e743.jpg", alt: "Shoe Cleaning" },
    ],
    []
  );

  const services = [
    { title: "Wash & Fold", description: "Professional washing and careful folding of your clothes", icon: "🧺" },
    { title: "Dry Cleaning", description: "Expert dry cleaning for delicate and special garments", icon: "👔" },
    { title: "Ironing", description: "Crisp ironing for a polished look", icon: "♨️" },
    { title: "Stain Removal", description: "Specialized treatment for tough stains", icon: "✨" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 px-4 md:px-8">
        <div className="container mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            Welcome to <span className="text-blue-600">Laundry Hamper</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Experience fresh, clean, and perfectly folded laundry—delivered to your doorstep with care and speed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium shadow-md hover:bg-blue-700 transition-colors transform hover:scale-105">
              Schedule Pickup
            </button>
            <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-full text-lg font-medium hover:bg-blue-600 hover:text-white transition-colors">
              Learn More
            </button>
          </div>
        </div>

        {/* Services */}
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Image Slider */}
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Our Work</h2>
          <Swiper
            modules={[Navigation, Pagination, Autoplay, A11y]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{ 640: { slidesPerView: 2 }, 768: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } }}
            loop={true}
            autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            navigation
            pagination={{ clickable: true }}
            a11y={{ enabled: true }}
            className="pb-12"
          >
            {sliderImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative group overflow-hidden rounded-xl">
                  <img src={image.src} alt={image.alt} loading="lazy" className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">{image.alt}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">{isVisible ? <AnimatedCounter end={10} /> : "0"}+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">{isVisible ? <AnimatedCounter end={50} /> : "0"}+</div>
              <div className="text-gray-600">Items Cleaned</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Customer Support</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">{isVisible ? <AnimatedCounter end={98} /> : "0"}%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
