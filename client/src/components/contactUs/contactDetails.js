const ContactDetails = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
      <p className="text-gray-600 mb-4">Email: <a href="mailto:contact@company.com" className="text-gray-800 font-semibold">contact@company.com</a></p>
      <p className="text-gray-600 mb-4">Phone: <span className="text-gray-800 font-semibold">+1 (555) 555-5555</span></p>
      <p className="text-gray-600 mb-4">Location: <span className="text-gray-800 font-semibold">123 Main St, Anytown, USA</span></p>
    </div>
  );
};

export default ContactDetails;
