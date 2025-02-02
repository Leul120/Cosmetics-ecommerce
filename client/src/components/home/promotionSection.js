import React from 'react';
import { Link } from 'react-router-dom';
import { FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';

const PromotionSection = () => {
  return (
    <section className="relative py-16 overflow-hidden">
      <motion.div 
        className="container mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="relative  rounded-xl  p-10 text-center  "
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Animated Decorative Elements */}
          
         

          {/* Promotion Text */}
          <motion.h2 
            className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gray-800 drop-shadow-lg"
            animate={{ 
              backgroundPosition: ['0%', '100%', '0%'],
            }}
            transition={{ 
              duration: 5, 
              ease: "linear", 
              repeat: Infinity 
            }}
          >
            Summer Sale!
          </motion.h2>
          <motion.p 
            className="text-2xl text-gray-700 mb-8 font-semibold"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Get <span className="text-yellow-500 font-bold">20% off</span> on all products. Limited time offer!
          </motion.p>

          {/* Timer Section */}
          <motion.div 
            className="flex items-center justify-center mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.4 }}
          >
            <div className="flex items-center bg-stone-100 px-4 py-2 rounded-full shadow-inner">
              <FaClock className="text-yellow-600 mr-3 text-xl" />
              <span className="text-lg font-semibold text-gray-800">
                Ends in: <motion.span 
                           className="text-yellow-500"
                           animate={{ opacity: [1, 0.5, 1] }}
                           transition={{ duration: 2, repeat: Infinity }}
                         >
                           2d 5h 30m
                         </motion.span>
              </span>
            </div>
          </motion.div>

          {/* Call to Action Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/shop"
              className="bg-gray-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg inline-flex items-center justify-center hover:bg-yellow-700 transition duration-300 ease-in-out"
            >
              Shop Now
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PromotionSection;