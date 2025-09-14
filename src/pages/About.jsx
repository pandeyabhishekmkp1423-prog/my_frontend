import React from 'react';

const About = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">About Laundry Hamper</h1>
          <p className="text-lg text-gray-600">
            We're revolutionizing the way you think about laundry.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
          <div className="p-8">
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-700 mb-6">
              Founded in 2023, Laundry Hamper was born out of a simple idea: laundry shouldn't be a chore.
              We noticed that people were spending their valuable time on laundry when they could be doing
              things they truly enjoy.
            </p>
            <p className="text-gray-700">
              Our mission is to provide exceptional laundry services that save you time and deliver
              impeccable results. We use eco-friendly detergents, state-of-the-art equipment, and
              trained professionals to ensure your clothes receive the best care possible.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4">Our Values</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span className="text-gray-700">Quality: We never compromise on the quality of our service</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span className="text-gray-700">Sustainability: We use eco-friendly products and processes</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span className="text-gray-700">Convenience: We make laundry simple and hassle-free</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span className="text-gray-700">Reliability: You can always count on us to deliver on time</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4">Why Choose Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700">Free pickup and delivery</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700">Eco-friendly detergents</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700">Fast turnaround time</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700">Affordable pricing</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700">Trusted and trained professionals</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Join Us Today</h2>
          <p className="text-gray-700 mb-6">
            Experience a laundry service that truly cares. Let us handle the chores while you enjoy your day.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
