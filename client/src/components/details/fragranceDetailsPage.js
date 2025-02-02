import React, { useState, useEffect, useMemo, useCallback, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Dialog } from '@headlessui/react';
import { FaStar, FaRegStar, FaCalendarAlt, FaClock, FaUsers } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../App';
import { toast } from 'react-toastify';
import { notification } from 'antd';
const ImageZoom = ({ imageUrl }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setMousePosition({ x, y });
  }, []);

  // Debounce function
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const debouncedHandleMouseMove = useCallback(debounce(handleMouseMove, 10), [handleMouseMove]);
  
  return (
    <div
      className="relative overflow-hidden  "
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={debouncedHandleMouseMove}
    >
      <img
        src={imageUrl}
        alt="Product"
        className="w-96 h-96 object-fit"
      />
      {isHovering && (
        <div
          className="absolute w-24 h-24 border-2 border-white rounded-full shadow-lg pointer-events-none transition-transform duration-100 ease-out"
          style={{
            top: `${mousePosition.y}%`,
            left: `${mousePosition.x}%`,
            transform: `translate(-50%, -50%) scale(1.5)`,
            backgroundImage: `url(${imageUrl})`,
            backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
            backgroundSize: '800%',
            backgroundRepeat: 'no-repeat',
          }}
        />
      )}
    </div>
  );
};

