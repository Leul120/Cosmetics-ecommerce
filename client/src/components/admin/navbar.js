import { MdAnalytics, MdProductionQuantityLimits } from 'react-icons/md'; // Material Design icons
import { FaShoppingBag, FaUsers } from 'react-icons/fa'; // FontAwesome icons
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
     <div className="flex flex-col  h-32 bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg">
      <div className="flex items-center justify-center h-20 bg-purple-800">
        <h1 className="text-white text-3xl font-bold">Admin Panel</h1>
      </div>
      <nav className="flex-grow p-6">
        <ul className="space-y-6">
          <li>
            <Link to="/admin/products" className="flex items-center text-white hover:bg-indigo-700 p-3 rounded-lg transition duration-200">
              <MdProductionQuantityLimits className="h-6 w-6 mr-3 text-white" />
              <span className="text-lg font-medium">Products</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/orders" className="flex items-center text-white hover:bg-indigo-700 p-3 rounded-lg transition duration-200">
              <FaShoppingBag className="h-6 w-6 mr-3 text-white" />
              <span className="text-lg font-medium">Orders</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/users" className="flex items-center text-white hover:bg-indigo-700 p-3 rounded-lg transition duration-200">
              <FaUsers className="h-6 w-6 mr-3 text-white" />
              <span className="text-lg font-medium">Users</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/analytics" className="flex items-center text-white hover:bg-indigo-700 p-3 rounded-lg transition duration-200">
              <MdAnalytics className="h-6 w-6 mr-3 text-white" />
              <span className="text-lg font-medium">Analytics</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>

  );
};

export default Navbar;
