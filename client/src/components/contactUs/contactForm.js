import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send to backend)
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:ring focus:ring-indigo-200"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:ring focus:ring-indigo-200"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Subject</label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:ring focus:ring-indigo-200"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:ring focus:ring-indigo-200"
          required
        />
      </div>
      <button type="submit" className="bg-gray-600 text-white rounded px-4 py-2 hover:bg-gray-700 transition duration-300">
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;