const FragranceDetailPage = () => {
  const [selectedImage, setSelectedImage] = useState('');
  // const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState('description');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userID,setShowLogin ,token} = useContext(AppContext);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [selectedSize, setSelectedSize] = useState({});
  const [reviews,setReviews]=useState([])
  
  const [isWishlistAdded, setIsWishlistAdded] = useState(false);
  const [isCompareAdded, setIsCompareAdded] = useState(false);
 
  const [fragrance, setFragrance] = useState(null);
  
  
  const { id } = useParams();

  const getFragrance = async () => {
    try {
      
      setError(null);
      const response = await axios.get(`${process.env.REACT_APP_URL}/get-product/fragrance/${id}`);
      console.log(response.data)
      setFragrance(response.data.product);
      setReviews(response.data.reviews?.reviews)
      setSelectedSize(response.data.product.sizes[0])
      // Set the selectedImage here after product data is fetched
      if (response.data.product.images && response.data.product.images.length > 0) {
        setSelectedImage(response.data.product.images[0].imageUrl);
      }
    } catch (error) {
      console.error('Error fetching fragrance:', error);
      notification.error({ message:error.response.data.message });
      setError('Failed to load fragrance data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFragrance();
  }, [id]);

  const handleSubmitReview =async () => {
    // Logic to submit review (to be implemented)
    try{
      const response=await axios.post(`${process.env.REACT_APP_URL}/review/add-review`,{
        productId:fragrance._id,
        rating:newReview.rating,
        comment:newReview.comment
      },{headers:{
        Authorization:`Bearer ${token}`
      }})
      // toast.success('success')
      getFragrance()
      console.log(response.data)
      notification.success({ message:"Review added successfully!" });
    }catch(error){
      notification.error({ message:error.response.data.message });
      console.log(error)
    }
    setIsModalOpen(false);
  };

  const getCurrentPrice = () => {
    const sizeOption = fragrance?.sizes?.find(s => s.size === selectedSize.size);
    return sizeOption ? sizeOption.price : fragrance.price;
  };


  let total=0
  reviews?.map((review)=>{
    total+=review.rating
  })
  const averageRating=total/reviews?.length
  

  const renderStars = useMemo(() => (rating) => {
    return [...Array(5)].map((_, i) => (
      i < Math.floor(rating) ? <FaStar key={i} className="text-gray-400" /> : <FaRegStar key={i} className="text-gray-400" />
    ));
  }, []);
  const addToCart=async ()=>{
    try{
      console.log(token)
      const response=await axios.post(`${process.env.REACT_APP_URL}/cart/add-to-cart`,{
        productId:fragrance._id,
        size:selectedSize.size,
        items:{
          product:fragrance._id,
          quantity:1,
          image:fragrance.images[0].imageUrl,
          name:fragrance.name,
          productModel:'fragranceModel',
          price:selectedSize.price,
          size:selectedSize.size,
          brand:fragrance.brand,
          type:fragrance.type,
          discount:fragrance.discount?.percentage||0
        }
      },{headers:{
        Authorization:`Bearer ${token}`
      }})
      console.log(response.data)
      notification.success({ message:"Added to cart successfully!"});
    }catch(error){
      notification.error({ message:error.response.data.message });
      console.log(error)
    }
  }

  if (loading) {
    return <FragranceSkeleton />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!fragrance) {
    return null;
  }

  return (
    <div className="container mx-auto p-4 pt-32">
      <div className="flex flex-wrap lg:flex-nowrap gap-8">
        {/* Product Image Gallery */}
        <div className="relative max-w-md mx-auto">
      <motion.div
        key={selectedImage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
          
            <ImageZoom imageUrl={selectedImage}/>
            <div className="flex justify-center gap-4 mt-4">
              {fragrance.images.map((img, index) => (
                <img
                  key={index}
                  src={img.imageUrl}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-20 h-20 object-cover cursor-pointer border-2   transition-all ${
                    selectedImage === img.imageUrl ? 'border-gray-500 scale-105' : 'border-gray-300 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedImage(img.imageUrl)}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="w-full lg:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{fragrance.name}</h1>
          <p className="text-sm text-gray-500">by {fragrance.brand}</p>

          <div className="flex items-center space-x-4">
            <p className="text-2xl font-semibold text-gray-600">${getCurrentPrice()?.toFixed(2)}</p>
            <div className="flex items-center">
              <div className="flex">
                {renderStars(averageRating)}
              </div>
              <span className="ml-2 text-sm text-gray-500">({reviews?.length} reviews)</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">{fragrance.type}</span>
            <span className="px-2 py-1 bg-pink-100 text-pink-800 rounded-full text-sm">{fragrance.gender}</span>
            
            <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">{fragrance.concentration}</span>
          </div>

          <div className="flex items-center space-x-2">
            <FaClock className="text-gray-500" />
            <span className="text-gray-700">{fragrance.longevity}</span>
          </div>

          <div className="flex items-center space-x-2">
            <FaCalendarAlt className="text-gray-500" />
            <span className="text-gray-700">{fragrance.season.join(', ')}</span>
          </div>

          <div className="flex items-center space-x-2">
            <FaUsers className="text-gray-500" />
            <span className="text-gray-700">{fragrance.occasion.join(', ')}</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-gray-600">Size:</span>
            
            {fragrance.sizes?.map((sizeOption) => (
              <button
                key={sizeOption.size}
                className={`px-3 py-1 border rounded-full ${
                  selectedSize.size === sizeOption.size
                    ? 'bg-gray-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setSelectedSize(sizeOption)}
              >
                {sizeOption.size}
              </button>
            ))}
          

          {/* Quantity Selection */}
          
          </div>

          <p className="text-gray-700">{fragrance.description}</p>

          <button
            onClick={()=>{
              if(!userID){
                setShowLogin(true)
              }else{
                addToCart()
              }
            }}
            className="w-full bg-gray-600 text-white py-2   shadow hover:bg-gray-500 transition"
          >
            Add to Cart
          </button>

          {/* Product Tabs */}
          <div className="mt-6">
            <div className="flex gap-4 text-lg font-semibold">
              {['description', 'ingredients', 'scentProfile'].map((tabName) => (
                <button
                  key={tabName}
                  className={`border-b-2 ${
                    tab === tabName ? 'border-gray-500 text-gray-500' : 'text-gray-500'
                  }`}
                  onClick={() => setTab(tabName)}
                >
                  {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
                </button>
              ))}
            </div>

            <div className="mt-4">
              {tab === 'description' && <p className="text-gray-700">{fragrance.description}</p>}
              {tab === 'ingredients' && (
                <ul className="list-disc ml-5 text-gray-700">
                  {fragrance.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              )}
              {tab === 'scentProfile' && (
                <ul className="list-disc ml-5 text-gray-700">
                  {fragrance.scentProfile.map((scent, index) => (
                    <li key={index}>{scent}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800">Customer Reviews</h2>
        <AnimatePresence>
          <motion.div layout className="space-y-6 mt-6">
            {reviews?.map((review, index) => (
              <motion.div
                key={index}
                className="border p-4   shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between">
                  <p className="text-lg font-semibold">{review.reviewer}</p>
                  <div className="flex">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <p className="text-gray-600 mt-2">{review.comment}</p>
                <p className="text-sm text-gray-400 mt-2">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <button
          onClick={() =>{
            if(!userID){
            setShowLogin(true)
          }else{
             setIsModalOpen(true)}}}
          className="mt-6 w-full py-2 bg-gray-600 text-white font-semibold   shadow hover:bg-gray-500 transition"
        >
          Write a Review
        </button>
      </div>

      {/* Review Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black bg-opacity-50"></div>
        <div className="bg-white p-6   shadow-lg w-1/2 max-w-lg z-10">
          <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
          <select
            value={newReview.rating}
            onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
            className="w-full border p-2   mb-4"
          >
            {[5, 4, 3, 2, 1].map((rating) => (
              <option key={rating} value={rating}>{rating} - {rating === 5 ? 'Excellent' : rating === 1 ? 'Very Poor' : `${rating} Stars`}</option>
            ))}
          </select>
          <textarea
            placeholder="Your Review"
            className="w-full border p-2   mb-4"
            rows="4"
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
          ></textarea>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsModalOpen(false)}
              className="py-2 px-4 border  "
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitReview}
              className="py-2 px-4 bg-gray-600 text-white  "
            >
              Submit
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};



const FragranceSkeleton = () => (
  <div className="container mx-auto px-4 py-16 animate-pulse">
    <div className="flex flex-wrap lg:flex-nowrap gap-8">
      
      {/* Left side: Main Fragrance Image and Thumbnails */}
      <div className="w-full lg:w-1/2">
        {/* Main Fragrance Image Skeleton */}
         <Skeleton height={480} width="100%" borderRadius="1rem" />

        {/* Thumbnail Skeletons */}
        <div className="flex justify-center gap-3 w-full">
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} width={80} height={80} borderRadius="0.5rem" />
          ))}
        </div>
      </div>

      {/* Right side: Fragrance Details */}
      <div className="w-full lg:w-1/2 space-y-8">
        {/* Fragrance Title Skeleton */}
        <Skeleton width="80%" height={50} borderRadius="0.5rem" />
        
        {/* Brand Name Skeleton */}
        <Skeleton width="40%" height={25} borderRadius="0.5rem" />

        {/* Price Skeleton */}
        <Skeleton width="25%" height={35} borderRadius="0.5rem" />
        
        {/* Rating Skeleton */}
        <div className="flex items-center space-x-2">
          <Skeleton width={120} height={24} borderRadius="0.25rem" />
          <Skeleton width={60} height={24} borderRadius="0.25rem" />
        </div>

        {/* Fragrance Description Skeleton */}
        <Skeleton count={5} width="100%" height={20} borderRadius="0.5rem" />

        {/* Add to Cart Button Skeleton */}
        <Skeleton width="60%" height={50} borderRadius="1rem" />

        {/* Additional Info (like ingredients or product details) */}
        <div className="space-y-4">
          <Skeleton width="100%" height={18} borderRadius="0.5rem" />
          <Skeleton width="90%" height={18} borderRadius="0.5rem" />
          <Skeleton width="80%" height={18} borderRadius="0.5rem" />
        </div>
      </div>
    </div>
  </div>
);


const ErrorMessage = ({ message }) => (
  <div className="container mx-auto p-4 pt-32">
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Error!</strong>
      <span className="block sm:inline"> {message}</span>
    </div>
  </div>
);

export default FragranceDetailPage;