import React from 'react';
import { motion } from 'framer-motion';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const AboutUs = () => {
  return (
    <div className="max-w-full mx-auto py-16 px-4 grid grid-cols-2 gap-32">
      {/* About Us Section */}
      <motion.section
        className="text-center mb-16 "
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <h1 className="text-4xl font-bold text-gray-600 mb-4">About Us</h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Our mission is to deliver exceptional products that enhance the lives of our customers while
          staying true to our core values of innovation, quality, and sustainability.
        </p>
      </motion.section>

      {/* Story of the Business Section */}
      <motion.section
        className="mb-16 text-center"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.8, delay: 0.3, ease: 'easeInOut' }}
      >
        <h2 className="text-4xl font-bold text-gray-600 mb-4">Our Story</h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          Founded in 2020, our company began with a simple goal: to make quality, sustainable products more accessible. 
          Starting as a small business with a passion for innovation, we’ve grown into a thriving brand that values creativity, 
          craftsmanship, and customer satisfaction.
        </p>
      </motion.section>
    </div>
  );
};

export default AboutUs;
