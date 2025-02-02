// src/components/Modal.js
import React from 'react';
import { motion } from 'framer-motion';

const Modal = ({ isOpen, onClose, product }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-scroll pt-96">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="bg-white mt-64 rounded-lg p-6 max-w-lg w-full shadow-lg  "
      >
        <h2 className="text-2xl font-bold mb-4">{product.product_name}</h2>
        <img src={product.image_url} alt={product.product_name} className="mb-4 rounded-lg h-48 object-cover w-full" />
        <p className="text-gray-700 mb-4">{product.description}</p>
        
        <h3 className="text-lg font-semibold mb-2">Ingredients:</h3>
        <ul className="list-disc list-inside mb-4">
          {product.ingredients.map((ingredient, index) => (
            <li key={index} className="text-gray-600">{ingredient}</li>
          ))}
        </ul>

        <h3 className="text-lg font-semibold mb-2">Uses:</h3>
        <p className="text-gray-600 mb-4">{product.uses}</p>

        <h3 className="text-lg font-semibold mb-2">Side Effects:</h3>
        <ul className="list-disc list-inside mb-4">
          {product.side_effects.map((effect, index) => (
            <li key={index} className="text-gray-600">{effect}</li>
          ))}
        </ul>

        <h3 className="text-lg font-semibold mb-2">Distinguishing Features:</h3>
        <p className="text-gray-600 mb-4">{product.distinguishing_features}</p>

        <h3 className="text-lg font-semibold mb-2">Additional Properties:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {Object.entries(product.additional_properties).map(([key, value]) => (
            <div key={key} className="p-4 border rounded-md shadow-md bg-gray-100">
              <strong className="text-gray-800">{key.replace(/_/g, ' ')}:</strong>
              <p className="text-gray-600">{String(value)}</p>
            </div>
          ))}
        </div>

        <button 
          onClick={onClose}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};

export default Modal;
