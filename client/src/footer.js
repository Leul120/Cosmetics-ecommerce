// src/components/Footer.js
export default function Footer() {
  return (
    <footer className="bg-gray-100 w-full text-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-300">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-300">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold">Customer Service</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-300">Shipping Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-300">Returns & Refunds</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold">Follow Us</h3>
            <div className="mt-4 flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-300">Facebook</a>
              <a href="#" className="text-gray-600 hover:text-gray-300">Instagram</a>
              <a href="#" className="text-gray-600 hover:text-gray-300">Twitter</a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
