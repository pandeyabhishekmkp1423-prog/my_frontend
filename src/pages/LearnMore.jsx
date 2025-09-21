// src/pages/LearnMore.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const reviewsData = [
  { name: "Alice", rating: 5, comment: "Excellent service! My clothes look brand new." },
  { name: "Bob", rating: 4, comment: "Good quality and timely delivery." },
  { name: "Charlie", rating: 5, comment: "Highly recommend Laundry Hamper for delicate fabrics." },
];

const offersData = [
  { title: "Festive Special", description: "Get 20% off on all dry cleaning during the festive season!" },
  { title: "First-Time User", description: "Flat ₹100 off on your first laundry order." },
  { title: "Combo Offer", description: "Wash & Fold + Shoe Cleaning at ₹499 only." },
];

const LearnMore = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setFeedback({ ...feedback, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback submitted:", feedback);
    setSubmitted(true);
    setFeedback({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-8 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        ← Back
      </button>

      {/* Company Info */}
      <section className="max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">About Laundry Hamper</h1>
        <p className="text-gray-600 text-center">
          At Laundry Hamper, we specialize in delivering fresh, clean, and perfectly folded laundry directly to your doorstep.
          Our team uses eco-friendly detergents, advanced washing techniques, and meticulous attention to detail to ensure your clothes get the care they deserve.
        </p>
      </section>

      {/* Special Services */}
      <section className="max-w-6xl mx-auto mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Our Special Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Wash & Fold", "Dry Cleaning", "Shoe Cleaning"].map((service, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-all transform hover:-translate-y-1 hover:scale-105">
              <h3 className="text-xl font-semibold mb-2">{service}</h3>
              <p className="text-gray-600">
                {service === "Wash & Fold" && "Professional washing with careful folding for all types of garments."}
                {service === "Dry Cleaning" && "Expert dry cleaning for delicate fabrics and premium clothing items."}
                {service === "Shoe Cleaning" && "Complete cleaning & polishing for shoes, sneakers, and boots."}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews & Ratings */}
      <section className="max-w-4xl mx-auto mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Customer Reviews</h2>
        <div className="space-y-4">
          {reviewsData.map((r, idx) => (
            <div key={idx} className="bg-white p-4 rounded-lg shadow-sm flex flex-col md:flex-row justify-between items-start hover:shadow-lg transition transform hover:-translate-y-1">
              <div>
                <p className="font-semibold text-gray-800">{r.name}</p>
                <p className="text-yellow-500 text-lg animate-pulse">
                  {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                </p>
              </div>
              <p className="text-gray-600 mt-2 md:mt-0">{r.comment}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feedback Form */}
      <section className="max-w-2xl mx-auto mb-12 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Give Your Feedback</h2>
        {submitted && (
          <p className="text-green-600 text-center mb-4 font-semibold">Thank you for your feedback!</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" value={feedback.name} onChange={handleChange} placeholder="Your Name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          <input type="email" name="email" value={feedback.email} onChange={handleChange} placeholder="Your Email"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          <textarea name="message" value={feedback.message} onChange={handleChange} placeholder="Your Feedback" rows={4}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition">
            Submit Feedback
          </button>
        </form>
      </section>

      {/* Offers & Discounts */}
      <section className="max-w-6xl mx-auto mb-24">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Current Offers & Coupons</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offersData.map((offer, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition transform hover:-translate-y-1 hover:scale-105">
              <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>
              <p className="text-gray-600">{offer.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sticky Book Now Button */}
      <button
        onClick={() => navigate("/checkout")}
        className="fixed bottom-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
      >
        Book Now
      </button>
    </div>
  );
};

export default LearnMore;
