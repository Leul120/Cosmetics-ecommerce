import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaHeart, FaShippingFast, FaLock, FaSmile, FaRecycle, FaHeadset, FaGift, FaExchangeAlt } from 'react-icons/fa';

const FeatureCard = ({ icon, title, description, index }) => {
  const animation = {
    initial: { opacity: 0, scale: 0.8, rotate: 10, y: 50 },
    animate: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1, // Staggered entrance
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <motion.div
      className="bg-white  duration-300  p-6 h-64 text-center mx-2   min-w-64"
      initial="initial"
      animate="animate"
      variants={animation}
    >
      <div className="text-gray-500 text-4xl mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const WhyChooseUs = () => {
  const features = [
    { id: 1, icon: <FaLeaf />, title: "Quality Product Information", description: "Detailed product descriptions, ingredients lists, and high-quality images." },
    { id: 2, icon: <FaHeart />, title: "Cruelty-Free", description: "All our products are cruelty-free and never tested on animals." },
    { id: 3, icon: <FaShippingFast />, title: "Fast Shipping", description: "We offer quick and reliable shipping to get your products to you fast." },
    { id: 4, icon: <FaLock />, title: "Secure Payment", description: "Your payments are safe and secure with our encrypted checkout process." },
    { id: 5, icon: <FaSmile />, title: "User-Friendly Experience", description: "A well-designed, easy-to-navigate website enhances the shopping experience." },
    { id: 6, icon: <FaRecycle />, title: "Sustainable Practices", description: "We prioritize sustainable sourcing and eco-friendly packaging." },
    { id: 7, icon: <FaHeadset />, title: "Customer Support", description: "Our customer support is available 24/7 to assist you with any queries." },
    { id: 8, icon: <FaGift />, title: "Loyalty Rewards", description: "Join our loyalty program to earn points and enjoy exclusive discounts." },
    { id: 9, icon: <FaExchangeAlt />, title: "Easy Returns", description: "If you're not satisfied, our hassle-free return policy ensures a smooth process." }
  ];

  const carouselRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(true);
  const [isInView, setIsInView] = useState(false); // State to track visibility

  const scrollCarousel = useCallback(() => {
    if (carouselRef.current && isScrolling) {
      if (carouselRef.current.scrollLeft <= 0) {
        carouselRef.current.scrollLeft = carouselRef.current.scrollWidth / 2;
      } else {
        carouselRef.current.scrollLeft -= 1; // Scroll to the left
      }
    }
  }, [isScrolling]);

  useEffect(() => {
    const intervalId = setInterval(scrollCarousel, 30); // Adjust interval for smoother scrolling
    return () => clearInterval(intervalId);
  }, [scrollCarousel]);

  const handleMouseEnter = () => setIsScrolling(false);
  const handleMouseLeave = () => setIsScrolling(true);

  // Intersection Observer to track if component is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // Stop observing after it comes into view
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the component is in view
    );

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }

    return () => {
      observer.disconnect(); // Clean up observer on unmount
    };
  }, []);

  return (
    <section className="pt-6  overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-700">Why Choose Us</h2>

        <div className="relative overflow-hidden">
          <motion.div
            ref={carouselRef}
            className="flex overflow-x-hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0 }} // Initial state before in view
            animate={{ opacity: isInView ? 1 : 0 }} // Fade in when in view
            transition={{ duration: 0.5 }} // Transition duration
          >
            {[...features, ...features].map((feature, index) => (
              <div key={`${feature.id}-${index}`} className="w-72 flex-shrink-0 px-2">
                <FeatureCard {...feature} index={index} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
