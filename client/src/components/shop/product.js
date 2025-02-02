import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';
import { FaStar, FaShoppingCart, FaEye } from 'react-icons/fa';
import { motion } from 'framer-motion';
import '../../App.css'
const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { setProduct, addToCart } = useContext(AppContext);

  const handleQuickView = () => {
    setProduct(product);
    navigate(`/details/${product.category}/${product._id}`);
  };

  return (
    <motion.div 
      className="card product-card bg-white shadow-lg rounded-lg  overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative">
        <motion.img 
          src={`https://ui-avatars.com/api/?name=${product.name}&background=random&size=200`}
          alt={product.name} 
          className="w-full h-48 object-cover "
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div 
          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button 
            className="p-2 bg-white rounded-full mr-2 hover:bg-gray-100 transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleQuickView}
          >
            <FaEye className="h-5 w-5 text-gray-800" />
          </motion.button>
          
        </motion.div>
        {product.isFeatured && (
          <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 text-xs font-bold rounded">
            New
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 truncate">{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-green-700">${product.sizes[0]?.price}</span>
          <div className="flex items-center">
            <FaStar className="h-4 w-4 text-gray-400 mr-1" />
            <span>{product.ratings?.toFixed(1)}</span>
          </div>
        </div>
        <motion.button 
          className="mt-4 w-full border border-gray-500 text-gray-400 hover:text-white py-2  hover:bg-gray-500 transition-colors duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleQuickView}
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;