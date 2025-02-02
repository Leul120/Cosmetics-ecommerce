import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';

// Lazy loading components
const AboutUs = lazy(() => import('./aboutUs'));
const TeamSection = lazy(() => import('./teamSection'));
const Testimonials = lazy(() => import('./customerTestimonials'));
const SocialMediaContact = lazy(() => import('./socialMedia'));

// Placeholder loading component
const Loading = () => <div className="text-center p-10 h-44 w-full"></div>;

const AboutPage = () => {
  return (
    <div className="pt-16">
      {/* Suspense will handle lazy loading and show the loading fallback until the component is ready */}
      <Suspense fallback={<Loading />}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <AboutUs />
        </motion.div>
      </Suspense>

      <Suspense fallback={<Loading />}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }} // Delays for staggered effect
        >
          <TeamSection />
        </motion.div>
      </Suspense>

      <Suspense fallback={<Loading />}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }} // More delay for this section
        >
          <Testimonials />
        </motion.div>
      </Suspense>

      <Suspense fallback={<Loading />}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: "easeInOut" }} // Final section animation
        >
          <SocialMediaContact />
        </motion.div>
      </Suspense>
    </div>
  );
};

export default AboutPage;
