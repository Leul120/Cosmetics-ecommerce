import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ProductCard = ({ name, price, image, onAddToCart }) => (
  <motion.div
    className=" shadow-lg rounded-lg overflow-hidden min-w-64 border-indigo-600 border"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    <img src={image} alt={name} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
      <p className="text-indigo-600 font-bold mb-4">${price.toFixed(2)}</p>
      <motion.button
        onClick={onAddToCart}
        className="bg-indigo-600 text-white px-4 py-2 w-full rounded-full flex items-center justify-center hover:bg-indigo-500 transition duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaShoppingCart className="mr-2" /> Add to Cart
      </motion.button>
    </div>
  </motion.div>
);

export default ProductCard;