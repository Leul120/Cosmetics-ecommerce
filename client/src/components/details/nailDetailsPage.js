import React, { useCallback, useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { FaStar, FaCheckCircle } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../App';
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


const NailDetailPage = () => {
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  // const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState('description');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews,setReviews]=useState([])
  const { setShowLogin,token } = useContext(AppContext);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [selectedSize, setSelectedSize] = useState({});
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { id } = useParams();

  const getNail = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${process.env.REACT_APP_URL}/get-product/nail/${id}`);
      setProduct(response.data.product);
      setReviews(response.data.reviews?.reviews)
      setSelectedSize(response.data.product.sizes[0])
      // Set the selectedImage here after product data is fetched
      if (response.data.product.images && response.data.product.images.length > 0) {
        setSelectedImage(response.data.product.images[0].imageUrl);
      }
    } catch (error) {
      console.error('Error fetching nail product:', error);
      setError('Failed to load product. Please try again later.');
      notification.error({ message:error.response.data.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNail();
  }, [id]);

  const handleSubmitReview =async () => {
    // Logic to submit review (to be implemented)
    try{
      const response=await axios.post(`${process.env.REACT_APP_URL}/review/add-review`,{
        productId:product._id,
        rating:newReview.rating,
        comment:newReview.comment
      },{headers:{
        Authorization:`Bearer ${token}`
      }})
      // toast.success('success')
      getNail()
      console.log(response.data)
      notification.success({ message:"Review added successfully!" });
    }catch(error){
      notification.error({ message:error.response.data.message });
      console.log(error)
    }
    setIsModalOpen(false);
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  const getCurrentPrice = () => {
    const sizeOption = product?.sizes?.find(s => s.size === selectedSize.size);
    return sizeOption ? sizeOption.price : product.price;
  };

  const addToCart=async ()=>{
    try{
      const response=await axios.post(`${process.env.REACT_APP_URL}/cart/add-to-cart`,{
        productId:product._id,
        size:selectedSize.size,
        items:{
          product:product._id,
          quantity:1,
          image:product.images[0].imageUrl,
          name:product.name,
          productModel:'nailProductModel',
          price:selectedSize.price,
          size:selectedSize.size,
          brand:product.brand,
          type:product.type,
          discount:product.discount?.percentage||0
        }
      },{headers:{
        Authorization:`Bearer ${token}`
      }})
      console.log(response.data)
      notification.success({ message:"Added to cart successfully!" });
    }catch(error){
      notification.error({ message:error.response.data.message });
      console.log(error)
    }
  }


  if (loading) {
    return <ProductSkeleton />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!product) {
    return <ErrorMessage message="Product not found." />;
  }

  let total=0
  reviews?.map((review)=>{
    total+=review.rating
  })
  const averageRating=total/reviews?.length

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
              {product.images.map((img, index) => (
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
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-sm text-gray-500">by {product.brand}</p>

          <div className="flex items-center space-x-4">
            <p className="text-2xl font-semibold text-gray-600">${getCurrentPrice()?.toFixed(2)}</p>
            <div className="flex items-center">
              <div className="flex text-gray-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={`w-5 h-5 ${i < Math.floor(averageRating) ? 'text-gray-400' : 'text-gray-300'}`} />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-500">({reviews?.length} reviews)</span>
            </div>
          </div>

          <p className="text-gray-700">{product.description}</p>

          {/* Product Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>Type:</strong> {product.type}</p>
              <p><strong>Finish:</strong> {product.finish}</p>
              <p><strong>Size:</strong> {product.size}</p>
              <p><strong>Nail Type:</strong> {product.nailType}</p>
            </div>
            <div>
              <p><strong>Drying Time:</strong> {product.dryingTime}</p>
              <p><strong>Long Lasting:</strong> {product.longLasting ? 'Yes' : 'No'}</p>
              <p><strong>Chip Resistant:</strong> {product.chipResistant ? 'Yes' : 'No'}</p>
              <p><strong>Scent:</strong> {product.scent || 'N/A'}</p>
            </div>
          </div>
          {/* Size Selection */}
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-gray-600">Size:</span>
            {product.sizes?.map((sizeOption) => (
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
          </div>

          {/* Certifications */}
          <div className="flex flex-wrap gap-2">
            {product.certifications.map((cert, index) => (
              <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs flex items-center">
                <FaCheckCircle className="mr-1" /> {cert}
              </span>
            ))}
            {product.isVegan && (
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs flex items-center">
                <FaCheckCircle className="mr-1" /> Vegan
              </span>
            )}
            {product.isCrueltyFree && (
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs flex items-center">
                <FaCheckCircle className="mr-1" /> Cruelty-Free
              </span>
            )}
          </div>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Available Colors:</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 rounded-full border border-gray-300"
                    style={{ backgroundColor: color }}
                    title={color}
                  ></div>
                ))}
              </div>
            </div>
          )}

          {/* Stock Information */}
          <p className="text-sm text-gray-600">
            {product.stock > 0 ? `In stock: ${product.stock} units` : 'Out of stock'}
          </p>

          {/* Discount Information */}
          {product.discount && product.discount.percentage > 0 && (
            <div className="bg-red-100 text-red-800 p-2  ">
              <p className="font-semibold">Special Offer: {product.discount.percentage}% OFF</p>
              <p className="text-sm">Valid until: {new Date(product.discount.validUntil).toLocaleDateString()}</p>
            </div>
          )}
          <button
           onClick={() =>{
            if(!token){
            setShowLogin(true)
          }else{
             addToCart()}}}
            className="w-full bg-gray-600 text-white py-2   shadow hover:bg-gray-500 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mt-12">
        <div className="flex gap-4 text-lg font-semibold border-b">
          {['Description', 'Ingredients', 'Benefits', 'How To Use'].map((tabName) => (
            <button
              key={tabName}
              className={`pb-2 border-b-2 ${
                tab === tabName.toLowerCase() ? 'border-gray-500 text-gray-500' : 'border-transparent text-gray-500'
              }`}
              onClick={() => setTab(tabName.toLowerCase())}
            >
              {tabName}
            </button>
          ))}
        </div>

        <div className="mt-4">
          {tab === 'description' && (
            <div>
              <p className="text-gray-700">{product.description}</p>
            </div>
          )}
          {tab === 'ingredients' && (
            <ul className="list-disc ml-5 text-gray-700">
              {product.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          )}
          {tab === 'benefits' && (
            <ul className="list-disc ml-5 text-gray-700">
              {product.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          )}
          {tab === 'how to use' && (
            <div>
              <h3 className="font-semibold mt-4 mb-2">How to Use:</h3>
              <p className="text-gray-700">{product.howToUse}</p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {product.relatedProducts && product.relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {product.relatedProducts.map((relatedProduct, index) => (
              <div key={index} className="border   p-4">
                <img src={relatedProduct.images[0].imageUrl} alt={relatedProduct.name} className="w-full h-48 object-cover mb-2" />
                <h3 className="font-semibold">{relatedProduct.name}</h3>
                <p className="text-sm text-gray-600">${relatedProduct.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className='mt-12'>
        <h2 className="text-2xl font-semibold text-gray-800">Customer Reviews</h2>
        {reviews?.length > 0 && reviews ? (
          reviews.map((review, index) => (
            <div key={index} className="border-b py-4">
              <div className="flex justify-between items-center">
                <p className="font-semibold">{review.user?.name || 'Anonymous'}</p>
                <div className="flex text-gray-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={`w-4 h-4 ${i < review.rating ? 'text-gray-400' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mt-2">{review.comment}</p>
              <p className="text-sm text-gray-400 mt-1">{new Date(review.date).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p className='text-gray-500'>No reviews have been given yet!</p>
        )}
        <button
          onClick={() =>{
            if(!token){
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

const ProductSkeleton = () => (
  <div className="container mx-auto p-4 pt-32 animate-pulse">
    <div className="flex flex-wrap lg:flex-nowrap gap-8">
      <div className="w-full lg:w-1/2">
        <div className="bg-gray-300 h-96  "></div>
        <div className="flex justify-center gap-4 mt-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-gray-300 w-20 h-20  "></div>
          ))}
        </div>
      </div>
      <div className="w-full lg:w-1/2 space-y-4">
        <div className="h-8 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        <div className="h-20 bg-gray-300 rounded"></div>
        <div className="grid grid-cols-2 gap-4">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="h-4 bg-gray-300 rounded"></div>
          ))}
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

export default NailDetailPage;