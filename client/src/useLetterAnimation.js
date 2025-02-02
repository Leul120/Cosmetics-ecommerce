// src/components/AnimatedText.js
import React from 'react';
import { motion } from 'framer-motion';

const AnimatedText = ({ text }) => {
  return (
    <div className="flex">
      {text.split('').map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }} // Stagger effect
          className="inline-block"
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
};

export default AnimatedText;


