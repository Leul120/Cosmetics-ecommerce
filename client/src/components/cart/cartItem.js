import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMinus, FiPlus, FiTrash2, FiEdit3 } from 'react-icons/fi';

const CartItem = ({ item, onQuantityChange, onRemoveItem, onUpdateNote }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [note, setNote] = useState(item.note || '');

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(1, item.quantity + change);
    onQuantityChange(item._id, newQuantity);
  };

  const handleNoteSubmit = () => {
    onUpdateNote(item._id, note);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white border-b border-gray-200 py-6"
    >
      <div className="flex items-center">
        <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-center object-cover"
          />
        </div>

        <div className="ml-6 flex-1 flex flex-col">
          <div className="flex">
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-medium text-gray-900">
                {item.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {item.size} | {item.status}
              </p>
            </div>

            <div className="ml-4 flex-shrink-0 flow-root">
              <button
                type="button"
                onClick={() => onRemoveItem(item._id)}
                className="-m-2.5 bg-white p-2.5 flex items-center justify-center text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Remove</span>
                <FiTrash2 className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div>{item.note && (<p className='mt-1 text-sm text-gray-500'>{item.note}</p>)}</div>
          <div className="flex-1 pt-2 flex items-end justify-between">
            <p className="mt-1 text-sm font-medium text-gray-900">
              ${item.price.toFixed(2)}
            </p>

            <div className="ml-4">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(-1)}
                  className="p-2 text-gray-600 hover:text-gray-500"
                >
                  <span className="sr-only">Decrease quantity</span>
                  <FiMinus className="h-4 w-4" aria-hidden="true" />
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => onQuantityChange(item._id, Number(e.target.value))}
                  className="w-12 border-transparent text-center text-gray-900 text-sm focus:ring-0 focus:border-transparent"
                  min="1"
                />
                <button
                  type="button"
                  onClick={() => handleQuantityChange(1)}
                  className="p-2 text-gray-600 hover:text-gray-500"
                >
                  <span className="sr-only">Increase quantity</span>
                  <FiPlus className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        {isEditing ? (
          <div className="flex items-center">
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="flex-grow h-7 border-gray-300 px-1 border-b focus:ring-0
              focus:outline-0 sm:text-sm"
              placeholder="Add a note for this item"
            />
            <button
              onClick={handleNoteSubmit}
              className="inline-flex items-center px-3 py-2 border border-transparent h-7 text-sm leading-4 font-medium rounded-r-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FiEdit3 className="h-4 w-4 mr-1" aria-hidden="true" />
            {note ? 'Edit note' : 'Add note'}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default CartItem;