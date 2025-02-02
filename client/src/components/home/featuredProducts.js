import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FaShoppingCart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductCard = ({ _id,category,name, price, image, onAddToCart,sizes }) => (
  <motion.div
    className=" shadow-lg  overflow-hidden min-w-64 max-h-96 rounded-lg"
    // whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    <img src={`https://ui-avatars.com/api/?name=${name}&background=random&size=200`} alt={name} className="w-full h-48 object-cover" />
    <div className="p-4">
      <p className="text-lg font-semibold overflow-hidden h-8 text-gray-800 mb-2 ">{name}</p>
      <p className="text-indigo-600 font-bold mb-4">${sizes[0].price.toFixed(2)}</p>
      <Link to={`/details/${category}/${_id}`}><motion.button
        // onClick={onAddToCart}
        
        className=" text-gray-500 px-4 py-2 w-full  flex items-center justify-center  transition duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
         View Details
      </motion.button></Link>
    </div>
  </motion.div>
);

const FeaturedProducts = () => {
  const [products,setProducts]=useState([])

  const [cart, setCart] = useState([]);
  const carouselRef = useRef(null);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading,setLoading]=useState(true)

  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/get-all-products`);
      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        console.error('API did not return an array of products');
        setProducts([]); // Set to empty array if response is not as expected
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };
useEffect(()=>{
  getAllProducts()
},[])
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const scroll = useCallback((direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setCurrentIndex((prevIndex) => {
        const newIndex = direction === 'left' ? prevIndex - 1 : prevIndex + 1;
        return (newIndex + products.length) % products.length;
      });
    }
  }, [products.length]);

  useEffect(() => {
    const handleAutoScroll = () => {
      if (carouselRef.current && autoScrollEnabled) {
        if (carouselRef.current.scrollLeft + carouselRef.current.clientWidth >= carouselRef.current.scrollWidth) {
          carouselRef.current.scrollLeft = 0;
          setCurrentIndex(0);
        } else {
          carouselRef.current.scrollBy({ left: 1, behavior: 'auto' });
          setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
        }
      }
    };

    const intervalId = setInterval(handleAutoScroll, 50);
    return () => clearInterval(intervalId);
  }, [autoScrollEnabled, products.length]);

  const handleMouseEnter = () => setAutoScrollEnabled(false);
  const handleMouseLeave = () => setAutoScrollEnabled(true);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="py-16 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          variants={itemVariants}
          className="text-4xl font-bold text-center mb-12 text-white"
        >
          <span className="">Featured Products</span>
        </motion.h2>

        <motion.div
          variants={itemVariants}
          className="relative overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full z-10"
          >
            <FaChevronLeft className="text-indigo-600" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full z-10"
          >
            <FaChevronRight className="text-indigo-600" />
          </motion.button>
          <div ref={carouselRef} className="flex overflow-x-hidden">
            {[...products, ...products].map((product, index) => (
              <motion.div
                key={`${product.id}-${index}`}
                variants={itemVariants}
                className="flex-shrink-0 px-2"
                style={{ width: '320px',height:'400px' }}
              >
                <ProductCard {...product} onAddToCart={() => addToCart(product)} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FeaturedProducts;