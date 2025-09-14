import React from 'react';

const Contact = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">
            Have questions or need assistance? We're here to help!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Get In Touch</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold mb-3">📍 Visit Us</h3>
              <p className="text-gray-600">123 Laundry Street<br />Clean City, CC 12345</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold mb-3">📞 Call Us</h3>
              <p className="text-gray-600">+1 (555) 123-4567<br />Mon-Fri: 8AM-6PM</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold mb-3">✉️ Email Us</h3>
              <p className="text-gray-600">info@laundryhamper.com<br />We respond within 24 hours</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;