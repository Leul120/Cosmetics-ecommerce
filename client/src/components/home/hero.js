import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../../App.css'
const useTypewriter = (text, speed = 150, delay = 500) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else {
      const resetTimer = setTimeout(() => {
        setDisplayText('');
        setIndex(0);
      }, delay);
      return () => clearTimeout(resetTimer);
    }
  }, [index, text, speed, delay]);

  return displayText;
};

export default function Hero() {
  const typewriterText = useTypewriter("Starts Here.", 150, 500);
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.3, when: "beforeChildren", staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 0px 12px rgba(255, 99, 71, 0.7)",
      transition: { duration: 0.3, yoyo: Infinity },
    },
    tap: { scale: 0.95 },
  };

  const cursorVariants = {
    blink: {
      opacity: [0, 1],
      transition: { duration: 0.5, repeat: Infinity, repeatType: "reverse" },
    },
  };

  return (
    <motion.div
      className="relative flex flex-col md:flex-row h-screen bg-gradient-to-b from-neutral-500 to-white"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      ref={ref}
    >
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-xl text-center md:text-left">
          <motion.h1
            className="text-4xl font-extrabold text-gray-800 sm:text-5xl md:text-6xl leading-tight"
            variants={itemVariants}
          >
            <motion.span
              className="block"
              style={{
                fontFamily: "'Poppins', sans-serif",
                
              }}
            >
              Your Cosmetic Journey
            </motion.span>
            <motion.span
              className="block text-gray-700 font-cursive"
              variants={itemVariants}
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: '2.5rem',
                fontWeight: '500',
              }}
            >
              {typewriterText}
              <motion.span
                variants={cursorVariants}
                animate="blink"
                className="inline-block w-1 h-8 ml-1 bg-yellow-400"
                style={{ width: '2px', height: '2rem' }}
              />
            </motion.span>
          </motion.h1>
          <motion.p
            className="mt-5 text-lg text-gray-600 sm:text-xl md:mt-6 max-w-md"
            variants={itemVariants}
            style={{ fontFamily: "'Arial', sans-serif" }}
          >
            Discover the magic of beauty with our exquisite collection of cosmetics, skincare, and self-care products.
          </motion.p>
          <motion.div
            className="mt-10 flex justify-center md:justify-start space-x-4"
            variants={itemVariants}
          >
            <motion.a
              href="/shop"
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
            >
              Shop Now
            </motion.a>
            <motion.a
              href="/about"
              className="px-8 py-3 bg-gray-600 text-white font-medium rounded-lg shadow-lg hover:bg-gray-700 transition-all duration-300"
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
            >
              Learn More
            </motion.a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

