import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SortDropdown = ({ sort, setSort }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { value: 'popularity', label: 'Popularity', icon: '🔥' },
    { value: 'price', label: 'Price', icon: '💰' },
    { value: 'newest', label: 'Newest', icon: '🆕' },
  ];

  const currentOption = options.find(option => option.value === sort);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleOptionClick = (value) => {
    setSort(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left z-10" ref={dropdownRef}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group"
      >
        <button
          onClick={handleToggle}
          className="inline-flex justify-center items-center w-full text-nowrap text-sm font-medium text-stone-600 border border-gray-500  p-3  ml-2"
        >
          {currentOption ? (
            <>
              <span className="mr-2">{currentOption.icon}</span>
              {currentOption.label}
            </>
          ) : (
            'Sort by'
          )}
          <svg 
            className={`w-5 h-5 ml-2 transition-transform duration-200 transform ${isOpen ? 'rotate-180' : ''}`} 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor" 
            aria-hidden="true"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
          >
            <div className="py-1">
              {options.map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => handleOptionClick(option.value)}
                  className={`${
                    option.value === sort ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  } group flex items-center w-full px-4 py-2 text-sm hover:bg-gray-50`}
                  whileHover={{ scale: 1.05, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="mr-2">{option.icon}</span>
                  {option.label}
                  {option.value === sort && (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-5 h-5 ml-auto text-indigo-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </motion.svg>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SortDropdown;