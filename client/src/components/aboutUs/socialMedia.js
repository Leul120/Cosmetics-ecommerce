import React from 'react';
import { motion } from 'framer-motion';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const SocialMediaContact = () => {
  return (
    <section className="text-center py-16">
      {/* Heading */}
      <motion.h2
        className="text-3xl font-semibold text-gray-500 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        Stay Connected
      </motion.h2>

      {/* Subtext */}
      <motion.p
        className="text-lg text-gray-600 mb-8"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.8, delay: 0.3, ease: 'easeInOut' }}
      >
        Follow us on social media and stay updated on our latest products and offers.
      </motion.p>

      {/* Social Media Icons */}
      <div className="flex justify-center space-x-6">
        {['facebook', 'twitter', 'instagram'].map((platform, index) => (
          <motion.a
            href={`https://${platform}.com`}
            target="_blank"
            rel="noopener noreferrer"
            key={platform}
            className="text-yellow-600"
            whileHover={{ scale: 1.2 }} // Scale effect on hover
            whileTap={{ scale: 0.9 }}   // Tap effect for mobile interaction
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2, ease: 'easeInOut' }}
          >
            <i className={`fab fa-${platform} fa-2x`}></i>
          </motion.a>
        ))}
      </div>

      {/* Contact Info */}
      <motion.div
        className="mt-8"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.8, delay: 0.6, ease: 'easeInOut' }}
      >
        <p className="text-lg text-gray-600">Email us: contact@company.com</p>
        <p className="text-lg text-gray-600">Call us: +1 (555) 555-5555</p>
      </motion.div>
    </section>
  );
};

export default SocialMediaContact;

