import React, { lazy, Suspense, useState, useEffect, useRef, useContext } from 'react';
import { motion, useScroll, useTransform, useSpring, useAnimation } from 'framer-motion';
import { AppContext } from '../../App';
import '../../App.css';
// Lazy load components (unchanged)
const AnnouncementBar = lazy(() => import('./announcementBar'));
const Hero = lazy(() => import('./hero'));
const FeaturedProducts = lazy(() => import('./featuredProducts'));
const ProductCategories = lazy(() => import('./productCategories'));
const PromotionSection = lazy(() => import('./promotionSection'));
const Testimonials = lazy(() => import('./testimonials'));
const WhyChooseUs = lazy(() => import('./whyChooseUs'));
const aboutUs = lazy(() => import('../aboutUs/AboutPage'));
const faq = lazy(() => import('./faq'));

// Simplified loading placeholder
const LoadingPlaceholder = () => (
  <div className="flex justify-center items-center h-64">
    <motion.div
      className="w-full h-44  rounded-full"
      // animate={{ rotate: 360 }}
      // transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

// Efficient LazyComponent with fade-in animation
const LazyComponent = ({ component: Component, placeholder }) => {
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          controls.start({ opacity: 1, y: 0 });
          observer.unobserve(componentRef.current);
        }
      },
      { threshold: 0.1 }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, [controls]);

  return (
    <motion.div
      ref={componentRef}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {isVisible ? (
        <Suspense fallback={<LoadingPlaceholder />}>
          <Component />
        </Suspense>
      ) : placeholder}
    </motion.div>
  );
};

// Updated ParallaxBackground with multiple backgrounds
const ParallaxBackground = () => {
  const { scrollYProgress } = useScroll();

  // Set different transform values for each background image
  const y1 = useTransform(scrollYProgress, [0, 0.3], ['0%', '100%']);
  const y2 = useTransform(scrollYProgress, [0.3, 0.6], ['0%', '100%']);
  const y3 = useTransform(scrollYProgress, [0.6, 0.9], ['0%', '100%']);

  // Fade opacity transition between images
  const opacity1 = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.1,0.7], [1,0]);
  const opacity3 = useTransform(scrollYProgress, [0.6, 1], [0, 1]);

  return (
    <div className="fixed inset-0 w-full h-full z-[-1] overflow-hidden">
      {/* Background 1 */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://img.freepik.com/free-vector/abstract-background-with-minimalist-design_1048-13338.jpg?ga=GA1.1.1136005002.1726668034&semt=ais_hybrid')",
          y: y1,
          opacity: opacity1,
          // filter: 'blur(2px)', // Add a blur effect
          transition: 'opacity 0.5s ease-in-out', // Smooth transition
        }}
      />

      {/* Background 2 */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://img.freepik.com/free-vector/abstract-background-with-minimalist-design_1048-13338.jpg?ga=GA1.1.1136005002.1726668034&semt=ais_hybrid')",
          y: y2,
          opacity: opacity2,
          // filter: 'blur(2px)',
          transition: 'opacity 0.5s ease-in-out',
        }}
      />

      {/* Background 3 */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://img.freepik.com/free-vector/abstract-background-with-minimalist-design_1048-13338.jpg?ga=GA1.1.1136005002.1726668034&semt=ais_hybrid')",
          y: y3,
          opacity: opacity3,
          // filter: 'blur(2px)',
          transition: 'opacity 0.5s ease-in-out',
        }}
      />
    </div>
  );
};

// Efficient scroll progress indicator
const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-blue-500 z-50 origin-left"
      style={{ scaleX }}
    />
  );
};

// Smooth scroll to top function
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Efficient floating button component
const FloatingButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsVisible(latest > 300);
    });
  }, [scrollY]);

  return (
    <motion.button
      className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
      onClick={scrollToTop}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      ↑
    </motion.button>
  );
};

const Homepage = () => {
  const { setNav } = useContext(AppContext);

  useEffect(() => {
    setNav("Home");
  }, [setNav]);

  return (
    <motion.div
      className="relative "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* <ParallaxBackground /> */}
      <ScrollProgressBar />
      <FloatingButton />
      
      <div className="relative z-10">
        <LazyComponent 
          component={Hero} 
          placeholder={<div className="h-96 bg-gray-100 bg-opacity-50" />} 
        />
        <LazyComponent 
          component={FeaturedProducts} 
          placeholder={<div className="h-56" />} 
        />
        <LazyComponent 
          component={ProductCategories} 
          placeholder={<div className="h-32" />} 
        />
        <LazyComponent 
          component={PromotionSection} 
          placeholder={<div className="h-64" />} 
        />
        <LazyComponent 
          component={Testimonials} 
          placeholder={<div className="h-44" />} 
        />
        <LazyComponent 
          component={WhyChooseUs} 
          placeholder={<div className="h-44" />} 
        />
        <LazyComponent 
          component={faq} 
          placeholder={<div className="h-44" />} 
        />
        <LazyComponent 
          component={aboutUs} 
          placeholder={<div className="h-44" />} 
        />
        
      </div>
      
    </motion.div>
  );
};

export default Homepage;
