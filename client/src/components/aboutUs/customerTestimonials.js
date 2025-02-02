import React from 'react';
import { motion } from 'framer-motion';

// Animation variants for the testimonial cards
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Testimonials = () => {
  const testimonials = [
    { quote: 'Amazing products, exceptional quality!', customer: 'Alice Johnson' },
    { quote: 'Excellent customer service and fast shipping.', customer: 'Mark Daniels' },
    // Add more testimonials here
  ];

  return (
    <section className="py-16 px-3">
      <motion.h2
        className="text-3xl font-semibold text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        What Our Customers Say
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className=" p-6"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{
              duration: 0.8,
              ease: 'easeInOut',
              delay: index * 0.3, // Stagger animations for each testimonial
            }}
          >
            <p className="text-lg text-gray-600 italic mb-4">"{testimonial.quote}"</p>
            <p className="text-gray-400 font-semibold">- {testimonial.customer}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;

